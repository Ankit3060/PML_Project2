import jwt from "jsonwebtoken";

export const isAdminAuthenticated = (req, res, next) => {
    const token = req.cookies.adminToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "Admin, not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; 

        next();
    } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};


export const isUserAuthenticated = (req, res, next) => {
    const token = req.cookies.userToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "User, not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; 

        next();
    } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
}


export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.userToken || req.cookies.adminToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};
import jwt from "jsonwebtoken";

export const generateToken = (user, message, statusCode, res) => {
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE }
    );

    const cookieName = user.role === "Admin" ? "adminToken" : "userToken";
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    const { password, ...userWithoutPassword } = user;

    res.status(statusCode).cookie(cookieName, token, options).json({
        success: true,
        message,
        user: userWithoutPassword,
        token
    });
};

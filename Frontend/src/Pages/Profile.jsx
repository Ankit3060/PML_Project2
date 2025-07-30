import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';
import axios from 'axios';

const Profile = () => {
  const location = useLocation();
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(true);

  const [editPassword, setEditPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    fetchUser();
  }, [setIsAuthenticated, setUser]);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (location.state?.edit) setEditMode(true);
    if (location.state?.changePassword) setEditPassword(true);
  }, [location.state]);

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
    
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const userData = res.data.user;
      setUser(userData);
      setEditedUser({ ...userData });
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error.response?.data?.message || "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/user/update`,
        editedUser,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUser = res.data.user;
      setUser(updatedUser);
      setEditMode(false);
      toast.success(res.data.message || "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setEditMode(false);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const handlePasswordSave = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    if (!validatePassword(newPassword)) {
      setPasswordError(<>Password must contain at least one uppercase,<br></br> lowercase, number, and special character.</>);
      return;
    }

    try {
      setPasswordLoading(true);
      setPasswordError("");

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/user/update-password`,
        { newPassword, confirmPassword },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setEditPassword(false);
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
      
      toast.success(res.data.message || "Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      setPasswordError(error.response?.data?.message || "Failed to update password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handlePasswordCancel = () => {
    setEditPassword(false);
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgb(214, 228, 239)] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading user data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[rgb(214, 228, 239)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full text-center">
          <p className="text-red-500 mb-4">Unable to load user data. Please login.</p>
          <button
            onClick={fetchUserData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(214, 228, 239)] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-4 sm:p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700">User Profile</h2>
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
            >
              Edit
            </button>
          ) : (
            <div className="space-x-2">
              <button
                onClick={handleSave}
                className="bg-blue-600 cursor-pointer text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 cursor-pointer text-gray-800 px-4 py-1 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 text-gray-700">
          <InlineField 
            label="First Name" 
            value={editedUser.firstName || ""} 
            editable={editMode} 
            onChange={(val) => handleChange("firstName", val)} 
          />
          <InlineField 
            label="Last Name" 
            value={editedUser.lastName || ""} 
            editable={editMode} 
            onChange={(val) => handleChange("lastName", val)} 
          />
          <InlineField 
            label="Email" 
            value={editedUser.email || ""} 
            editable={false}
          />
          <InlineField 
            label="Phone" 
            value={editedUser.phone || ""} 
            editable={editMode} 
            onChange={(val) => handleChange("phone", val)} 
          />
          <InlineField 
            label="Gender" 
            value={editedUser.gender || ""} 
            editable={editMode} 
            type="select" 
            onChange={(val) => handleChange("gender", val)} 
          />
          <InlineField 
            label="Address" 
            value={editedUser.address || ""} 
            editable={editMode} 
            onChange={(val) => handleChange("address", val)} 
          />
          <InlineField 
            label="Date of Birth" 
            value={editedUser.dob ? editedUser.dob.split('T')[0] : ""} 
            editable={editMode} 
            type="date" 
            onChange={(val) => handleChange("dob", val)} 
          />
          <InlineField 
            label="Qualification" 
            value={editedUser.qualification || ""} 
            editable={editMode} 
            onChange={(val) => handleChange("qualification", val)} 
          />
          <InlineField 
            label="Member Since" 
            value={editedUser.createdAt ? new Date(editedUser.createdAt).toLocaleDateString() : ""} 
            editable={false}
          />
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-700">Password</h3>
            {!editPassword ? (
              <button
                onClick={() => setEditPassword(true)}
                className="text-blue-600 cursor-pointer hover:text-blue-800"
              >
                Change
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={handlePasswordSave}
                  disabled={passwordLoading}
                  className="bg-blue-600 text-white px-4 py-1 cursor-pointer rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {passwordLoading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handlePasswordCancel}
                  disabled={passwordLoading}
                  className="bg-gray-300 cursor-pointer text-gray-800 px-4 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {editPassword && (
            <div className="mt-3 space-y-3">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => {
                  const value = e.target.value;
                  setNewPassword(value);
                  
                  if (value.length === 0) {
                    setPasswordError('');
                    return;
                  }
                  
                  if (!validatePassword(value)) {
                    setPasswordError(<>Password must contain at least one uppercase,<br></br> lowercase, number, and special character.</>);
                  } else {
                    setPasswordError('');
                  }
                }}
                className={`w-full px-4 py-2 border-2 rounded-lg ${
                  passwordError ? 'border-red-300' : 'border-gray-300'
                }`}
                minLength={8}
                maxLength={20}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
              />
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InlineField = ({ label, value, editable = false, onChange, type = "text" }) => {
  return (
    <div className="flex flex-row sm: sm:flex-row">
      <span className="w-full sm:w-40 font-medium mb-1 sm:mb-0">{label}:</span>
      {editable ? (
        type === "select" ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-3 py-1 border-2 border-gray-300 rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <input
            type={type}
            max={type === "date" ? new Date().toISOString().split('T')[0] : undefined}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-3 py-1 border-2 border-gray-300 rounded-lg"
            maxLength={type === "text" ? 50 : undefined}
            disabled={!onChange}
            readOnly={!onChange}
          />
        )
      ) : (
        <span className="flex-1">
          {type === "date" && value ? new Date(value).toLocaleDateString() : value}
        </span>
      )}
    </div>
  );
};

export default Profile;
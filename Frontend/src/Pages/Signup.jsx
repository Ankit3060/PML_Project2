import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from "../context/authContext";
import axios from 'axios';

function Signup() {
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();
  const navigateTo = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const validateConfirmPassword = (pass, confirmPass) => {
  if (pass !== confirmPass) {
    setPasswordMatchError("Passwords do not match");
    return false;
  } else {
    setPasswordMatchError("");
    return true;
  }
};


  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setPasswordError(<>Password must contain at least one uppercase,<br></br> lowercase, number, and special character.</>);
      return;
    } else {
      setPasswordError('');
    }

    if (!validateConfirmPassword(password, confirmPassword)) {
        return;
    }


    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/register`,
        {firstName, lastName, email, phone, gender, password, confirmPassword, role: "User"},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUser(res.data.user);
      setIsAuthenticated(true);
      toast.success(res.data.message);
      navigateTo('/');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setGender('');
      setPassword('');
      setConfirmPassword('');

    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgb(214, 228, 239)]">
      <div className='bg-white rounded-2xl shadow-xl p-16 m-8 max-w-2xl mx-auto'>
        <h2 className='text-3xl text-black'>Join SkillStack</h2>
        <p className='text-black'>Create your account to get started</p>
        <form onSubmit={handleSignup}>

          <div className='flex gap-4'>
            <div className='flex-1'>
              <input 
                placeholder='First Name'
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                required 
                className='text-black bg-white border-2 border-gray-300 rounded-lg p-2 mt-3 w-full' 
                maxLength={30}
              />
            </div>
            <div className='flex-1'>
              <input 
                placeholder='Last Name'
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                required 
                className='text-black bg-white border-2 border-gray-300 rounded-lg p-2 mt-3 w-full' 
                maxLength={30}
              />
            </div>
          </div>

          <div>
            <input 
              placeholder='Email'
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className='text-black bg-white border-2 border-gray-300 rounded-lg p-2 mt-3 w-full' 
              maxLength={50}
            />
          </div>

          <div>
            <input 
              placeholder='Phone Number'
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
              className='text-black bg-white border-2 border-gray-300 rounded-lg p-2 mt-3 w-full' 
              maxLength={15}
            />
          </div>

          <div>
            <select 
              value={gender} 
              onChange={(e) => setGender(e.target.value)} 
              required 
              className='text-black bg-white border-2 border-gray-300 rounded-lg p-2 mt-3 w-full'
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>

            </select>
          </div>

          <div>
            <input 
              placeholder='Password'
              type="password" 
              value={password} 
              onChange={(e) => { 
                const value = e.target.value;
                setPassword(value);

                if(value.length==0){setPasswordError(''); return;}
                
                const hasUpperCase = /[A-Z]/.test(password);
                const hasLowerCase = /[a-z]/.test(password);
                const hasNumber = /\d/.test(password);
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

                if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
                setPasswordError(<>Password must contain at least one uppercase,<br></br> lowercase, number, and special character.</>);
                return;
                } else {
                setPasswordError('');
                }
              }} 
              required 
              className={`text-black bg-white border-2 rounded-lg p-2 mt-3 w-full 
                            ${passwordError ? 'border-red-300':'border-gray-300'}`} 
              minLength={8}
              maxLength={20}
            />
            {passwordError ? <p className={`text-sm text-red-500`}>{passwordError}</p> : null}         
          </div>


          <div>
            <input 
              placeholder='Confirm Password'
              type="password" 
              value={confirmPassword} 
              onChange={(e) => {
                const value = e.target.value;
                setConfirmPassword(value);

                if (value.length === 0) {
                    setPasswordMatchError('');
                    return;
                }
                    validateConfirmPassword(password, value);
              }}

              required 
              className='text-black bg-white border-2 border-gray-300 rounded-lg p-2 mt-3 w-full' 
              minLength={8}
              maxLength={20}
            />
            {passwordMatchError ? <p className={`text-sm text-red-500`}>{passwordMatchError}</p> : null}
          </div>

          <button 
             className='rounded-lg cursor-pointer bg-blue-50 btn text-white p-2 mt-4 w-full'
             type="submit">
                Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}

export default Signup;
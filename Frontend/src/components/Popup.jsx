import React from 'react';
import {  useNavigate } from 'react-router-dom';

export default function Popup({ isOpen }) {
  if (!isOpen) return null;

  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-transparent">
      <div className="bg-[#ccc] rounded-lg shadow-lg p-6 max-w-sm mx-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Exam Over
        </h2>
        <p className="text-black mb-6">
          Your exam have been ended and submitted successfully, you can now close or go to home page
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 cursor-pointer"
            onClick={() => {
              navigate('/');
            }}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
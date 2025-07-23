// import React, { useEffect, useState, useRef } from 'react';
// import { useAuth } from '../context/authContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { AgGridReact } from 'ag-grid-react';
// import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
// ModuleRegistry.registerModules([ AllCommunityModule ]);
// import { useNavigate } from 'react-router-dom';
// import { FaUserEdit } from "react-icons/fa";
// import { FaRegEye } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { HiUserAdd } from "react-icons/hi";

// const Dashboard = () => {
//   document.title = "All User";
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const {setIsAuthenticated, setUser } = useAuth();
//   const [input, setInput] = useState('')

//   const navigate = useNavigate();
    
//     useEffect(() => {
//       const fetchUser = async () => {
//         try {
          
//           const response = await axios.get(
//             `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
//             {
//               withCredentials: true,
//               headers: {
//                 "Content-Type": "application/json",
//             },
//             }
//           );
//           setIsAuthenticated(true);
//           setUser(response.data.user);
//         } catch (error) {
//           setIsAuthenticated(false);
//           setUser(null);
//         }
//       };
      
//       fetchUser();
//     }, []);


//   const CustomButtonComponent = (params) => {

//     const handleView = () => {
      
//     };

//     const handleDelete = async () => {
      
//     };

//     const handleEdit = ()=>{
      
//     }

//     return (
//       <div className="flex gap-2">
//         <button 
//           className="px-2 py-1 text-xl rounded-2xl cursor-pointer mr-4 hover:bg-blue-400"
//           onClick={handleView}
//         >
//           <FaRegEye />
//         </button>

//         <button 
//           className="px-2 py-1 text-xl rounded-2xl cursor-pointer mr-4 hover:bg-green-400"
//           onClick={handleEdit}
//         >
//           <FaUserEdit />
//         </button>

//         <button 
//           className=" px-2 py-1 text-xl rounded-2xl cursor-pointer hover:bg-red-400"
//           onClick={handleDelete}
//         >
//           <MdDelete />
//         </button>

//       </div>
//     );
//   };
//   const columns = [
//     { field: 'id' , headerName:'ID' , width: 140},
//     { field: 'fullName', width: 140},
//     { field: 'email', width: 170},
//     { field: 'phone', width: 130},
//     { field: 'gender',  width: 140},
//     { field: 'dob', headerName: 'DOB', width: 130},
//     { field: 'qualification', width: 180 },
//     { field: 'createdAt', headerName: 'Member Since', width: 170},
//     { field: 'actions',headerName: 'Actions', cellRenderer: CustomButtonComponent, width: 200},
//   ];

//   const pagination = true;
//   const paginationPageSize = 20;
//   const paginationPageSizeSelector = [10, 20, 50];

//   const gridRef = useRef();

//   const onFilterTextBoxChanged = ()=>{
//     gridRef.current.api.setGridOption("quickFilterText",
//       document.getElementById("filter-text-box").value);
//   }
  
//   return (
//     <>
//     <div className='flex justify-between items-center p-4'>
//       <input 
//         type="search" 
//         id='filter-text-box'
//         placeholder='Search users...' 
//         value={input}
//         className='border p-2 rounded-2xl text-black bg-white border-gray-300' 
//         onChange={onFilterTextBoxChanged}

//         />

//       <button 
//         className='cursor-pointer float-right text-3xl hover:text-blue-500 mr-[70px]'
//         onClick={() => navigate("/add")}>
//         <HiUserAdd />
//       </button>
//     </div>

//     <div  style={{ height: 600, width: '100%', padding: '20px' }}>
//       <AgGridReact
//               ref={gridRef}
//               rowData={filtereddata}
//               columnDefs={columns}
//               loading={loading}
//               pagination={pagination}
//               paginationPageSize={paginationPageSize}
//               paginationPageSizeSelector={paginationPageSizeSelector}
//           />
//     </div>
//     </>
//   );
// };

// export default Dashboard;


import React from 'react'

function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
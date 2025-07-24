import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

const Dashboard = ({ examType }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/exam/data/get-marks/${examType}/${user.id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const useArray = response.data.data;
        const formattedData = useArray.map((item, index) => ({
          id: item.id,
          totalQuestions: item.totalQuestions,
          attemptedQuestions: item.marks/4,
          totalMarks: item.totalQuestions*4,
          obtainMarks: item.marks,
          percentage : item.percentage,
          date: item.timestamp ? item.timestamp.split('T')[0] : '',
        }))
        setData(formattedData);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch data");
        // navigate("/login");
        setLoading(false);
      }
    };

    fetchData();
  }, [examType]);


  const CustomButtonComponent = (params) => {
    const handleView = () => { };

    return (
      <div className="flex gap-2">
        <button
          className="px-2 py-1 text-xl rounded-2xl cursor-pointer mr-4 hover:bg-blue-400"
          onClick={handleView}
        >
          <FaRegEye />
        </button>
      </div>
    );
  };
  const columns = [
    { field: "id", headerName: "Exam ID", width: 90 },
    { field: "totalQuestions", headerName: "Total Questions", width: 140 },
    { field: "attemptedQuestions", headerName: "Attempted Questions", width: 140 },
    { field: "totalMarks", headerName: "Total Marks", width: 120 },
    { field: "obtainMarks", headerName: "Obtain Marks", width: 130 },
    { field: "date", headerName: "Date", width: 140 },
    { field: "percentage", headerName: "Percentage", width: 130 },
    { field: "actions", headerName: "Actions", cellRenderer: CustomButtonComponent, width: 100 },
  ];

  const pagination = true;
  const paginationPageSize = 20;
  const paginationPageSizeSelector = [10, 20, 50];

  return (
    <>
      <div className='flex justify-between items-center p-4'>
        <button
          className='cursor-pointer right-18 absolute float-right text-xl hover:text-blue-500 mr-[70px]'
          onClick={() => navigate(`/exam/${examType}`)}>
          Take Quiz
        </button>
      </div>

      <div
        style={{ height: 600, width: "100%", padding: "20px" }}
        className="px-6 py-12 max-w-5xl mx-auto"
      >
        <AgGridReact
          rowData={data}
          columnDefs={columns}
          loading={loading}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </>
  );
};

export default Dashboard;
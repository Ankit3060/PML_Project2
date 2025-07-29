import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
ModuleRegistry.registerModules([AllCommunityModule]);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setIsAuthenticated, setUser } = useAuth();
  const { examType } = useParams();
  const navigate = useNavigate();

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
  }, [setIsAuthenticated]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.id) return;
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

        const formattedData = response.data.data.map((item) => ({
          id: item.id,
          totalQuestions: item.totalQuestions,
          attemptedQuestions: item?.questions?.filter((q) => q.selectedAnswer).length || 0,
          correctQuestions: item?.questions?.filter((q) => q.isCorrect).length || 0,
          totalMarks: item.totalQuestions * 4,
          obtainMarks: item.marks,
          percentage: item.percentage,
          date: item.timestamp
            ? new Date(item.timestamp).toLocaleString("en-IN", {
              dateStyle: "short",
              timeStyle: "short",
            })
            : "",
        }));
        setData(formattedData);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch data");
        setData([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [examType, user]);

  const CustomButtonComponent = (params) => {
    const handleView = () => {
      navigate(`/view-paper/${params.data.id}`);
    };

    return (
      <button
        className="px-2 py-1 text-xl rounded-2xl cursor-pointer hover:bg-blue-400"
        onClick={handleView}
      >
        <FaRegEye />
      </button>
    );
  };

  const columns = [
    { field: "id", headerName: "Exam ID", width: 200 },
    { field: "totalQuestions", headerName: "Total Questions", width: 131 },
    { field: "attemptedQuestions", headerName: "Attempted Questions", width: 168 },
    { field: "correctQuestions", headerName: "Correct Questions", width: 148 },
    { field: "totalMarks", headerName: "Total Marks", width: 110 },
    { field: "obtainMarks", headerName: "Obtain Marks", width: 118 },
    { field: "percentage", headerName: "Percentage", width: 103 },
    { field: "date", headerName: "Date", width: 145 },
    { field: "actions", headerName: "Actions", cellRenderer: CustomButtonComponent, width: 100 },
  ];

  return (
    <div className="flex flex-col w-full p-6">
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate(`/exam/${examType}`)}
        >
          Take Quiz
        </button>
      </div>

      <div className=" w-full" style={{ height: "600px" }}>
        <AgGridReact
          rowData={data}
          columnDefs={columns}
          loading={loading}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[10, 20, 50]}
          enableCellTextSelection={true}
        />
      </div>
    </div>
  );
};

export default Dashboard;
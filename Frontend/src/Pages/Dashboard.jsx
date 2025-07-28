import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { useParams } from "react-router-dom";

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

        const useArray = response.data.data;
        const formattedData = useArray.map((item, index) => ({
          id: item.id,
          totalQuestions: item.totalQuestions,
          attemptedQuestions: item?.questions?.filter(q => q.selectedAnswer).length || 0,
          correctQuestions: item?.questions?.filter(q => q.isCorrect).length || 0,
          totalMarks: item.totalQuestions * 4,
          obtainMarks: item.marks,
          percentage: item.percentage,
          date: item.timestamp
            ? new Date(item.timestamp).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" })
            : "",
        }));
        setData(formattedData);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch data");
        // navigate("/login");
        setData([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [examType, user]);


  const CustomButtonComponent = (params) => {
    const handleView = () => {
      navigate(`/view-paper/${params.data.id}`);
      // navigate("/view-paper")
      // navigate("/view-paper", { state: { examId: params.data.id } });
    };

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
    { field: "id", headerName: "Exam ID", width: 200},
    { field: "totalQuestions", headerName: "Total Questions", width: 131 },
    { field: "attemptedQuestions", headerName: "Attempted Questions", width: 168 },
    { field: "correctQuestions", headerName: "Correct Questions", width: 148},
    { field: "totalMarks", headerName: "Total Marks", width: 110 },
    { field: "obtainMarks", headerName: "Obtain Marks", width: 118 },
    { field: "percentage", headerName: "Percentage", width: 103 },
    { field: "date", headerName: "Date", width: 145 },
    { field: "actions", headerName: "Actions", cellRenderer: CustomButtonComponent, width: 100 },
  ];

  const pagination = true;
  const paginationPageSize = 20;
  const paginationPageSizeSelector = [10, 20, 50];

  return (
    <div className="flex flex-col ml-64 mt-16 p-4 w-[calc(100%-16rem)]"> {/* 16rem = w-64 */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 mt-[-5rem] absolute right-5 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate(`/exam/${examType}`)}
        >
          Take Quiz
        </button>
      </div>

      <div style={{ height: "560px" }} className="w-full mt-[-25px]">
        <AgGridReact
          rowData={data}
          columnDefs={columns}
          loading={loading}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          enableCellTextSelection={true}
        />
      </div>
    </div>
  );
};

export default Dashboard;
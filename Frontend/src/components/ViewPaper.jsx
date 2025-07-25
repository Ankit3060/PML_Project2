import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ViewPaper() {
    const { examId } = useParams();
    const [paperData, setPaperData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchPaperData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/exam/data/preview-paper/${examId}`, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setPaperData(response.data.data);
                toast.success("Paper data fetched successfully");
            } catch (error) {
                toast.error("Failed to fetch paper data");
            } finally {
                setLoading(false);
            }
        };

        fetchPaperData();
    }, [examId])
  return (
    <>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Exam Paper</h1>
            <h2>{paperData?.examType}</h2>
            <h2>Total Questions : {paperData?.totalQuestions}</h2>
            <h2>Attempted Questions : {paperData?.marks/4}</h2>
            <h2>total Marks : {paperData?.totalQuestions*4}</h2>
            <h2>Obtained Marks : {paperData?.marks}</h2>
            <h2>Percentage : {paperData?.percentage}%</h2>
            <h2>Date : {paperData?.timestamp ? new Date(paperData.timestamp).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" }) : ""}</h2>
            <h2 className="mt-4">Questions:</h2>
        </div>
    </>
  )
}

export default ViewPaper
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function ViewPaper() {
  const { examId } = useParams();
  const [paperData, setPaperData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaperData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/exam/data/preview-paper/${examId}`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setPaperData(response.data.data);
        toast.success('Paper data fetched successfully');
      } catch (error) {
        toast.error('Failed to fetch paper data');
      } finally {
        setLoading(false);
      }
    };

    fetchPaperData();
  }, [examId]);

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Exam Paper Review</h1>

      <div className="mb-6">
        <p className='text-blue-700 '><strong className='text-black'>Exam Type:</strong> {paperData?.examType.toUpperCase()   }</p>
        <p className='text-blue-700 '><strong className='text-black'>Total Questions:</strong> {paperData?.totalQuestions}</p>
        <p className='text-blue-700 '><strong className='text-black'>Attempted Questions:</strong> {paperData?.questions?.filter(q=>q.selectedAnswer).length || 0}</p>
        <p className='text-blue-700 '><strong className='text-black'>Correct Questions:</strong> {paperData?.questions?.filter(q=>q.isCorrect).length || 0}</p>
        <p className='text-blue-700 '><strong className='text-black'>Total Marks:</strong> {paperData?.totalQuestions * 4}</p>
        <p className='text-blue-700 '><strong className='text-black'>Obtained Marks:</strong> {paperData?.marks}</p>
        <p className='text-blue-700 '><strong className='text-black'>Percentage:</strong> {paperData?.percentage}%</p>
        <p className='text-blue-700 '>
          <strong className='text-black'>Date:</strong>{' '}
          {paperData?.timestamp
            ? new Date(paperData.timestamp).toLocaleString('en-IN', {
                dateStyle: 'short',
                timeStyle: 'short',
              })
            : ''}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-3">Questions</h2>

      {paperData?.questions?.map((q, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <p className="font-medium mb-2">
            {index + 1}. {q.question || "No question text available"}
          </p>

          <div className="space-y-1">
            {q.options.map((opt, i) => {
              const isSelected = q.selectedAnswer === opt;
              const isCorrect = q.correctAnswer === opt;

              let color = 'text-gray-800';
              if (isSelected && isCorrect) color = 'text-green-600 font-bold';
              else if (isSelected && !isCorrect) color = 'text-red-600 font-bold';
              else if (!isSelected && isCorrect) color = 'text-green-500 italic';

              return (
                <p key={i} className={`${color}`}>
                  {isSelected && (isCorrect ? '✅ ' : '❌ ')}
                  {opt}
                </p>
              );
            })}
          </div>

          <div className="mt-2">
            {q.selectedAnswer ? (
              q.isCorrect ? (
                <p className="text-green-600">Correct! ✅</p>
              ) : (
                <p className="text-red-600">
                  Incorrect. Correct Answer: <strong>{q.correctAnswer}</strong>
                </p>
              )
            ) : (
              <p className="text-gray-500">Not Attempted</p>
            )}
          </div>

          {q.description && (
            <p className="text-sm text-gray-500 mt-1">Explanation: {q.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ViewPaper;

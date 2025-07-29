// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useAuth } from '../context/authContext';

// function ViewPaper() {
//   const { examId } = useParams();
//   const [paperData, setPaperData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const { setIsAuthenticated, setUser } = useAuth();

//    useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
//           {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setIsAuthenticated(true);
//         setUser(response.data.user);
//       } catch {
//         setIsAuthenticated(false);
//         setUser(null);
//       }
//     };

//     fetchUser();
//   }, [setIsAuthenticated, setUser]);


//   useEffect(() => {
//     const fetchPaperData = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/v1/exam/data/preview-paper/${examId}`,
//           {
//             withCredentials: true,
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );
//         setPaperData(response.data.data);
//         toast.success('Paper data fetched successfully');
//       } catch (error) {
//         toast.error('Failed to fetch paper data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaperData();
//   }, [examId]);

//   if (loading) return <p className="text-center p-4">Loading...</p>;

//   return (
//     <div className="container p-6 max-w-4xl">
//       <h1 className="text-3xl font-bold text-blue-700 mb-4">Exam Paper Review</h1>

//       <div className="mb-6">
//         <p className='text-blue-700 '><strong className='text-black'>Exam Type:</strong> {paperData?.examType.toUpperCase()   }</p>
//         <p className='text-blue-700 '><strong className='text-black'>Total Questions:</strong> {paperData?.totalQuestions}</p>
//         <p className='text-blue-700 '><strong className='text-black'>Attempted Questions:</strong> {paperData?.questions?.filter(q=>q.selectedAnswer).length || 0}</p>
//         <p className='text-blue-700 '><strong className='text-black'>Correct Questions:</strong> {paperData?.questions?.filter(q=>q.isCorrect).length || 0}</p>
//         <p className='text-blue-700 '><strong className='text-black'>Total Marks:</strong> {paperData?.totalQuestions * 4}</p>
//         <p className='text-blue-700 '><strong className='text-black'>Obtained Marks:</strong> {paperData?.marks}</p>
//         <p className='text-blue-700 '><strong className='text-black'>Percentage:</strong> {paperData?.percentage}%</p>
//         <p className='text-blue-700 '>
//           <strong className='text-black'>Date:</strong>{' '}
//           {paperData?.timestamp
//             ? new Date(paperData.timestamp).toLocaleString('en-IN', {
//                 dateStyle: 'short',
//                 timeStyle: 'short',
//               })
//             : ''}
//         </p>
//       </div>

//       <h2 className="text-2xl font-semibold mb-3">Questions</h2>

//       {paperData?.questions?.map((q, index) => (
//         <div key={index} className="mb-6 border-b pb-4">
//           <p className="font-medium mb-2">
//             {index + 1}. {q.question || "No question text available"}
//           </p>

//           <div className="space-y-1">
//             {q.options.map((opt, i) => {
//               const isSelected = q.selectedAnswer === opt;
//               const isCorrect = q.correctAnswer === opt;

//               let color = 'text-gray-800';
//               if (isSelected && isCorrect) color = 'text-green-600 font-bold';
//               else if (isSelected && !isCorrect) color = 'text-red-600 font-bold';
//               else if (!isSelected && isCorrect) color = 'text-green-500 italic';

//               return (
//                 <p key={i} className={`${color}`}>
//                   {isSelected && (isCorrect ? '✅ ' : '❌ ')}
//                   {opt}
//                 </p>
//               );
//             })}
//           </div>

//           <div className="mt-2">
//             {q.selectedAnswer ? (
//               q.isCorrect ? (
//                 <p className="text-green-600">Correct! ✅</p>
//               ) : (
//                 <p className="text-red-600">
//                   Incorrect. Correct Answer: <strong>{q.correctAnswer}</strong>
//                 </p>
//               )
//             ) : (
//               <p className="text-gray-500">Not Attempted</p>
//             )}
//           </div>

//           {q.description && (
//             <p className="text-sm text-gray-500 mt-1">Explanation: {q.description}</p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ViewPaper;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";

function ViewPaper() {
  const { examId } = useParams();
  const [paperData, setPaperData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setIsAuthenticated, setUser } = useAuth();

  /* ---------- auth check ---------- */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(data.user);
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      }
    })();
  }, []);

  /* ---------- fetch paper ---------- */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/exam/data/preview-paper/${examId}`,
          { withCredentials: true }
        );
        setPaperData(data.data);
      } catch {
        toast.error("Failed to fetch paper data");
      } finally {
        setLoading(false);
      }
    })();
  }, [examId]);

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <span className="animate-spin h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!paperData) {
    return <p className="text-center mt-10 text-red-600">No data found.</p>;
  }

  /* ---------- helpers ---------- */
  const attempted = paperData.questions.filter(q => q.selectedAnswer).length;
  const correct   = paperData.questions.filter(q => q.isCorrect).length;
  const totalMark = paperData.totalQuestions * 4;

  /* ---------- UI ---------- */
  return (
    <div className="mx-auto max-w-5xl px-6 py-8 space-y-8">
      {/* header */}
      <header>
        <h1 className="text-3xl font-bold text-blue-700 mb-1">
          Exam Paper Review
        </h1>
        <p className="text-gray-500">
          Exam&nbsp;ID:&nbsp;<span className="font-mono">{examId}</span>
        </p>
      </header>

      {/* stats grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Exam Type", paperData.examType.toUpperCase()],
          ["Total Qns", paperData.totalQuestions],
          ["Attempted", attempted],
          ["Correct", correct],
          ["Total Marks", totalMark],
          ["Obtained", paperData.marks],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-lg bg-slate-50 px-4 py-3 shadow-sm ring-1 ring-slate-200"
          >
            <p className="text-xs tracking-wide text-slate-500">{label}</p>
            <p className="text-lg font-semibold text-slate-800">{value}</p>
          </div>
        ))}
      </section>

      {/* percentage bar */}
      <section className="space-y-1">
        <p className="text-sm font-medium text-slate-600">Percentage</p>
        <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${paperData.percentage}%` }}
          />
        </div>
        {/* <p className="text-sm text-slate-500">
          {paperData.percentage.toFixed(2)}%
        </p> */}
        <p className="text-xs text-slate-400">
          {new Date(paperData.timestamp).toLocaleString("en-IN", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </p>
      </section>

      {/* questions */}
      <section className="space-y-6">
        {paperData.questions.map((q, idx) => (
          <QuestionCard key={idx} q={q} index={idx} />
        ))}
      </section>
    </div>
  );
}

/* ------------ Question Card sub‑component ------------ */
function QuestionCard({ q, index }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={`rounded-lg border ${
        q.isCorrect ? "border-emerald-300" : q.selectedAnswer ? "border-red-300" : "border-slate-200"
      } shadow-sm`}
    >
      {/* header row */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
      >
        <span
          className={`font-medium ${
            q.isCorrect
              ? "text-emerald-700"
              : q.selectedAnswer
              ? "text-red-700"
              : "text-slate-800"
          }`}
        >
          {index + 1}. {q.question}
        </span>
        {open ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
      </button>

      {/* body */}
      {open && (
        <div className="space-y-2 border-t px-4 py-3">
          {q.options.map(opt => {
            const isSel = q.selectedAnswer === opt;
            const isCor = q.correctAnswer === opt;

            let cls = "text-slate-700";
            if (isSel && isCor) cls = "font-semibold text-emerald-600";
            else if (isSel && !isCor) cls = "font-semibold text-red-600";
            else if (!isSel && isCor) cls = "italic text-emerald-500";

            return (
              <p key={opt} className={cls}>
                {isSel && (isCor ? "✅ " : "❌ ")}
                {opt}
              </p>
            );
          })}

          <p className="text-sm">
            {q.selectedAnswer ? (
              q.isCorrect ? (
                <span className="text-emerald-600">Correct! ✅</span>
              ) : (
                <>
                  <span className="text-red-600">Incorrect.</span>{" "}
                  Correct Answer: <strong>{q.correctAnswer}</strong>
                </>
              )
            ) : (
              <span className="text-slate-500">Not Attempted</span>
            )}
          </p>

          {q.description && (
            <p className="text-sm text-slate-500">
              <span className="font-medium text-slate-600">Explanation: </span>
              {q.description}
            </p>
          )}
        </div>
      )}
    </article>
  );
}

export default ViewPaper;

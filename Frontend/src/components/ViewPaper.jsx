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


  const attempted = paperData.questions.filter(q => q.selectedAnswer).length;
  const correct   = paperData.questions.filter(q => q.isCorrect).length;
  const totalMark = paperData.totalQuestions * 4;

  
  return (
    <div className="mx-auto max-w-5xl px-6 py-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-blue-700 mb-1">
          Exam Paper Review
        </h1>
        <p className="text-gray-500">
          Exam ID: <span className="font-mono">{examId}</span>
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Exam Type", paperData.examType.toUpperCase()],
          ["Total Questions", paperData.totalQuestions],
          ["Attempted Questions", attempted],
          ["Correct Questions", correct],
          ["Total Marks", totalMark],
          ["Obtained Marks", paperData.marks],
          ["Percentage", `${paperData.percentage}%`],
          ["Date", new Date(paperData.timestamp).toLocaleString("en-IN", {
            dateStyle: "short",
            timeStyle: "short",
          })],
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

      
      <section className="space-y-6">
        {paperData.questions.map((q, idx) => (
          <QuestionCard key={idx} q={q} index={idx} />
        ))}
      </section>
    </div>
  );
}

function QuestionCard({ q, index }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={`rounded-lg border ${
        q.isCorrect ? "border-emerald-300" : q.selectedAnswer ? "border-red-300" : "border-slate-200"
      } shadow-sm`}
    >
      
      <button
        onClick={() => setOpen(!open)}
        className=" cursor-pointer flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
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

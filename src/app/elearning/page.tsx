"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Clock, 
  PlayCircle, 
  HelpCircle, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Download
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ELearningPage() {
  const { isNepali, l } = useLanguage();
  const { courses, completedCourses, saveCourseCertificate } = useData();
  const { user } = useAuth();

  const [activeCourseId, setActiveCourseId] = useState<string>(courses[0].id);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>(user?.name || "Student Participant");

  const currentCourse = courses.find((c) => c.id === activeCourseId) || courses[0];
  const currentModule = currentCourse.modules[activeModuleIndex];

  // Quiz grading
  const calculateScore = () => {
    let correct = 0;
    currentCourse.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / currentCourse.quiz.length) * 100);
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuizSubmitted(true);
    const score = calculateScore();
    if (score >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      saveCourseCertificate(currentCourse.id, studentName, score);
    }
  };

  const isCompleted = !!completedCourses[currentCourse.id];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{isNepali ? "ई-लर्निङ एकेडेमी" : "NHS Hemophilia E-Learning Academy"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "अनलाइन चिकित्सा तथा बिरामी शिक्षा केन्द्र" : "Self-Paced Hemophilia Clinical & Family Academy"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "बिरामी, अभिभावक तथा स्वास्थ्यकर्मीहरूका लागि निःशुल्क अनलाइन तालिम। अध्यायहरू पूरा गर्नुहोस्, प्रश्नोत्तरमा भाग लिनुहोस् र आधिकारिक प्रमाणपत्र प्राप्त गर्नुहोस्।"
              : "Complete interactive learning modules designed by hematologists, test your comprehension with instant quizzes, and download your accredited Certificate of Completion."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Course Switcher Tabs */}
        <div className="flex flex-wrap gap-3 pb-2 border-b border-slate-200">
          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCourseId(c.id);
                setActiveModuleIndex(0);
                setQuizMode(false);
                setSelectedAnswers({});
                setQuizSubmitted(false);
              }}
              className={`p-3.5 rounded-2xl text-left border transition-all flex-1 min-w-[280px] ${
                activeCourseId === c.id
                  ? "bg-white border-primary shadow-md ring-2 ring-primary/20"
                  : "bg-white/60 border-slate-200 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-primary font-bold">{c.level}</span>
                <span className="text-slate-500">⏱️ {c.durationMinutes} mins</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{l(c.title)}</h3>
              <span className="text-[11px] text-slate-500">{c.targetAudience}</span>
            </button>
          ))}
        </div>

        {/* Course Content Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Modules List */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold uppercase text-slate-400">Course Syllabus</span>
              <h3 className="font-bold text-base text-slate-900">{l(currentCourse.title)}</h3>
            </div>

            <div className="space-y-2">
              {currentCourse.modules.map((mod, idx) => (
                <button
                  key={mod.id}
                  onClick={() => {
                    setActiveModuleIndex(idx);
                    setQuizMode(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between gap-2 ${
                    !quizMode && activeModuleIndex === idx
                      ? "bg-primary text-white shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="line-clamp-1">{l(mod.title)}</span>
                  </div>
                  <span className="text-[10px] opacity-75 shrink-0">{mod.duration}</span>
                </button>
              ))}

              {/* Quiz Module Button */}
              <button
                onClick={() => setQuizMode(true)}
                className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between gap-2 ${
                  quizMode
                    ? "bg-accent text-white shadow-sm"
                    : "bg-red-50 hover:bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Knowledge Assessment Quiz</span>
                </div>
                <span className="text-[10px] font-semibold">{currentCourse.quiz.length} Questions</span>
              </button>
            </div>

            {isCompleted && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Course Completed!</span>
                </div>
                <p>Score: {completedCourses[currentCourse.id].score}% on {completedCourses[currentCourse.id].date}</p>
              </div>
            )}
          </div>

          {/* Right Main Panel: Module Content or Quiz */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
            
            {!quizMode ? (
              <div className="space-y-6 animate-in fade-in duration-150">
                
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-primary uppercase tracking-wide">
                    Module {activeModuleIndex + 1} of {currentCourse.modules.length}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                    {l(currentModule.title)}
                  </h2>
                </div>

                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
                  <p>{l(currentModule.content)}</p>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="font-bold text-xs uppercase text-slate-800 tracking-wider">
                      Key Clinical Learning Takeaways:
                    </h4>
                    <ul className="space-y-2">
                      {currentModule.bulletPoints.map((bp, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{l(bp)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <button
                    disabled={activeModuleIndex === 0}
                    onClick={() => setActiveModuleIndex(activeModuleIndex - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
                  >
                    ← Previous Module
                  </button>

                  {activeModuleIndex < currentCourse.modules.length - 1 ? (
                    <button
                      onClick={() => setActiveModuleIndex(activeModuleIndex + 1)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-dark shadow-sm flex items-center gap-1.5"
                    >
                      <span>Next Module</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setQuizMode(true)}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-accent hover:bg-accent-dark shadow-md flex items-center gap-1.5"
                    >
                      <Award className="w-4 h-4" />
                      <span>Take Quiz & Get Certified</span>
                    </button>
                  )}
                </div>

              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-150">
                
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-accent uppercase tracking-wide">
                    Knowledge Assessment
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                    Course Quiz & Certification Test
                  </h2>
                  <p className="text-xs text-slate-500">
                    Score at least 70% to unlock and download your official NHS Certificate.
                  </p>
                </div>

                {/* Student Name Input */}
                <div className="space-y-1 max-w-sm">
                  <label className="text-xs font-bold text-slate-700">Certificate Recipient Name:</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900"
                  />
                </div>

                {/* Questions */}
                <form onSubmit={handleQuizSubmit} className="space-y-6">
                  {currentCourse.quiz.map((q, qIdx) => (
                    <div key={qIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <h4 className="font-bold text-sm text-slate-900">
                        {qIdx + 1}. {l(q.question)}
                      </h4>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => (
                          <label
                            key={optIdx}
                            className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                              selectedAnswers[qIdx] === optIdx
                                ? "bg-primary-50 border-primary text-primary-900 font-bold"
                                : "bg-white border-slate-200 hover:bg-slate-100 text-slate-700"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${qIdx}`}
                              required
                              checked={selectedAnswers[qIdx] === optIdx}
                              onChange={() => setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx })}
                              className="text-primary focus:ring-primary"
                            />
                            <span>{l(opt)}</span>
                          </label>
                        ))}
                      </div>

                      {quizSubmitted && (
                        <div className={`p-3 rounded-xl text-xs ${
                          selectedAnswers[qIdx] === q.correctIndex
                            ? "bg-emerald-100 text-emerald-900"
                            : "bg-red-100 text-red-900"
                        }`}>
                          <strong>{selectedAnswers[qIdx] === q.correctIndex ? "✓ Correct: " : "✗ Incorrect: "}</strong>
                          {l(q.explanation)}
                        </div>
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                  >
                    <Award className="w-4 h-4" />
                    <span>Submit Quiz Answers</span>
                  </button>
                </form>

                {/* Certificate Display if Passed */}
                {quizSubmitted && calculateScore() >= 70 && (
                  <div className="mt-8 p-8 bg-gradient-medical text-white rounded-3xl border-4 border-amber-300 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-300">
                    <div className="space-y-1">
                      <span className="text-[11px] font-black uppercase tracking-widest text-amber-300">
                        OFFICIAL CERTIFICATE OF COMPLETION
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        Nepal Hemophilia Society (नेपाल हेमोफिलिया सोसाइटी)
                      </h3>
                    </div>

                    <p className="text-xs text-slate-200 italic">This certifies that</p>
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-serif tracking-wide border-b border-amber-300/40 pb-2 max-w-md mx-auto">
                      {studentName}
                    </div>

                    <p className="text-xs text-slate-200 max-w-lg mx-auto leading-relaxed">
                      has successfully completed the curriculum and knowledge assessment for <strong>{l(currentCourse.title)}</strong> with an examination score of <strong>{calculateScore()}%</strong>.
                    </p>

                    <div className="pt-4 flex items-center justify-between text-[11px] text-slate-300 border-t border-white/10 max-w-lg mx-auto">
                      <div>
                        <span>Date: {new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="font-mono text-amber-300">
                        Code: NHS-CERT-{currentCourse.id.toUpperCase()}-{Math.floor(1000 + Math.random() * 9000)}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => window.print()}
                        className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto shadow-lg"
                      >
                        <Download className="w-4 h-4" />
                        <span>Print / Save Verified PDF Certificate</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

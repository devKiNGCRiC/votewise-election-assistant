"use client";

import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "What is the minimum age required for an Indian citizen to vote?",
    explanation: "The 61st Amendment Act, 1988, lowered the voting age in India from 21 years to 18 years for Lok Sabha and State Legislative Assembly elections.",
    options: [
      { id: "A", label: "16 years old", sub: "Proposed for some local polls but not national." },
      { id: "B", label: "18 years old", sub: "The national standard per the 61st Amendment." },
      { id: "C", label: "21 years old", sub: "The original requirement before 1988." },
      { id: "D", label: "25 years old", sub: "Age requirement for contesting Lok Sabha polls." }
    ],
    correctAnswer: "B"
  },
  {
    id: 2,
    question: "What is the normal tenure of the Lok Sabha in India?",
    explanation: "According to the Constitution, the Lok Sabha continues for five years from the date appointed for its first meeting, unless sooner dissolved.",
    options: [
      { id: "A", label: "4 years", sub: "Common for some municipal bodies." },
      { id: "B", label: "5 years", sub: "The standard term for Lok Sabha & Vidhan Sabha." },
      { id: "C", label: "6 years", sub: "The tenure for members of the Rajya Sabha." },
      { id: "D", label: "Indefinite", sub: "Elections must be held periodically." }
    ],
    correctAnswer: "B"
  },
  {
    id: 3,
    question: "Which body is responsible for conducting elections in India?",
    explanation: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering Union and State election processes.",
    options: [
      { id: "A", label: "Supreme Court", sub: "Handles legal disputes but not administration." },
      { id: "B", label: "Election Commission of India", sub: "The apex body for managing all Indian polls." },
      { id: "C", label: "NITI Aayog", sub: "A policy think tank, not an electoral body." },
      { id: "D", label: "Home Ministry", sub: "Provides security but does not conduct polls." }
    ],
    correctAnswer: "B"
  },
  {
    id: 4,
    question: "What does EVM stand for?",
    explanation: "EVM stands for Electronic Voting Machine. It is a secure, tamper-proof device used in Indian elections to cast and count votes electronically.",
    options: [
      { id: "A", label: "Electronic Voter Management", sub: "Incorrect acronym." },
      { id: "B", label: "Electronic Verification Method", sub: "Not related to voting machines." },
      { id: "C", label: "Electronic Voting Machine", sub: "The correct full form used in Indian elections." },
      { id: "D", label: "Electoral Verification Module", sub: "Does not exist." }
    ],
    correctAnswer: "C"
  },
  {
    id: 5,
    question: "What is NOTA in the context of Indian elections?",
    explanation: "NOTA stands for 'None of the Above'. Introduced by the Supreme Court in 2013, it allows voters to reject all candidates on the ballot.",
    options: [
      { id: "A", label: "National Order of Total Abstention", sub: "Not an official term." },
      { id: "B", label: "None of the Above", sub: "Enabled since 2013 by Supreme Court order." },
      { id: "C", label: "New Opposition Tally Act", sub: "Fictional legislation." },
      { id: "D", label: "National Opposition Tracking Agency", sub: "Does not exist." }
    ],
    correctAnswer: "B"
  },
  {
    id: 6,
    question: "What is VVPAT used for in Indian elections?",
    explanation: "VVPAT (Voter Verifiable Paper Audit Trail) prints a paper slip showing the candidate symbol voted for, displayed for 7 seconds so the voter can verify.",
    options: [
      { id: "A", label: "Counting digital votes", sub: "Votes are counted by the EVM itself." },
      { id: "B", label: "Providing a paper receipt for verification", sub: "VVPAT shows a slip for 7 seconds for voter verification." },
      { id: "C", label: "Storing biometric data", sub: "VVPAT is not used for biometrics." },
      { id: "D", label: "Transmitting votes wirelessly", sub: "EVMs are not networked." }
    ],
    correctAnswer: "B"
  },
  {
    id: 7,
    question: "Which document is primarily used as proof of identity at an Indian polling booth?",
    explanation: "The EPIC (Elector's Photo Identity Card), also called the Voter ID Card, is the primary document accepted at polling booths. 12 alternative documents are also accepted.",
    options: [
      { id: "A", label: "Aadhaar Card", sub: "Accepted as alternative but not the primary ID." },
      { id: "B", label: "PAN Card", sub: "One of 12 alternatives, not the primary." },
      { id: "C", label: "EPIC (Voter ID Card)", sub: "The primary electoral identification document issued by ECI." },
      { id: "D", label: "Passport", sub: "Accepted as an alternative document." }
    ],
    correctAnswer: "C"
  },
  {
    id: 8,
    question: "Which system does India use to elect Lok Sabha members?",
    explanation: "India uses the First-Past-The-Post (FPTP) system, where the candidate with the highest number of votes in a constituency wins.",
    options: [
      { id: "A", label: "Proportional Representation", sub: "Used in some countries but not for Lok Sabha." },
      { id: "B", label: "Single Transferable Vote", sub: "Used for Rajya Sabha, not Lok Sabha." },
      { id: "C", label: "First-Past-The-Post (FPTP)", sub: "The candidate with the most votes wins." },
      { id: "D", label: "Two-Round System", sub: "Not used in India." }
    ],
    correctAnswer: "C"
  },
  {
    id: 9,
    question: "What is the Model Code of Conduct (MCC) in Indian elections?",
    explanation: "The MCC is a set of guidelines issued by the ECI governing the conduct of political parties and candidates during elections to ensure free and fair polls.",
    options: [
      { id: "A", label: "A law passed by Parliament", sub: "The MCC is not a statutory law." },
      { id: "B", label: "ECI guidelines for parties & candidates", sub: "Correct — enforced by ECI for fair elections." },
      { id: "C", label: "Voter registration rules", sub: "Not related to voter registration." },
      { id: "D", label: "Rules for counting votes", sub: "Vote counting follows separate procedures." }
    ],
    correctAnswer: "B"
  },
  {
    id: 10,
    question: "Who appoints the Chief Election Commissioner of India?",
    explanation: "The Chief Election Commissioner of India is appointed by the President of India under Article 324 of the Constitution.",
    options: [
      { id: "A", label: "Prime Minister", sub: "The PM recommends but does not formally appoint." },
      { id: "B", label: "Chief Justice of India", sub: "The CJI does not have appointing authority here." },
      { id: "C", label: "President of India", sub: "Correct — appointed by the President under Article 324." },
      { id: "D", label: "Parliament", sub: "Parliament does not make this appointment." }
    ],
    correctAnswer: "C"
  }
];

export default function QuizPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = questions[currentIdx];
  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  const handleOptionClick = (optionId: string) => {
    if (showExplanation) return;
    setSelectedOption(optionId);
    setShowExplanation(true);
    if (optionId === currentQuestion.correctAnswer) {
      setScore((s) => s + 100);
      setCorrectCount((c) => c + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setCorrectCount(0);
    setQuizComplete(false);
  };

  const accuracy = Math.round((correctCount / questions.length) * 100);

  const getGrade = () => {
    if (accuracy >= 90) return { label: "Civic Champion!", icon: "emoji_events", color: "text-yellow-400" };
    if (accuracy >= 70) return { label: "Well Informed!", icon: "star", color: "text-[#FF9933]" };
    if (accuracy >= 50) return { label: "Good Effort!", icon: "thumb_up", color: "text-blue-400" };
    return { label: "Keep Learning!", icon: "school", color: "text-purple-400" };
  };

  if (quizComplete) {
    const grade = getGrade();
    return (
      <main className="flex-grow flex flex-col items-center justify-center px-5 md:px-0 max-w-2xl mx-auto w-full relative z-10 py-12 pt-32 pb-40 md:pb-24">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary-container/10 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-secondary-container/20 blur-[120px]" />
        </div>
        <div className="w-full glass-card rounded-3xl p-8 md:p-12 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-container/30 to-secondary-container/20 border border-primary-container/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,153,51,0.2)]">
            <span className={`material-symbols-outlined text-5xl ${grade.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
              {grade.icon}
            </span>
          </div>
          <h1 className="text-h1 text-on-surface mb-2">{grade.label}</h1>
          <p className="text-body-md text-on-surface-variant mb-8">You completed the Indian Democracy Quiz</p>
          <div className="grid grid-cols-3 gap-3 w-full mb-8">
            {[
              { label: "Score", value: `${score}`, suffix: "pts", color: "text-[#FF9933]" },
              { label: "Correct", value: `${correctCount}/${questions.length}`, suffix: "", color: "text-green-400" },
              { label: "Accuracy", value: `${accuracy}`, suffix: "%", color: "text-blue-400" },
            ].map(({ label, value, suffix, color }) => (
              <div key={label} className="flex flex-col items-center bg-surface-container/60 rounded-2xl py-4 px-2 border border-white/5">
                <span className={`text-2xl font-black ${color}`}>{value}{suffix}</span>
                <span className="text-label-sm text-on-surface-variant mt-1">{label}</span>
              </div>
            ))}
          </div>
          <div className="w-full mb-8">
            <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-container to-primary rounded-full shadow-[0_0_10px_rgba(255,153,51,0.5)] transition-all duration-1000" style={{ width: `${accuracy}%` }} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button onClick={resetQuiz} className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-primary-container text-on-primary-container font-semibold shadow-[0_0_20px_rgba(255,153,51,0.4)] hover:shadow-[0_0_30px_rgba(255,153,51,0.6)] hover:scale-[1.02] transition-all">
              <span className="material-symbols-outlined text-[18px]">replay</span>
              Try Again
            </button>
            <a href="/learn" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-surface-container-high/60 text-on-surface border border-outline-variant/30 font-semibold hover:bg-surface-container-highest hover:scale-[1.02] transition-all">
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              Go to Learn
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-5 md:px-0 max-w-4xl mx-auto w-full relative z-10 py-12 pt-32 pb-40 md:pb-24">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary-container/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-secondary-container/20 blur-[120px]" />
      </div>

      {/* Progress Header */}
      <div className="w-full flex justify-between items-center mb-6 glass-card rounded-2xl px-5 py-4">
        <div className="flex flex-col">
          <span className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Indian Democracy</span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <span className="text-h3 text-on-surface">Score: <span className="text-primary-container font-bold">{score}</span></span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-label-sm text-on-surface-variant">Q {currentIdx + 1} / {questions.length}</span>
          <div className="flex gap-1.5">
            {questions.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i < currentIdx ? "w-4 bg-primary-container" : i === currentIdx ? "w-6 bg-primary-container shadow-[0_0_6px_rgba(255,153,51,0.6)]" : "w-4 bg-surface-container-highest"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="w-full mb-8 text-center px-2">
        <h1 className="text-h2 md:text-h1 text-on-surface mb-3 leading-tight">{currentQuestion.question}</h1>
        <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">Master the fundamental concepts of the Indian electoral system.</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isQuestionCorrect = option.id === currentQuestion.correctAnswer;
          let cardStyle = "hover:bg-white/8 hover:border-white/20 cursor-pointer";
          if (showExplanation) {
            if (isQuestionCorrect) cardStyle = "border-green-500/60 bg-green-500/10";
            else if (isSelected) cardStyle = "border-red-500/50 bg-red-500/5 opacity-50 cursor-not-allowed";
            else cardStyle = "opacity-30 cursor-not-allowed";
          }
          return (
            <button key={option.id} onClick={() => handleOptionClick(option.id)} disabled={showExplanation}
              className={`glass-card rounded-2xl p-5 text-left relative overflow-hidden flex items-start gap-4 group transition-all duration-300 ${cardStyle}`}>
              {showExplanation && isQuestionCorrect && <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${showExplanation && isQuestionCorrect ? "bg-green-500 text-white" : showExplanation && isSelected && !isQuestionCorrect ? "bg-red-500/20 text-red-400" : "bg-surface-container-highest text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary-container"}`}>
                {showExplanation && isQuestionCorrect ? <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span> : showExplanation && isSelected ? <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>close</span> : option.id}
              </div>
              <div>
                <h3 className={`font-semibold text-[16px] mb-1 transition-colors ${showExplanation && isQuestionCorrect ? "text-white" : isSelected && !isQuestionCorrect ? "line-through decoration-red-500 text-on-surface" : "text-on-surface group-hover:text-primary-container"}`}>{option.label}</h3>
                <p className={`text-label-sm ${showExplanation && isQuestionCorrect ? "text-white/70" : "text-on-surface-variant"}`}>{option.sub}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`w-full mt-8 glass-card rounded-2xl p-6 md:p-8 border-t-2 ${isCorrect ? "bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30" : "bg-gradient-to-br from-red-500/10 to-transparent border-red-500/30"}`}>
          <div className="flex items-start gap-4">
            <span className={`material-symbols-outlined text-4xl ${isCorrect ? "text-green-400" : "text-red-400"}`} style={{ fontVariationSettings: "'FILL' 1" }}>
              {isCorrect ? "lightbulb" : "info"}
            </span>
            <div className="flex-1">
              <h4 className="font-bold text-[18px] text-white mb-2">{isCorrect ? "Excellent! That's correct." : "Not quite right."}</h4>
              <p className="text-body-md text-on-surface-variant mb-6">{currentQuestion.explanation}</p>
              <button onClick={nextQuestion} className="bg-gradient-to-r from-primary-container to-[#FFB366] text-white px-7 py-3 rounded-full text-label-sm uppercase tracking-wider hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(255,153,51,0.4)] flex items-center gap-2">
                {currentIdx < questions.length - 1 ? "Next Question" : "View Results"}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

import type { Metadata } from "next";
import Quiz from "./Quiz";

export const metadata: Metadata = {
  title: "Quiz",
  description: "Ten quick questions on how Indian elections work.",
};

export default function QuizPage() {
  return (
    <div className="px-4">
      <div className="mx-auto max-w-4xl">
        <Quiz />
      </div>
    </div>
  );
}

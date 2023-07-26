import React from "react";
import Quiz from "../Quiz";
import FillInTheBlank from "../FillInTheBlank";
import { QuizQuestion } from "../Quiz";
import { Question } from "../FillInTheBlank";

// Define a type for the props
export type ExercisesProps = {
  type: "Quiz" | "FillInTheBlank"; // The first parameter is the type
  data: QuizQuestion[] | Question[]; // The second parameter is the data
};

function Exercises(props: ExercisesProps) {
  // Destructure the props
  const { type, data } = props;

  // Render the component based on the type
  return (
    <div className="Exercises">
      {type === "Quiz" && <Quiz {...(data as QuizQuestion[])} />}
      {type === "FillInTheBlank" && (
        <FillInTheBlank questions={data as Question[]} />
      )}
    </div>
  );
}

export default Exercises;


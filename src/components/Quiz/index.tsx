import React, { useState, useEffect } from "react";
import "./index.css";
import { Button, Typography } from "@mui/material";

export interface QuizQuestion {
  questionText: string;
  answerOptions: AnswerOption[];
}

interface AnswerOption {
  answerText: string;
  isCorrect: boolean;
}
// A component to render a single question
function QuestionComp({ question, index, total, onAnswer, style }) {

  // Destructure the question prop
  const { questionText, answerOptions } = question;
  return (
    <div className="question-section" style={style}>
      {" "}
      <div className="question-count">
        <span>Question {index + 1}</span>/{total}
      </div>
      <div className="question-text">{questionText}</div>
      <div className="answer-section">
        {answerOptions.map((answerOption) => (
          <button
            className="quiz__button"
            onClick={() => onAnswer(answerOption.isCorrect)}
          >
            <Typography
              variant="body1"
              sx={{ color: "white", textAlign: "start" }}
            >
              {" "}
              {answerOption.answerText}
            </Typography>
          </button>
        ))}
      </div>
    </div>
  );
}
const Quiz = (questions: QuizQuestion[]) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [restart, setRestart] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number>(0);

  questions = Object.values(questions);

  useEffect(() => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setHighScore(
      localStorage.getItem("score")
        ? parseInt(localStorage.getItem("score"))
        : 0
    );
  }, [restart]);

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
      var storageScore = localStorage.getItem("score");
      if (storageScore === null) {
        localStorage.setItem("score", JSON.stringify(score + 1));
        setHighScore(score + 1);
      } else {
        if (score >= parseInt(storageScore)) {
          localStorage.setItem("score", JSON.stringify(score + 1));
          setHighScore(score + 1);
        }
      }
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz">
      <div className="app__quiz">
        {/* Use ternary operators to simplify conditional rendering */}
        {showScore || questions.length === 0 ? (
          <div className="score-section">
            {questions.length === 0 ? (
              <div>There are no questions</div>
            ) : (
              <div className="quiz__container">
                <Typography variant="h6" gutterBottom>
                  Your score is {score} out of {questions.length}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Your highest score : {highScore}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setRestart(!restart)}
                  className="quiz__button"
                >
                  Restart
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div
            className="quiz__container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Use map to render a list of questions and only show the one that matches the currentQuestion index */}
            {questions.map((question: QuizQuestion, index) => (
              <QuestionComp
                key={index + question.questionText.length}
                question={question}
                index={index}
                total={questions.length}
                onAnswer={handleAnswerOptionClick}
                style={{
                  display: index === currentQuestion ? "block" : "none",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;

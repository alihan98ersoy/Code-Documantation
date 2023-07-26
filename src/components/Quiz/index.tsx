import React, { useState, useEffect } from "react";
import { Question } from "./question";
import "./index.css";
import { Button } from "@mui/material";

// A component to render a single question
function QuestionComp({ question, index, total, onAnswer, style }) {
  return (
    <div className="question-section" style={style}>
      <div className="question-count">
        <span>Question {index + 1}</span>/{total}
      </div>
      <div className="question-text">{question.questionText}</div>
      <div className="answer-section">
        {question.answerOptions.map((answerOption) => (
          <button
            className="quiz__button"
            onClick={() => onAnswer(answerOption.isCorrect)}
          >
            {answerOption.answerText}
          </button>
        ))}
      </div>
    </div>
  );
}

function Quiz(questions: Question[]) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [restart, setRestart] = useState<boolean>(false);

  questions = Object.values(questions);

  useEffect(() => {
      setCurrentQuestion(0);
      setScore(0);
      setShowScore(false);

  }, [restart]);


  const handleAnswerOptionClick = (isCorrect: boolean) => {
    console.log(isCorrect);
    if (isCorrect) {
      setScore(score + 1);
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
        {showScore || questions.length === 0 ? (
          <div className="score-section">
            {questions.length === 0 ? (
              <div>There are no questions</div>
            ) : (
              <div className="quiz__container">
                You scored {score} out of {questions.length}
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
            {/* // Render a list of questions and only show the one that matches the currentQuestion index */}
            {questions.map((question: Question, index) => (
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
}

export default Quiz;

import React from "react";
import { Blank } from "."; // importing from index.ts
import { Box, Typography, Stack } from "@mui/material"; // importing MUI X components
import { Question } from "../index";
import useMediaQuery from "@mui/material/useMediaQuery";

interface SentenceProps {
  sentenceParts: string[];
  userAnswers: Record<string, string>;
  answers: string[];
  showResults: boolean;
  question: Question;
  setUserAnswer: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  index: number;
  totalQuestions: number;
}

export const Sentence = ({
  sentenceParts,
  userAnswers,
  answers,
  showResults,
  question,
  setUserAnswer,
  index,
  totalQuestions,
}: SentenceProps) => {
  // Create media queries for different device sizes

  const isMobile = useMediaQuery("(max-width: 767px)"); // "mobile
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)"); // "tablet

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Dinamik hale getirilecek */}
      <Typography variant="h6" gutterBottom>
        Question {index + 1} of {totalQuestions}
      </Typography>
      <Stack
        sx={{
          flexDirection: "row",
          wordSpacing: 1.5,
          spacing: 1,
          alignItems: "center",
          padding: "0.5rem",
          fontSize: isMobile ? "0.5rem" : isTablet ? "1.2rem" : "1.4rem", // adjust font size based on device size
        }}
      >
        {sentenceParts.map((part, index) => (       
          <React.Fragment key={index}>
            <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
              {part}
            </Typography>
            {index !== sentenceParts.length - 1 && (
              <Blank
                index={index}
                userAnswer={userAnswers[`blank_${index}`]}
                answers={answers}
                showResults={showResults}
                correctAnswer={question.correctAnswer} // pass an array
                setUserAnswer={setUserAnswer}
              />
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Box>
  );
};

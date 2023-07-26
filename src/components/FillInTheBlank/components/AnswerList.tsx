import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Answer, AnswerProps } from "."; // importing from index.ts
import { Box, Paper, Typography, Stack } from "@mui/material"; // importing MUI X components

type UserAnswers = {
  [answer in AnswerProps["answer"]]: AnswerProps["userAnswer"];
};

interface AnswerListProps {
  answers: string[];
  userAnswers: UserAnswers;
  showResults: boolean;
}

export const AnswerList: React.FC<AnswerListProps> = ({
  answers,
  userAnswers,
  showResults,
}) => {
  return (
    <Box
      sx={{
        border: "1px dashed lightgray",
        margin: "0.5rem",
        display: "Grid",
        width: "max-content",
        minWidth: "50vh",
      }}
    >
      <Typography variant="h6" gutterBottom></Typography>
      <Droppable droppableId="answers">
        {(provided) => (
          <Stack // using Stack component
            ref={provided.innerRef}
            {...provided.droppableProps}
            spacing={1}
            sx={{
              padding: "0.5em",
              display: "Grid",
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            {answers.map((answer, index) => (
              <Draggable key={answer} draggableId={answer} index={index}>
                {(provided) => (
                  <Answer
                    answer={answer}
                    userAnswer={userAnswers[answer]}
                    provided={provided}
                    showResults={showResults}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </Box>
  );
};

import React from "react";
import { Box, Typography, IconButton } from "@mui/material"; // importing MUI X components
import DragHandleIcon from "@mui/icons-material/DragHandle"; // importing icon
import { useTextColor } from "../hooks/useTextColor";


export interface AnswerProps {
  answer: string;
  userAnswer?: string;
  provided: any;
  showResults: boolean;
}

export const Answer = ({ answer, userAnswer, provided, showResults } : AnswerProps) => {

  const textColor = useTextColor(showResults, userAnswer);

  return (
    <Box // using Box component
      ref={provided.innerRef}
      {...provided.draggableProps}
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: userAnswer ? "lightgray" : "white",
        textDecoration: userAnswer ? "line-through" : "none",
        position: "relative",
        zIndex: 1,
        color: textColor,
        ...provided.draggableProps.style,
      }}
    >
      <IconButton // using IconButton component
        {...provided.dragHandleProps}
        size="small"
        sx={{
          marginRight: "0.5em",
          cursor: "grab",
          zIndex: 2,
          color: textColor,
        }}
      >
        <DragHandleIcon />
      </IconButton>
      <Typography variant="body1">{answer}</Typography>
    </Box>
  );
};

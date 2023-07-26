import React, { useReducer } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Box, Typography, Chip } from "@mui/material"; // importing MUI X components
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // importing icon
import CancelIcon from "@mui/icons-material/Cancel"; // importing icon

interface BlankProps {
  index: number;
  userAnswer?: string;
  answers: string[];
  showResults: boolean;
  correctAnswer: string[]; // change this type
  setUserAnswer: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

type Action =
  | { type: "drop"; answer: string }
  | { type: "delete" }
  | { type: "reset" };

type State = {
  userAnswer?: string;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "drop":
      return { userAnswer: action.answer };
    case "delete":
      return { userAnswer: undefined };
    case "reset":
      return { userAnswer: undefined };
    default:
      return state;
  }
};

export const Blank = ({
  index,
  userAnswer,
  answers,
  showResults,
  correctAnswer,
  setUserAnswer,
}: BlankProps) => {
  const [state, dispatch] = useReducer(reducer, { userAnswer: undefined });

  const handleDelete = () => {
    // Dispatch a delete action to update the state
    dispatch({ type: "delete" });
    // Update the parent state as well
    setUserAnswer((prev) => ({ ...prev, [`blank_${index}`]: "" }));
  };

  const getIcon = () => {
    if (!showResults) return null;
    if (correctAnswer.includes(userAnswer))
      return (
        <CheckCircleIcon
          color="success"
          sx={{ marginRight: "0.5em", flexGrow: 1 }}
        />
      ); // using CheckCircleIcon with color
    return (
      <CancelIcon color="error" sx={{ marginRight: "0.5em", flexGrow: 1 }} />
    ); // using CancelIcon with color
  };

  return (
    <Droppable
      droppableId={`blank_${index}`}
      onDragEnd={(result) => {
        // Check if the drop was successful
        if (result.destination) {
          // Get the answer from the result
          const answer = result.draggableId;
          // Dispatch a drop action to update the state
          dispatch({ type: "drop", answer });
          // Update the parent state as well
          setUserAnswer((prev) => ({ ...prev, [`blank_${index}`]: answer }));
        }
      }}
    >
      {(provided) => (
        <Box // using Box component
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            border: "1px dashed lightgray",
            padding: "0.5em",
            margin: "0.5em",
            display: "flex",
            alignItems: "right",
            float: "right",
          }}
        >
          {userAnswer ? (
            <Chip // using Chip component
              label={answers.find((answer) => answer === userAnswer)}
              //   onDelete={handleDelete}
              color="primary"
              variant="outlined"
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {" "}
              Drag answer here
            </Typography>
          )}
          {getIcon()}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

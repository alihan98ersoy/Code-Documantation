import { DropResult } from "react-beautiful-dnd";

export const useDragAndDrop = (
  sentence: string,
  answers: string[],
  userAnswers: Record<string, string>,
  setUserAnswers: (answers: Record<string, string>) => void // change this type
) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const answerId = result.draggableId;
    const targetId = result.destination.droppableId;
    const updatedUserAnswers = { ...userAnswers };
    updatedUserAnswers[targetId] = answerId;
    setUserAnswers(updatedUserAnswers); // update the state with the dispatch function
  };
  const sentenceParts = sentence.split("___");
  const answerIndices = sentenceParts
    .map((part, index) => (index !== sentenceParts.length - 1 ? index : -1))
    .filter((index) => index !== -1);
  return { handleDragEnd, answerIndices };
};

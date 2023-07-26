import { useMemo } from "react";

export const useTextColor = (showResults: boolean, userAnswer?: string) => {
  return useMemo(() => {
    if (!showResults) return "black";
    if (userAnswer) return "gray";
    return "green";
  }, [showResults, userAnswer]);
};

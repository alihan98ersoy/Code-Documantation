import React, { useState, useEffect } from "react";

const useKeyPress = function (targetKey: string) {
  const [keyPressed, setKeyPressed] = useState(false);

  // Define a function to handle the key down event
  const downHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };

  // Define a function to handle the key up event
  const upHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Use an effect to add and remove the event listeners
  useEffect(() => {
    document.addEventListener("keydown", downHandler);
    document.addEventListener("keyup", upHandler);

    return () => {
      document.removeEventListener("keydown", downHandler);
      document.removeEventListener("keyup", upHandler);
    };
  });

  // Return the state of the key press
  return keyPressed;
};

export default useKeyPress;
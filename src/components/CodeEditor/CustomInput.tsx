import React from "react";
import { classnames } from "./utils/general";
import { TextareaAutosize } from "@mui/material";
import "./css/index.css";

// Define the props type
type Props = {
  customInput: string;
  setCustomInput: (value: string) => void;
};

const CustomInput: React.FC<Props> = ({ customInput, setCustomInput }) => {
  return (
    <>
      <TextareaAutosize
        style={{ marginTop: "10px", width: "100%", height: "100%"}}
        minRows={5}
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
      />
    </>
  );
};

export default CustomInput;
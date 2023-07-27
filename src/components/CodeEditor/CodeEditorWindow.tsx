// CodeEditorWindow.tsx

import React, { useState, useEffect } from "react";

import Editor from "@monaco-editor/react";

import { Box, Typography } from "@mui/material";

// Define the props type
type Props = {
  onChange: (key: string, value: string) => void;
  language: string;
  code: string;
  theme: string;
};

const CodeEditorWindow = ({ onChange, language, code, theme }: Props) => {
  const value = code;
  const handleEditorChange = (value: string) => {
    code = value;
    onChange("code", value);
  };

  return (
    <>
      <Typography variant="h4" sx={{ color: "gradient.primary" }} mb={2}>
        Code Editor
      </Typography>
      <Box
        className="overlay"
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          width: "100%",
          height: "100%",
          boxShadow: 5,
        }}
      >
        <Editor
          height="85vh"
          width={`100%`}
          language={language || "csharp"}
          value={value}
          theme={theme}
          defaultValue={code}
          onChange={handleEditorChange}
        />
      </Box>
    </>
  );
};
export default CodeEditorWindow;

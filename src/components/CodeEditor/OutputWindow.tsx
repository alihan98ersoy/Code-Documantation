import React from "react";
import { Stack, Typography, Alert, Paper } from "@mui/material";
import { OutputDetailsProps } from "./interface/OutputDetailsProps";
import { base64Decode } from "./utils/base64Op";


const OutputWindow: React.FC<OutputDetailsProps> = (outputDetails) => {
  const getOutput = () => {
    if (!outputDetails || Object.keys(outputDetails)?.length === 0) {
      return (
        <Typography variant="body1" sx={{ color: "gradient.primary" }} m={2}>
          {base64Decode("SGVsbG8gV29ybGQK\n")}
        </Typography>
      );
    } else {
      // Define a function to get the output based on the status id

      let statusId = outputDetails?.status?.id;

      if (statusId === 6) {
        // compilation error
        return (
          <Alert severity="error" sx={{ whiteSpace: "pre-wrap" }}>
            {base64Decode(outputDetails?.compile_output)}
          </Alert>
        );
      } else if (statusId === 3) {
        // successful execution
        return (
          <pre style={{ whiteSpace: "pre-wrap", backgroundColor: "#1e293b" }}>
            {base64Decode(outputDetails?.stdout)}
          </pre>
        );
      } else if (statusId === 5) {
        // time limit exceeded
        return <Alert severity="error">Time Limit Exceeded</Alert>;
      } else {
        // runtime error
        return (
          <Paper sx={{ flex: 1, bgcolor: "#1e293b", borderRadius: "md", color: "white", minHeight: "300px", overflowY: "auto" }}>
            {base64Decode(outputDetails?.stderr)}
          </Paper>
        );
      }
    }
  };

  return (
    <>
      <Typography variant="h3" sx={{ color: "gradient.primary" }} mb={2}>
        Output
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%", overflowY: "auto" }}
      >
        <Paper
          sx={{
            flex: 1,
            bgcolor: "#1e293b",
            borderRadius: "md",
            color: "white",
            minHeight: "300px",
            overflowY: "auto",
          }}
        >
          {outputDetails ? <>{getOutput()}</> : null}
        </Paper>
      </Stack>
    </>
  );
};
export default OutputWindow;

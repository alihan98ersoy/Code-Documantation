// OutputDetails.tsx

import React from "react";
import { Box, Typography } from "@mui/material";

// Import the output details interface from the new file
import { OutputDetailsProps } from "./interface/OutputDetailsProps";

// Define a custom component for the output detail box
const OutputDetailBox: React.FC<{
  label: string;
  outputDetails: OutputDetailsProps | null;
}> = ({ label, outputDetails }) => {
  // Define a function to get the value from the outputDetails prop based on the label
  const getValue = (label: string) => {
    switch (label) {
      case "Status":
        return outputDetails?.status?.description;
      case "Memory":
        return outputDetails?.memory;
      case "Time":
        return outputDetails?.time;
      default:
        return undefined;
    }
  };

  // Get the value for the current label
  const value = getValue(label);

  return (
    <Typography variant="body1">
      {label}:{" "}
      <Box
        component="span"
        sx={{
          fontWeight: "bold",
          px: 2,
          py: 1,
          borderRadius: "md",
          bgcolor: "gray.100",
        }}
      >
        {value}
      </Box>
    </Typography>
  );
};

// Use OutputDetailsProps directly as the generic type parameter
// Remove the outputDetails prop from here
const OutputDetails: React.FC<OutputDetailsProps> = (props) => {

  return (
    <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: "1rem" }}>
      <OutputDetailBox label="Status" outputDetails={props} />
      <OutputDetailBox label="Memory" outputDetails={props} />
      <OutputDetailBox label="Time" outputDetails={props} />
    </Box>
  );
};

export default OutputDetails;

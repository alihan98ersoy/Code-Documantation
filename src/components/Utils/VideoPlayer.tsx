import React from "react";
import ReactPlayer from "react-player/lazy";
import Container from "@mui/material/Container"; // add this line
import { useTheme } from "@mui/material/styles"; // add this line
import useMediaQuery from "@mui/material/useMediaQuery"; // add this line

function VideoPlayer({ videoUrl }) {

  const theme = useTheme(); // add this line
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // add this line

  return (
    <Container maxWidth="md">
      <ReactPlayer
        url={videoUrl}
        width="100%" // add this line
        height={isSmallScreen ? "360px" : "480px"} // add this line
        controls={true}
      />
    </Container>
  );
}

export default VideoPlayer;

import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useVideoPlayer } from "./hooks/useVideoPlayer";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
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

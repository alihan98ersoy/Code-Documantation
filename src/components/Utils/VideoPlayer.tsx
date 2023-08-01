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
  const [volume, setVolume] = useState(0.5); // add this line
  const [muted, setMuted] = useState(false); // add this line
  const {
    playerRef,
    playing,
    playbackRate,
    currentTime,
    duration,
    handlePlayPause,
    handleRewind,
    handleFastForward,
    handleProgress,
  } = useVideoPlayer();

  const theme = useTheme(); // add this line
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // add this line

  return (
    <Container maxWidth="md">
      {" "}
      {/* add this line */}
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        playbackRate={playbackRate}
        volume={volume}
        muted={muted}
        fastForward={true}
        onProgress={handleProgress}
        width="100%" // add this line
        height="480px"
        pip={true}
      />
      <Stack direction="row" spacing={2} alignItems="center">
        <Paper sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-around" }}>
          <IconButton onClick={handleRewind}>
            <FastRewindIcon />
          </IconButton>
          <IconButton onClick={handlePlayPause}>
            {playing ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton onClick={handleFastForward}>
            <FastForwardIcon />
          </IconButton>
          <Slider
            value={(currentTime / duration) * 100}
            onChange={(e, newValue: number) =>
              handleProgress({ played: newValue / 100 })
            }
            sx={{
              width: isSmallScreen ? 100 : 200, // change this line
              color: "primary.main",
              "& .MuiSlider-thumb": {
                borderRadius: "50%",
                width: 12,
                height: 12,
              },
              "& .MuiSlider-track": {
                height: 4,
              },
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {currentTime.toFixed(2)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            /
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {duration.toFixed(2)}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => setMuted(!muted)}>
              <VolumeUpIcon
                sx={
                  muted
                    ? { color: "primary.main" }
                    : { color: "secondary.main" }
                }
              />
            </IconButton>
            <Slider
              value={volume * 100}
              onChange={(e, newValue: number) => setVolume(newValue / 100)}
              sx={{
                width: isSmallScreen ? 50 : 100, // change this line
                color: "secondary.main",
                "& .MuiSlider-thumb": {
                  borderRadius: "50%",
                  width: 10,
                  height: 10,
                },
                "& .MuiSlider-track": {
                  height: 3,
                },
              }}
            />
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
}

export default React.memo(VideoPlayer);

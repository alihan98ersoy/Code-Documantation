import { useRef, useState, useCallback } from "react";

export function useVideoPlayer() {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const handleRewind = useCallback(() => {
    playerRef.current.seekTo(currentTime - 10);
  }, [currentTime]);

  const handleFastForward = useCallback(() => {
    playerRef.current.seekTo(currentTime + 10);
  }, [currentTime]);

  const handlePlaybackRate = useCallback((rate) => {
    setPlaybackRate(rate);
  }, []);

  const handleProgress = useCallback((progress) => {
    setCurrentTime(progress.playedSeconds);
    setDuration(progress.loadedSeconds);
    console.log(progress);

  }, []);


  return {
    playerRef,
    playing,
    playbackRate,
    currentTime,
    duration,
    handlePlayPause,
    handleRewind,
    handleFastForward,
    handlePlaybackRate,
    handleProgress,
  };
}

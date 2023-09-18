import React from "react";

export const useAudioControls = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const audioRef = React.useRef(null);

  const handleVolumeChange = ({ value }) => {
    if (typeof audioRef.current?.volume !== "undefined") {
      audioRef.current.volume = value / 100;
    }
    setIsMuted(false);
  };

  const handleMuteVolume = () => {
    if (typeof audioRef.current?.volume !== "undefined") {
      setIsMuted((prev) => {
        if (prev) {
          audioRef.current.volume = 1;
        } else {
          audioRef.current.volume = 0;
        }
        return !prev;
      });
    }
  };

  const handleToggleAudio = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else if (!audioRef.current?.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return {
    isPlaying,
    isMuted,
    audioRef,
    handleVolumeChange,
    handleMuteVolume,
    handleToggleAudio,
  };
};

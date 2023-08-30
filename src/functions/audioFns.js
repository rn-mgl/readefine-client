export const handleVolume = ({ value }, audioRef, setIsMuted) => {
  if (typeof audioRef.current.volume !== "undefined") {
    audioRef.current.volume = value / 100;
  }
  setIsMuted(false);
};

// mute volume
export const handleMuteVolume = (audioRef, setIsMuted) => {
  if (typeof audioRef.current.volume !== "undefined") {
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

// play audio
export const handleToggleAudio = (audioRef, setIsPlaying) => {
  if (audioRef.current.paused) {
    audioRef.current.play();
    setIsPlaying(true);
  } else {
    audioRef.current.pause();
    setIsPlaying(false);
  }
};

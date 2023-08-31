import React from "react";
import { handleVolume, handleMuteVolume } from "../../functions/audioFns";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";

const Volume = (props) => {
  return (
    <>
      <button
        className="cstm-bg-hover "
        onClick={() => handleMuteVolume(props.audioRef, props.setIsMuted)}
      >
        {props.isMuted ? (
          <BsFillVolumeMuteFill className="scale-125" />
        ) : (
          <BsFillVolumeUpFill className="scale-125" />
        )}
      </button>

      <input
        onChange={(e) =>
          handleVolume(e.target, props.audioRef, props.setIsMuted)
        }
        defaultValue={50}
        type="range"
        className="absolute bottom-0 rotate-90 translate-y-12 hidden group-hover:flex p-2 z-30"
      />
    </>
  );
};

export default Volume;

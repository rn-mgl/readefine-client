import React from "react";
import { BsFillPauseFill, BsFillPlayFill, BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import ActionLabel from "./ActionLabel";

const Volume = (props) => {
  return (
    <>
      <div className="relative group hover:shadow-none cstm-flex-col">
        <button className="cstm-bg-hover text-inherit" onClick={props.handleMuteVolume}>
          {props.isMuted ? (
            <BsFillVolumeMuteFill className="scale-125" />
          ) : (
            <BsFillVolumeUpFill className="scale-125" />
          )}
        </button>

        <input
          onChange={(e) => props.handleVolumeChange(e.target)}
          defaultValue={50}
          type="range"
          className="absolute bottom-0 rotate-90 translate-y-12 hidden group-hover:flex p-2 z-30"
        />
      </div>

      {props.isPlaying ? (
        <button onClick={props.handleToggleAudio} className="text-inherit cstm-bg-hover ">
          <BsFillPauseFill className="scale-150" />
        </button>
      ) : (
        <button onClick={props.handleToggleAudio} className="text-inherit cstm-bg-hover ">
          <BsFillPlayFill className="scale-150" />
        </button>
      )}
    </>
  );
};

export default Volume;

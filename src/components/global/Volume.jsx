import React from "react";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";

const Volume = (props) => {
  return (
    <>
      <button className="cstm-bg-hover " onClick={props.handleMuteVolume}>
        {props.isMuted ? (
          <BsFillVolumeMuteFill className="scale-125" />
        ) : (
          <BsFillVolumeUpFill className="scale-125" />
        )}
      </button>

      <input
        onChange={(e) => props.handleVolume(e.target)}
        defaultValue={100}
        type="range"
        className="absolute bottom-0 rotate-90 translate-y-12 hidden group-hover:flex p-2"
      />
    </>
  );
};

export default Volume;

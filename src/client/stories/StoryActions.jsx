import React from "react";
import Link from "next/link";
import ActionLabel from "../../components/global/ActionLabel";
import Volume from "../../components/global/Volume";

import { BsArrowLeft, BsFilter } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";

const StoryActions = (props) => {
  const storyAudio = props.story?.audio;

  return (
    <div className="w-full cstm-w-limit cstm-flex-row text-prmColor">
      <Link href={props.to} className="w-fit cstm-bg-hover mr-auto">
        <BsArrowLeft className="text-inherit" />
      </Link>

      {storyAudio ? (
        <>
          <div className="cstm-flex-row">
            <Volume
              isPlaying={props.isPlaying}
              isMuted={props.isMuted}
              handleMuteVolume={props.handleMuteVolume}
              handleVolumeChange={props.handleVolumeChange}
              handleToggleAudio={props.handleToggleAudio}
            />
          </div>

          <div className="opacity-20">
            <RxDividerVertical className="scale-150 text-black" />
          </div>
        </>
      ) : null}

      <button onClick={props.handleCustomizationsVisible} className="cstm-bg-hover relative group">
        <ActionLabel label="Filter" />
        <BsFilter className="text-inherit scale-150" />
      </button>
    </div>
  );
};

export default StoryActions;

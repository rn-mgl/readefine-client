import React from "react";
import Link from "next/link";
import ActionLabel from "../../components/global/ActionLabel";
import Volume from "../../components/global/Volume";

import { BsArrowLeft, BsFilter } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";
import { useAudioControls } from "../../hooks/useAudioControls";

const StoryActions = (props) => {
  const { isMuted, isPlaying, audioRef, handleMuteVolume, handleVolumeChange, handleToggleAudio } = useAudioControls();

  const storyAudio = props.story?.audio;

  return (
    <div className="w-full cstm-w-limit cstm-flex-row text-prmColor">
      {storyAudio ? (
        <audio loop autoPlay ref={audioRef}>
          <source src={storyAudio} />
        </audio>
      ) : null}

      <Link href={props.to} className="w-fit cstm-bg-hover mr-auto">
        <BsArrowLeft className="text-inherit" />
      </Link>

      {storyAudio ? (
        <>
          <div className="cstm-flex-row">
            <Volume
              isPlaying={isPlaying}
              isMuted={isMuted}
              handleMuteVolume={handleMuteVolume}
              handleVolumeChange={handleVolumeChange}
              handleToggleAudio={handleToggleAudio}
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

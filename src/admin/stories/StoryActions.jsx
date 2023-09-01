import React from "react";
import Link from "next/link";
import ActionLabel from "../../components/global/ActionLabel";
import Volume from "../../components/global/Volume";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsArrowLeft, BsFillPauseFill, BsFillPlayFill, BsFilter } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";
import { useAudioControls } from "../../hooks/useAudioControls";

const StoryActions = (props) => {
  const { isMuted, isPlaying, audioRef, handleMuteVolume, handleVolumeChange, handleToggleAudio } = useAudioControls();

  const storyAudio = props.story?.audio;

  return (
    <div className="w-full cstm-w-limit cstm-flex-row">
      {storyAudio ? (
        <audio loop autoPlay ref={audioRef}>
          <source src={storyAudio} />
        </audio>
      ) : null}

      <Link href="/controller/stories" className="w-fit cstm-bg-hover mr-auto">
        <BsArrowLeft className=" text-prmColor" />
      </Link>

      <Link href={`/controller/stories/edit/${props.storyId}`} className="relative group cstm-bg-hover">
        <ActionLabel label="Edit" />
        <AiFillEdit className=" text-prmColor cursor-pointer" />
      </Link>

      <button onClick={props.handleCanDeleteStory} className="relative group cstm-bg-hover">
        <ActionLabel label="Delete" />
        <AiFillDelete className="text-prmColor cursor-pointer" />
      </button>

      {storyAudio ? (
        <>
          <div className="opacity-20">
            <RxDividerVertical className="scale-150" />
          </div>

          <div className="cstm-flex-row text-prmColor">
            <Volume
              isPlaying={isPlaying}
              isMuted={isMuted}
              handleMuteVolume={handleMuteVolume}
              handleVolumeChange={handleVolumeChange}
              handleToggleAudio={handleToggleAudio}
            />
          </div>
        </>
      ) : null}

      <div className="opacity-20">
        <RxDividerVertical className="scale-150" />
      </div>

      <button onClick={props.handleCustomizationsVisible} className="cstm-bg-hover relative group">
        <ActionLabel label="Filter" />
        <BsFilter className="text-prmColor scale-150" />
      </button>
    </div>
  );
};

export default StoryActions;

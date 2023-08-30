import React from "react";
import Link from "next/link";
import ActionLabel from "../../components/global/ActionLabel";
import Volume from "../../components/global/Volume";

import { handleToggleAudio } from "../../functions/audioFns";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsArrowLeft, BsFillPauseFill, BsFillPlayFill, BsFilter } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";

const StoryActions = (props) => {
  return (
    <div className="w-full cstm-w-limit cstm-flex-row">
      <Link href="/controller/stories" className="w-fit cstm-bg-hover mr-auto">
        <BsArrowLeft className=" text-prmColor" />
      </Link>

      <Link
        href={`/controller/stories/edit/${props.storyId}`}
        className="relative group cstm-bg-hover"
      >
        <ActionLabel label="Edit" />
        <AiFillEdit className=" text-prmColor cursor-pointer" />
      </Link>

      <button onClick={props.handleCanDeleteStory} className="relative group cstm-bg-hover">
        <ActionLabel label="Delete" />
        <AiFillDelete className="text-prmColor cursor-pointer" />
      </button>

      {props.story?.audio ? (
        <>
          <div className="opacity-20">
            <RxDividerVertical className="scale-150" />
          </div>

          <div className="relative group hover:shadow-none text-prmColor cstm-flex-col">
            <ActionLabel label="Volume" />

            <Volume
              isMuted={props.isMuted}
              audioRef={props.audioRef}
              setIsMuted={props.setIsMuted}
            />
          </div>

          {props.isPlaying ? (
            <button
              onClick={() => handleToggleAudio(props.audioRef, props.setIsPlaying)}
              className="cstm-bg-hover relative group"
            >
              <ActionLabel label="Pause Audio" />
              <BsFillPauseFill className="text-prmColor scale-150" />
            </button>
          ) : (
            <button
              onClick={() => handleToggleAudio(props.audioRef, props.setIsPlaying)}
              className="cstm-bg-hover relative group"
            >
              <ActionLabel label="Play Audio" />
              <BsFillPlayFill className="text-prmColor scale-150" />
            </button>
          )}
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

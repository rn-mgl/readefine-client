import React from "react";
import Link from "next/link";
import ActionLabel from "@/components/global/ActionLabel";
import Volume from "@/components/global/Volume";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsArrowLeft, BsFilter } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";

const StoryActions = (props) => {
  const storyAudio = props.story?.audio;

  return (
    <div className="w-full  cstm-flex-row">
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
            <RxDividerVertical className="text-xl" />
          </div>

          <div className="cstm-flex-row text-prmColor">
            <Volume
              isPlaying={props.isPlaying}
              isMuted={props.isMuted}
              handleMuteVolume={props.handleMuteVolume}
              handleVolumeChange={props.handleVolumeChange}
              handleToggleAudio={props.handleToggleAudio}
            />
          </div>
        </>
      ) : null}

      <div className="opacity-20">
        <RxDividerVertical className="text-xl" />
      </div>

      <button onClick={props.handleCustomizationsVisible} className="cstm-bg-hover relative group">
        <ActionLabel label="Filter" />
        <BsFilter className="text-prmColor text-xl" />
      </button>
    </div>
  );
};

export default StoryActions;

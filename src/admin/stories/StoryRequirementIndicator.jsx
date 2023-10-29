import React from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const StoryRequirementIndicator = (props) => {
  return (
    <div
      className="w-full flex flex-row justify-between gap-2 items-start text-xs
                t:w-8/12 l-l:w-4/12"
    >
      <div className="cstm-flex-col gap-1">
        <div>
          {props.cover ? (
            <AiFillCheckCircle className="text-prmColor animate-fadeIn" />
          ) : (
            <AiFillCloseCircle className="text-red-500 animate-fadeIn" />
          )}
        </div>
        <p className={`${props.cover ? "opacity-100" : "opacity-50"} font-medium`}>Cover</p>
      </div>

      <div className="cstm-flex-col gap-1">
        <div>
          {props.title ? (
            <AiFillCheckCircle className="text-prmColor animate-fadeIn" />
          ) : (
            <AiFillCloseCircle className="text-red-500 animate-fadeIn" />
          )}
        </div>
        <p className={`${props.title ? "opacity-100" : "opacity-50"} font-medium`}>Title</p>
      </div>

      <div className="cstm-flex-col gap-1">
        <div>
          {props.author ? (
            <AiFillCheckCircle className="text-prmColor animate-fadeIn" />
          ) : (
            <AiFillCloseCircle className="text-red-500 animate-fadeIn" />
          )}
        </div>
        <p className={`${props.author ? "opacity-100" : "opacity-50"} font-medium`}>Author</p>
      </div>

      <div className="cstm-flex-col gap-1">
        <div>
          {props.genre ? (
            <AiFillCheckCircle className="text-prmColor animate-fadeIn" />
          ) : (
            <AiFillCloseCircle className="text-red-500 animate-fadeIn" />
          )}
        </div>
        <p className={`${props.genre ? "opacity-100" : "opacity-50"} font-medium`}>Genre</p>
      </div>

      <div className="cstm-flex-col gap-1">
        <div>
          {props.lexile ? (
            <AiFillCheckCircle className="text-prmColor animate-fadeIn" />
          ) : (
            <AiFillCloseCircle className="text-red-500 animate-fadeIn" />
          )}
        </div>
        <p className={`${props.genre ? "opacity-100" : "opacity-50"} font-medium`}>Lexile</p>
      </div>
    </div>
  );
};

export default StoryRequirementIndicator;

import React from "react";
import { BsLightbulb } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const DangleHint = (props) => {
  const definitions = props.definitionData?.map((d) => {
    return (
      <div className="cstm-flex-col gap-2 w-full bg-accntColor p-2 rounded-md" key={d.definition}>
        <div className="cstm-flex-col gap-2">
          <p className="font-medium text-prmColor">Definition</p>
          <p className="text-justify">{d.definition}</p>
        </div>

        {d.part_of_speech ? (
          <div className="cstm-flex-col gap-2">
            <p className="font-medium text-prmColor">Part of Speech</p>
            <p>{d.part_of_speech}</p>
          </div>
        ) : null}

        {/* <div className="cstm-flex-col gap-2">
          <p className="font-medium text-prmColor">Example</p>
          {d.example ? <p className="text-justify">{d.example}</p> : <p>No available example</p>}
        </div> */}
      </div>
    );
  });
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen cstm-scrollbar-2 overflow-y-auto 
                  backdrop-blur-md z-30 p-2 cstm-flex-col justify-start"
    >
      <div className=" cstm-flex-col cstm-w-limit justify-start w-full gap-4">
        <button onClick={props.handleCanSeeHint} className="cstm-bg-hover ml-auto">
          <IoClose className="scale-125 text-prmColor" />
        </button>

        <div className="cstm-flex-col gap-4 shadow-md w-full t:w-10/12 bg-white p-4 rounded-md l-l:w-8/12">
          <p className="text-prmColor font-bold cstm-flex-row gap-4">
            <BsLightbulb className="animate-fadeIn" /> Hint
            <BsLightbulb className="animate-fadeIn" />
          </p>

          <div className="cstm-separator" />

          {definitions}
        </div>
      </div>
    </div>
  );
};

export default DangleHint;

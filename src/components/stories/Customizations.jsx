import React from "react";
import TextToSpeech from "../global/TextToSpeech";
import { AiOutlineFontSize } from "react-icons/ai";
import ActionLabel from "../global/ActionLabel";

const Customizations = (props) => {
  return (
    <div
      className={`${
        props.customizationsVisible ? "h-20 overflow-hidden " : "h-fit"
      } transition-all w-full bg-white rounded-2xl p-5 cstm-w-limit cstm-flex-col gap-5 justify-start
      t:cstm-flex-row`}
    >
      <TextToSpeech utterance={props.utterance} />

      <div className="cstm-separator t:hidden " />
      <div className="cstm-flex-col gap-2 ">
        <div className="cstm-flex-row gap-2 relative group">
          <ActionLabel label="Font Size" />
          <AiOutlineFontSize className="text-prmColor" />
          <input
            type="range"
            onChange={(e) => props.handleFontSize(e.target)}
            value={props.fontSize}
            className="cursor-pointer"
          />
          <input
            type="number"
            value={props.fontSize}
            className="w-12 focus:outline-prmColor p-1 px-2 text-xs text-center underline underline-offset-2"
            onChange={(e) => props.handleFontSize(e.target)}
          />
        </div>
      </div>
    </div>
  );
};

export default Customizations;

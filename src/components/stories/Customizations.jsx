import React from "react";
import TextToSpeech from "../global/TextToSpeech";
import ActionLabel from "../global/ActionLabel";

import { AiOutlineFontSize } from "react-icons/ai";
import { TbRectangle, TbRectangleFilled } from "react-icons/tb";

const Customizations = (props) => {
  const isSingleView = props.viewType === "single";

  return (
    <div
      className="h-fit transition-all w-full bg-white rounded-2xl p-4 cstm-flex-col justify-start
      t:cstm-flex-row"
    >
      <div className="cstm-flex-col w-full gap-2">
        <p className="text-xs text-center p-2">change first before playing to apply changes</p>

        <div className="cstm-separator" />

        <div className="cstm-flex-col t:cstm-flex-row w-full gap-4 justify-start">
          <TextToSpeech utterance={props.utterance} handleIncrement={props.handleIncrement} />

          <div className="cstm-separator t:hidden " />

          <div className="hidden cstm-flex-row gap-3 t:ml-auto t:flex">
            <button
              onClick={() => props.handleViewType("single")}
              value="single"
              className="cstm-bg-hover relative group"
              name="singleView"
            >
              <ActionLabel label="Single Page" />
              {isSingleView ? (
                <TbRectangleFilled className="text-xl rotate-90 text-prmColor" />
              ) : (
                <TbRectangle className="text-xl rotate-90 text-prmColor" />
              )}
            </button>

            <button
              onClick={() => props.handleViewType("double")}
              value="double"
              className="cstm-flex-row gap-1 cstm-bg-hover relative group"
              name="doubleView"
            >
              <ActionLabel label="Double Page" />
              {isSingleView ? (
                <>
                  <TbRectangle className="text-xl rotate-90 text-prmColor" />
                  <TbRectangle className="text-xl rotate-90 text-prmColor" />
                </>
              ) : (
                <>
                  <TbRectangleFilled className="text-xl rotate-90 text-prmColor" />
                  <TbRectangleFilled className="text-xl rotate-90 text-prmColor" />
                </>
              )}
            </button>

            <div className="cstm-separator t:hidden " />
          </div>

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
                className="w-12 focus:outline-prmColor p-1 px-2 text-xs text-center underline underline-offset-2 rounded-md"
                onChange={(e) => props.handleFontSize(e.target)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customizations;

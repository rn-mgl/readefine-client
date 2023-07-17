import React from "react";
import TextToSpeech from "../global/TextToSpeech";
import { AiOutlineFontSize } from "react-icons/ai";
import ActionLabel from "../global/ActionLabel";
import { TbRectangle, TbRectangleFilled } from "react-icons/tb";

const Customizations = (props) => {
  const isSingleView = props.viewType === "single";

  return (
    <div
      className="h-fit transition-all w-full bg-white rounded-2xl p-5 cstm-w-limit cstm-flex-col justify-start
      t:cstm-flex-row"
    >
      <div className="cstm-flex-col w-full gap-2">
        <p className="text-xs text-center p-2">change first before playing to apply changes</p>

        <div className="cstm-separator" />

        <div className="cstm-flex-col t:cstm-flex-row w-full gap-5 justify-start">
          <TextToSpeech utterance={props.utterance} />

          <div className="cstm-separator t:hidden " />

          <div className="cstm-flex-row gap-5 t:ml-auto">
            <button
              onClick={(e) => props.handleViewType("single")}
              value="single"
              className="cstm-bg-hover relative group"
              name="singleView"
            >
              <ActionLabel label="Single Page" />
              {isSingleView ? (
                <TbRectangleFilled className="scale-150 rotate-90 text-prmColor" />
              ) : (
                <TbRectangle className="scale-150 rotate-90 text-prmColor" />
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
                  <TbRectangle className="scale-150 rotate-90 text-prmColor" />
                  <TbRectangle className="scale-150 rotate-90 text-prmColor" />
                </>
              ) : (
                <>
                  <TbRectangleFilled className="scale-150 rotate-90 text-prmColor" />
                  <TbRectangleFilled className="scale-150 rotate-90 text-prmColor" />
                </>
              )}
            </button>
          </div>

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

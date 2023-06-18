import React from "react";
import InputComp from "../input/InputComp";

const Customizations = (props) => {
  return (
    <div className="w-full bg-white rounded-2xl p-5 cstm-w-limit cstm-flex-row">
      <div className="cstm-flex-col gap-2 t:mr-auto">
        <p className="text-sm">Font Size</p>
        <div className="cstm-flex-row gap-2">
          <input
            type="range"
            onChange={(e) => props.handleFontSize(e.target)}
            value={props.fontSize}
            className="cursor-pointer"
          />
          <input
            type="number"
            value={props.fontSize}
            className="w-12 focus:outline-prmColor p-1 px-2 text-xs text-center"
            onChange={(e) => props.handleFontSize(e.target)}
          />
        </div>
      </div>
    </div>
  );
};

export default Customizations;

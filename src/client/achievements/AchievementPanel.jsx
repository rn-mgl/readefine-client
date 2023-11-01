import React from "react";
import AchievementProgress from "./AchievementProgress";
import { BsDot } from "react-icons/bs";

const AchievementPanel = (props) => {
  return (
    <div
      className="bg-scndColor w-full bg-opacity-10 p-2 rounded-md border-2 border-scndColor border-opacity-20 cstm-flex-col gap-4 text-center shadow-solid shadow-cyan-500
                t:cstm-flex-row t:p-4"
    >
      <div className="cstm-flex-col gap t:items-start t:text-left w-full">
        <p className="font-light text-xs text-prmColor">{props.type}</p>
        <p className="font-bold text-prmColor">{props.title}</p>
        <p className="text-sm">{props.task}</p>
      </div>

      <AchievementProgress points={props.points} goal={props.goal} />
    </div>
  );
};

export default AchievementPanel;

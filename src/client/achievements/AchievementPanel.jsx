import React from "react";
import AchievementProgress from "./AchievementProgress";

const AchievementPanel = (props) => {
  return (
    <div
      className="bg-scndColor w-full bg-opacity-10 p-2 rounded-md border-2 border-scndColor border-opacity-20 cstm-flex-col gap-5 text-center
                t:cstm-flex-row t:p-5"
    >
      <div className="cstm-flex-col gap-2 t:items-start t:text-left w-full">
        <p className="font-bold text-prmColor">{props.title}</p>
        <p className="text-sm">{props.task}</p>
      </div>

      <AchievementProgress current={0} goal={props.goal} />
    </div>
  );
};

export default AchievementPanel;

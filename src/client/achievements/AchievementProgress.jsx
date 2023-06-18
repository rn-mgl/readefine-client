import React from "react";

const AchievementProgress = (props) => {
  const percentage = Math.floor(props.current / props.goal) * 100;
  return (
    <div className="relative w-full cstm-flex-col items-start transition-all mb-1 t:w-72">
      <p
        className={`relative z-20 mx-auto text-xs font-light transition-all ${
          percentage >= 50 ? "text-white" : "text-black"
        }`}
      >
        {percentage}%
      </p>
      <div
        style={{ width: `${percentage}%` }}
        className="bg-prmColor h-5 rounded-md absolute z-10 text-xs transition-all"
      />
      <div className="bg-neutral-300 w-full h-5 rounded-md absolute z-0 " />
    </div>
  );
};

export default AchievementProgress;

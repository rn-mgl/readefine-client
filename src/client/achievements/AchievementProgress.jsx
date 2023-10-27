import React from "react";

const AchievementProgress = (props) => {
  const value = Math.floor((props.points / props.goal) * 100);
  const percentage = value > 100 ? 100 : value;
  return (
    <div className="relative w-full cstm-flex-col items-start transition-all mb-1 t:w-72">
      <p
        className={`relative z-20 mx-auto text-xs font-semibold transition-all ${
          percentage >= 50 ? "text-accntColor" : "text-black"
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

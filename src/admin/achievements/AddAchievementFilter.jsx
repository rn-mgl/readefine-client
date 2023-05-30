import React from "react";
import InputFilter from "../../components/filter/InputFilter";

const AddAchievementFilter = (props) => {
  return (
    <div
      className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar
                l-s:w-[70%] l-s:ml-auto
                l-l:w-[80%]"
    >
      <InputFilter
        label="Type"
        placeholder="Achievement Type"
        name="type"
        type="text"
        required={true}
        value={props.achievement.type}
        onChange={props.handleAchievement}
      />

      <InputFilter
        label="Goal"
        placeholder="Achievement Goal"
        name="goal"
        type="number"
        required={true}
        value={props.achievement.goal}
        onChange={props.handleAchievement}
      />

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>Reward</p>
        </div>
        <input
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
        />
      </div>
    </div>
  );
};

export default AddAchievementFilter;

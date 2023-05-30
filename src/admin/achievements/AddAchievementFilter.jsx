import React from "react";
import InputFilter from "../../components/filter/InputFilter";
import SelectFilter from "../../components/filter/SelectFilter";

const AddAchievementFilter = (props) => {
  const hasReward = props.achievement?.reward?.id;

  return (
    <div className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto py-2 cstm-scrollbar">
      <SelectFilter
        onChange={props.handleAchievement}
        selectValue={props.achievement?.type}
        name="type"
        label="Type"
        labelValue={[
          { label: "Sessions", value: "user_session" },
          { label: "Lexile", value: "user" },
          { label: "Read Stories", value: "read_story" },
          { label: "Answered Dangles", value: "answered_dangle" },
          { label: "Answered Deciphers", value: "answered_decipher" },
          { label: "Answered Riddles", value: "answered_riddles" },
          { label: "Answered Tests", value: "answered_questions" },
          { label: "Dangle Score", value: "answered_dangle" },
          { label: "Decipher Score", value: "answered_decipher" },
          { label: "Riddle Score", value: "answered_riddles" },
          { label: "Test Score", value: "answered_questions" },
        ]}
      />

      <SelectFilter
        onChange={props.handleAchievement}
        selectValue={props.achievement.specifics}
        name="specifics"
        label="Specifics"
        labelValue={[
          { label: "Days Online", value: "days_online" },
          { label: "Lexile Growth", value: "lexile_growth" },
          { label: "Total Books", value: "read_count" },
          { label: "Total Games", value: "play_count" },
          { label: "Total Scores", value: "score_count" },
        ]}
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
        <div
          onClick={props.handleCanSelectReward}
          className={`bg-neutral-50 p-1 px-2 ${
            hasReward ? "rounded-l-md" : "rounded-md"
          } outline-none border-neutral-200 border-2 text-sm cursor-pointer`}
        >
          <p>Reward</p>
        </div>
        {hasReward ? (
          <p className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm">
            {props.achievement.reward.name}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default AddAchievementFilter;

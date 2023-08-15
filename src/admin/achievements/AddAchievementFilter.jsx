import React from "react";
import InputFilter from "../../components/filter/InputFilter";
import SelectFilter from "../../components/filter/SelectFilter";

const AddAchievementFilter = (props) => {
  const hasReward = props.achievement?.reward?.id;

  return (
    <div className="cstm-flex-row gap-2  justify-start relative w-full overflow-x-auto py-2 cstm-scrollbar-2 min-h-[5rem]">
      <SelectFilter
        onChange={props.handleAchievement}
        selectValue={props.achievement?.type}
        name="type"
        label="Type"
        required={true}
        labelValue={[
          { label: "Sessions", value: "user_session" },
          { label: "Lexile", value: "user_lexile" },
          { label: "Read Stories", value: "read_story" },
          { label: "Answered Tests", value: "answered_tests" },
          { label: "Test Score", value: "test_score" },
          { label: "Dangle Plays", value: "dangle_plays" },
          { label: "Decipher Plays", value: "decipher_plays" },
          { label: "Riddle Plays", value: "riddle_plays" },
          { label: "Dangle Wins", value: "dangle_wins" },
          { label: "Decipher Wins", value: "decipher_wins" },
          { label: "Riddle Wins", value: "riddle_wins" },
        ]}
      />

      <SelectFilter
        onChange={props.handleAchievement}
        selectValue={props.achievement.specifics}
        name="specifics"
        label="Specifics"
        required={true}
        labelValue={[
          { label: "Days Online", value: "days_online" },
          { label: "Lexile Growth", value: "lexile_growth" },
          { label: "Total Books", value: "book_count" },
          { label: "Total Plays", value: "play_count" },
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
        <button
          type="button"
          onClick={props.handleCanSelectReward}
          className={`bg-neutral-50 p-1 px-2 ${
            hasReward ? "rounded-l-md" : "rounded-md"
          } outline-none border-neutral-200 border-2 text-sm cursor-pointer`}
        >
          <p>Reward</p>
        </button>

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

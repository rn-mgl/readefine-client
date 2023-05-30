import React from "react";
import SelectFilter from "../../components/filter/SelectFilter";

const AddRewardFilter = (props) => {
  return (
    <div className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto py-2 cstm-scrollbar">
      <SelectFilter
        onChange={props.handleReward}
        selectValue={props.reward.type}
        name="type"
        label="Type"
        labelValue={[
          { label: "Sessions", value: "user_session" },
          { label: "Read Stories", value: "read_story" },
          { label: "Answered Dangles", value: "answered_dangle" },
          { label: "Answered Deciphers", value: "answered_decipher" },
          { label: "Answered Riddles", value: "answered_riddles" },
          { label: "Dangle Score", value: "answered_dangle" },
          { label: "Decipher Score", value: "answered_decipher" },
          { label: "Riddle Score", value: "answered_riddles" },
          { label: "Lexile Growth", value: "user" },
        ]}
      />
    </div>
  );
};

export default AddRewardFilter;

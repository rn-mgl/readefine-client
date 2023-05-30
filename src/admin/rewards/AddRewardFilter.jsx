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
          { label: "Badge", value: "badge" },
          { label: "Trophy", value: "trophy" },
        ]}
      />
    </div>
  );
};

export default AddRewardFilter;

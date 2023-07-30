import React from "react";
import SelectFilter from "../../components/filter/SelectFilter";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const EditRewardFilter = (props) => {
  return (
    <div className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto py-2 cstm-scrollbar-2">
      <Link type="button" href="/controller/rewards" className="w-fit cstm-bg-hover mr-auto">
        <BsArrowLeft className=" text-prmColor" />
      </Link>
      <SelectFilter
        onChange={props.handleReward}
        selectValue={props.reward.reward_type ? props.reward.reward_type : "Badge"}
        name="reward_type"
        label="Type"
        labelValue={[
          { label: "Badge", value: "badge" },
          { label: "Trophy", value: "trophy" },
        ]}
      />
    </div>
  );
};

export default EditRewardFilter;

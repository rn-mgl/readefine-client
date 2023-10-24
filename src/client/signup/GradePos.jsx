import React from "react";

import SelectComp from "@/components/input/SelectComp";

const GradePos = (props) => {
  return (
    <>
      {" "}
      {/* select grade */}
      <SelectComp
        value={props.userData.gradeLevel}
        onChange={props.handleUserData}
        required={true}
        labelValue={[
          { label: "Grade 4", value: 4 },
          { label: "Grade 5", value: 5 },
          { label: "Grade 6", value: 6 },
        ]}
      />
    </>
  );
};

export default GradePos;

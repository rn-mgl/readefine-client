import React from "react";
import { IoClose } from "react-icons/io5";

const EditGradeLevel = (props) => {
  return (
    <div className="fixed w-full h-full cstm-flex-col backdrop-blur-md z-20">
      <button onClick={props.handleCanEditGradeLevel} className="cstm-bg-hover">
        <IoClose />
      </button>
    </div>
  );
};

export default EditGradeLevel;

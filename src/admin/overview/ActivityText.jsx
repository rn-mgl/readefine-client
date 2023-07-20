import React from "react";
import { BsDot } from "react-icons/bs";

const ActivityText = (props) => {
  return (
    <div className="cstm-flex-col items-start gap-5 w-full text-sm bg-accntColor p-5 rounded-md relative">
      <p className="font-semibold">{props.dateAdded}</p>
      <div className="cstm-flex-row w-full gap-2">
        <div
          style={{ backgroundImage: props.userImage ? `url(${props.userImage})` : null }}
          className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] bg-center bg-cover rounded-full bg-prmColor bg-opacity-20"
        />
        <div className="cstm-flex-col items-start w-full">
          <p>You added</p>
          <div className="cstm-flex-row gap-2 justify-start">
            <div>
              <BsDot className="scale-[2]" />
            </div>

            <p className="text-prmColor font-semibold">{props.addedData}.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityText;

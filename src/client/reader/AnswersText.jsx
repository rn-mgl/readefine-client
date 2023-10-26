import React from "react";
import avatar from "@/public/profile/Avatar White.svg";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

const AnswersText = (props) => {
  return (
    <div className="cstm-flex-col gap-4 w-full bg-accntColor p-4 rounded-md items-start text-left text-sm">
      <p className="font-semibold">{props.dateAnswered}</p>
      <div className="cstm-flex-row gap-2 w-full justify-start">
        <div
          style={{ backgroundImage: props.userImage ? `url(${props.userImage})` : null }}
          className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] bg-center 
                    bg-cover rounded-full bg-gradient-to-br from-prmColor to-scndColor"
        >
          {!props.userImage ? <Image src={avatar} alt="avatar" className="saturate-150" width={100} /> : null}
        </div>

        <div>
          <FaChevronRight className="opacity-50" />
        </div>

        <div
          className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] rounded-full 
                    bg-prmColor bg-opacity-10 cstm-flex-col"
        >
          {props.complementaryIcon}
        </div>
      </div>

      {props.question ? (
        <>
          <p>
            <span className="font-semibold">Question:</span> {props.question}
          </p>
          <div className="cstm-separator" />
        </>
      ) : null}

      {props.duration ? (
        <>
          <p>
            <span className="font-semibold">Duration:</span> {props.duration} Seconds
          </p>
          <div className="cstm-separator" />
        </>
      ) : null}

      <p>
        <span className="font-semibold text-cyan-900">You:</span> {props.myAnswer}
      </p>

      <div className="cstm-separator" />

      <p>
        <span className="font-semibold text-prmColor">Correct:</span> {props.correctAnswer}
      </p>
    </div>
  );
};

export default AnswersText;

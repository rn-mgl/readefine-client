import React from "react";
import avatar from "@/public/profile/Avatar.svg";
import Image from "next/image";
import { BsDot } from "react-icons/bs";

const ComplementActivityText = (props) => {
  return (
    <div className="cstm-flex-col items-start gap-4 w-full text-sm bg-accntColor p-4 rounded-md relative">
      <p className="font-semibold">{props.date}</p>

      <div className="cstm-flex-col gap-4 w-full items-start">
        <div className="cstm-flex-row w-full gap-2">
          <div
            style={{ backgroundImage: props.userImage ? `url(${props.userImage})` : null }}
            className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] bg-center bg-cover rounded-full bg-indigo-100"
          >
            {!props.userImage ? <Image src={avatar} alt="avatar" className="saturate-150" width={100} /> : null}
          </div>
          <div className="cstm-flex-col items-start w-full">
            <p>{props.youAddedLabel}</p>
            <div className="cstm-flex-row gap-2">
              <div>
                <BsDot className="scale-[2]" />
              </div>

              <p>
                <span className="text-prmColor font-semibold">{props.addedContent}.</span>
              </p>
            </div>
          </div>
        </div>

        <div className="cstm-flex-col items-start">
          <div className="cstm-flex-row w-full gap-2">
            <div
              className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] bg-center bg-cover 
                          rounded-full bg-prmColor bg-opacity-10 cstm-flex-col"
            >
              {props.complementaryIcon}
            </div>
            <div className="cstm-flex-col items-start w-full">
              <p>{props.complementaryLabel}</p>
              <div className="cstm-flex-row gap-2">
                <div>
                  <BsDot className="scale-[2]" />
                </div>

                <p>
                  <span className="text-prmColor font-semibold">{props.complementaryContent}.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplementActivityText;

import React from "react";
import Image from "next/image";
import avatar from "@/public/profile/Avatar White.svg";

const SessionText = (props) => {
  return (
    <div className="p-5 rounded-2xl bg-accntColor text-left text-sm w-full cstm-flex-row gap-5">
      <div
        style={{ backgroundImage: props.userData?.image ? `url(${props.userData?.image})` : null }}
        className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] 
              bg-center bg-cover rounded-full bg-gradient-to-br from-prmColor to-scndColor"
      >
        {!props.userData?.image ? <Image src={avatar} alt="avatar" className="saturate-150" width={100} /> : null}
      </div>
      <p className="w-full">
        You <span className="font-semibold">{props.sessionType}</span> on{" "}
        <span className="font-semibold">{props.dateLogged}</span>.
      </p>
    </div>
  );
};

export default SessionText;

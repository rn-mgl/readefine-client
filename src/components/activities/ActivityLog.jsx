import avatar from "@/public/profile/Avatar.svg";
import { localizeDate, localizeTime } from "@/src/functions/localDate";
import Image from "next/image";
import { AiFillDelete, AiFillFileAdd, AiFillRead, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";

const ACTION_STYLE = {
  created: "bg-gradient-to-br from-green-100 to-green-300",
  read: "bg-gradient-to-br from-cyan-100 to-cyan-300",
  updated: "bg-gradient-to-br from-yellow-100 to-yellow-300",
  deleted: "bg-gradient-to-br from-red-100 to-red-300",
  "logged in": "bg-gradient-to-br from-[#542ACA22] to-[#542ACA88]",
  "logged out": "bg-gradient-to-br from-[#4BFCE122] to-[#4BFCE188]",
};

const ACTION_ICON = {
  created: <AiFillFileAdd className="text-xl" />,
  read: <AiFillRead className="text-xl" />,
  updated: <MdUpdate className="text-xl" />,
  deleted: <AiFillDelete className="text-xl" />,
  "logged in": <AiOutlineLogin className="text-xl" />,
  "logged out": <AiOutlineLogout className="text-xl rotate-180" />,
};

const ActivityLog = (props) => {
  const userImage = props.activity.image;
  const dateLogged = props.activity.date_logged;
  return (
    <div
      className="cstm-flex-col items-start gap-4 w-full text-sm bg-accntColor
                p-4 rounded-md relative border-2 border-neutral-300"
    >
      <p className=" text-xs">
        <span className="font-semibold">{localizeDate(dateLogged)}</span> at{" "}
        <span className="font-semibold">{localizeTime(dateLogged)}</span>
      </p>

      <div className="cstm-flex-row w-full gap-2">
        <div
          style={{ backgroundImage: userImage ? `url(${userImage})` : null }}
          className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] bg-center bg-cover rounded-full bg-indigo-100"
        >
          {!userImage ? <Image src={avatar} alt="avatar" className="saturate-150" width={100} /> : null}
        </div>

        <div className="cstm-flex-col items-start w-full">
          <p className="font-medium">
            {props.activity.name} {props.activity.surname}
          </p>
          <p className="text-xs">{props.activity.email}</p>
        </div>
      </div>

      <div className="cstm-flex-row w-full gap-2">
        <div
          className={`w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] cstm-flex-col
                    rounded-full ${ACTION_STYLE[props.action]}`}
        >
          {ACTION_ICON[props.action]}
        </div>

        <p className="w-full text-sm">
          {props.action} <span className="font-medium">{props.activity.resource_name}</span> of{" "}
          <span className="font-medium"> {props.activity.resource_type}</span>
        </p>
      </div>
    </div>
  );
};

export default ActivityLog;

import Link from "next/link";
import React from "react";
import { localizeDate } from "../../functions/localDate";

const UserRow = (props) => {
  return (
    <tr key={props.user.user_id} className="p-2 cstm-flex-row justify-start text-center gap-24 w-full">
      <td className="cstm-flex-col">
        <div
          style={{ backgroundImage: props.user?.image ? `url(${props.user?.image})` : null }}
          className="w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-full 
            bg-prmColor bg-opacity-30 bg-center bg-cover"
        />
      </td>
      <td className="cstm-flex-col">
        {props.email[0]} <br /> <span className="font-light text-xs italic">@{props.email[1]}</span>
      </td>
      <td className="break-words whitespace-pre-wrap cstm-flex-col">{props.user.surname}</td>
      <td className="break-words whitespace-pre-wrap cstm-flex-col">{props.user.name}</td>
      <td className="break-words whitespace-pre-wrap cstm-flex-col">{props.user.username}</td>
      <td className="break-words whitespace-pre-wrap cstm-flex-col">{props.user.lexile}L</td>
      <td className="break-words whitespace-pre-wrap cstm-flex-col">{props.user.grade_level}</td>
      <td className="break-words whitespace-pre-wrap cstm-flex-col">{localizeDate(props.user.date_joined)}</td>
      <td className="cstm-flex-col">
        <Link
          href={`/controller/users/${props.cipheredUserId}`}
          className="bg-prmColor rounded-full p-2 text-white w-full"
        >
          Visit
        </Link>
      </td>
    </tr>
  );
};

export default UserRow;

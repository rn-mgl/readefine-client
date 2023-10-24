import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { localizeDate } from "@/functions/localDate";

const RiddleRow = (props) => {
  return (
    <tr
      className="p-2 cstm-flex-col justify-start gap-5 text-center w-full rounded-md bg-accntColor
            t:bg-white t:cstm-flex-row"
    >
      <td className="t:hidden">
        <p className="text-prmColor font-bold text-sm t:hidden">Riddle</p>
      </td>

      <td className="whitespace-pre-wrap text-justify t:w-[50%]">{props.riddle.riddle}</td>

      <td className="t:hidden">
        <div className="cstm-separator t:hidden" />
      </td>

      <td className="t:hidden">
        <p className="text-prmColor font-bold text-sm t:hidden">Answer</p>
      </td>

      <td className="t:w-[20%]">{props.riddle.answer}</td>

      <td className="t:hidden">
        <div className="cstm-separator t:hidden" />
      </td>

      <td className="t:hidden">
        <p className="text-prmColor font-bold text-sm t:hidden">Date Added</p>
      </td>

      <td className="t:w-[20%]">{localizeDate(props.riddle.date_added)}</td>
      <td className="t:w-[10%] cstm-flex-row gap-5">
        <button
          onClick={() => props.handleRiddleToEdit(props.riddle.riddle_id)}
          className="cstm-flex-col cstm-bg-hover  text-prmColor"
        >
          <AiFillEdit className="scale-125" />
        </button>
      </td>
    </tr>
  );
};

export default RiddleRow;

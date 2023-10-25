import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { localizeDate } from "@/functions/localDate";

const EditRow = (props) => {
  return (
    <tr
      className="p-2 cstm-flex-col justify-start gap-5 text-center w-full rounded-md bg-accntColor
        t:bg-white t:cstm-flex-row"
    >
      <td className="t:hidden">
        <p className="text-prmColor font-bold text-sm t:hidden">Riddle</p>
      </td>

      <td className="whitespace-pre-wrap text-justify t:w-[50%]">
        <textarea
          className="w-full resize-none bg-white t:bg-accntColor rounded-md p-2 focus:outline-prmColor animate-[fadeIn_200ms]"
          name="riddle"
          value={props.riddle.riddle}
          required={true}
          onChange={(e) => props.handleRiddle(props.riddle.riddle_id, e.target)}
        />
      </td>

      <td className="t:hidden">
        <div className="cstm-separator t:hidden" />
      </td>

      <td className="t:hidden">
        <p className="text-prmColor font-bold text-sm t:hidden">Answer</p>
      </td>

      <td className="t:w-[20%]">
        <textarea
          className="w-full resize-none bg-white t:bg-accntColor rounded-md p-2 
                    focus:outline-prmColor animate-[fadeIn_200ms] text-center"
          name="answer"
          value={props.riddle.answer}
          required={true}
          onChange={(e) => props.handleRiddle(props.riddle.riddle_id, e.target)}
        />
      </td>

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
          className="cstm-flex-col cstm-bg-hover text-scndColor"
        >
          <IoClose className="scale-125" />
        </button>

        <button
          onClick={() => {
            props.handleCanDeleteRiddle();
            props.handleRiddleToDelete(props.riddle.riddle_id, props.riddle.answer);
          }}
          className="cstm-flex-col cstm-bg-hover text-scndColor"
        >
          <AiFillDelete className="scale-125" />
        </button>

        <button
          onClick={() => props.editRiddle(props.riddle.riddle_id)}
          className="cstm-flex-col cstm-bg-hover text-scndColor"
        >
          <BiCheck className="scale-125" />
        </button>
      </td>
    </tr>
  );
};

export default EditRow;

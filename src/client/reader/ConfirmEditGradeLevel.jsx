"use client";
import { useGlobalContext } from "@/src/context";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { IoClose } from "react-icons/io5";

const ConfirmEditGradeLevel = (props) => {
  const [confirmation, setConfirmation] = React.useState("");

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const handleConfirmation = ({ value }) => {
    setConfirmation(value);
  };

  const editGrade = async (e) => {
    e.preventDefault();

    if (confirmation !== props.confirmation) {
      return;
    }

    try {
      const { data } = await axios.patch(
        `${url}/user/${user?.userId}`,
        { chosenGrade: props.chosenGrade?.grade, type: "grade" },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        props.handleCanEditGradeLevel();
        props.getUserData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen backdrop-blur-md bg-prmColor bg-opacity-10 fixed z-30 top-0 left-0 p-5 cstm-flex-col justify-start">
      <div className="cstm-bg-hover ml-auto">
        <IoClose
          onClick={props.handleCanSeeConfirmGradeChange}
          className="text-prmColor scale-125"
        />
      </div>

      <div className="cstm-flex-col w-full cstm-w-limit border-collapse h-screen">
        <form
          onSubmit={(e) => editGrade(e)}
          className="w-11/12 rounded-2xl bg-white min-h-[15rem] my-auto cstm-flex-col justify-start p-5 text-center gap-5 absolute shadow-solid
                    t:w-7/12
                    l-s:w-6/12
                    l-l:w-4/12"
        >
          <div className="w-full">
            <p className="text-prmColor font-bold">Change Grade?</p>
            <p className="text-xs font-light">
              <span className="font-semibold">note:</span> once you change your grade and lexile, it
              cannot be retrieved.
            </p>
          </div>

          <p className="text-xs font-ligt ">
            Type <span className="font-bold text-prmColor">{props.confirmation}</span> to confirm
            update.
          </p>

          <input
            className="p-2 text-prmColor bg-white font-poppins rounded-md text-sm border-neutral-200 border-2 w-full 
            focus:outline-none"
            placeholder="Confirmation"
            name="title"
            type="text"
            required={true}
            value={confirmation}
            onChange={(e) => handleConfirmation(e.target)}
          />

          <button
            type="submit"
            className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2
                          t:text-base"
          >
            Apply Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmEditGradeLevel;

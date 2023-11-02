"use client";

import axios from "axios";
import React from "react";
import Message from "@/components/global/Message";
import Loading from "@/components/global/Loading";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/base/context";
import { IoClose } from "react-icons/io5";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";

const ConfirmEditGradeLevel = (props) => {
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [confirmation, setConfirmation] = React.useState("");

  const { loading, setLoadingState } = useLoading(false);
  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const handleConfirmation = ({ value }) => {
    setConfirmation(value);
  };

  const editGrade = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    setLoadingState(true);

    if (confirmation !== props.confirmation) {
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(true, "The confirmation does not match", "warning");
      return;
    }

    try {
      const { data } = await axios.patch(
        `${url}/user/${user?.userId}`,
        { chosenGrade: props.chosenGrade?.grade, type: "grade" },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        setHasSubmitted(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="w-full min-h-screen h-full  backdrop-blur-md bg-gradient-to-br animate-fadeIn
                from-[#552aca32] to-[#4bfce132] fixed z-30 top-0 left-0 p-4 cstm-flex-col justify-start"
    >
      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <button onClick={props.handleCanSeeConfirmGradeChange} className="cstm-bg-hover ml-auto">
        <IoClose className="text-prmColor text-xl" />
      </button>

      <form
        onSubmit={(e) => editGrade(e)}
        className="w-full rounded-2xl bg-white min-h-[15rem] my-auto cstm-flex-col 
                    justify-start p-4 text-center gap-4 shadow-solid shadow-prmColor  border-2 border-prmColor
                    t:w-8/12
                    l-s:w-6/12
                    l-l:w-4/12"
      >
        <div className="w-full">
          <p className="text-prmColor font-bold">Change Grade?</p>
          <p className="text-xs font-light">
            <span className="font-semibold">note:</span> once you change your grade and lexile, it cannot be retrieved.
          </p>
        </div>

        <p className="text-xs font-ligt ">
          Type <span className="font-bold text-prmColor">{props.confirmation}</span> to confirm update.
        </p>

        <input
          className="p-2 text-prmColor bg-white  rounded-md text-sm border-neutral-200 border-2 w-full  mb-auto
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
          disabled={hasSubmitted}
          className="w-full text-center  text-sm bg-prmColor font-semibold rounded-md p-2 
                       shadow-solid shadow-indigo-900 text-scndColor disabled:saturate-0"
        >
          Apply Changes
        </button>
      </form>
    </div>
  );
};

export default ConfirmEditGradeLevel;

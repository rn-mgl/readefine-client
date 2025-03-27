"use client";
import React from "react";
import axios from "axios";

import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Message from "@/components/global/Message";
import Loading from "@/components/global/Loading";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import useAdminActivities from "@/src/hooks/useAdminActivities";

const DeleteData = (props) => {
  const [confirmation, setConfirmation] = React.useState("");
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const { createAdminActivity } = useAdminActivities();
  const { loading, setLoadingState } = useLoading(false);
  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession();
  const user = session?.user;

  const handleConfirmation = ({ value }) => {
    setConfirmation(value);
  };

  const router = useRouter();

  const deleteData = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    setLoadingState(true);

    if (confirmation !== props.confirmation) {
      setLoadingState(false);
      setHasSubmitted(false);
      setMessageStatus(true, "The confirmation does not match.", "error");
      return;
    }

    try {
      const { data } = await axios.delete(`${props.apiRoute}`, {
        headers: { Authorization: user.token },
      });

      if (data) {
        if (user?.role === "admin") {
          await createAdminActivity(
            props.resourceType,
            props.confirmation,
            "D"
          );
        }

        if (props.returnRoute) {
          router.push(props.returnRoute);
        } else {
          props.getData();
          props.handleCanDeleteData();
        }
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setHasSubmitted(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="w-full min-h-screen h-full  backdrop-blur-md bg-gradient-to-br animate-fadeIn
              from-[#552aca32] to-[#4bfce132] fixed z-[60] top-0 left-0 p-4 cstm-flex-col justify-start"
    >
      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <button
        onClick={props.handleCanDeleteData}
        className="cstm-bg-hover ml-auto"
      >
        <IoClose className="text-prmColor text-xl " />
      </button>

      <div className="cstm-flex-col w-full  border-collapse h-screen">
        <form
          onSubmit={(e) => deleteData(e)}
          className="w-11/12 rounded-2xl bg-white min-h-[15rem] shadow-md my-auto 
                    cstm-flex-col justify-start p-4 text-center gap-4 absolute
                    t:w-8/12 l-s:w-6/12 l-l:w-4/12 "
        >
          <div className="w-full">
            <p className="text-prmColor font-bold">Notice</p>
            <p className="text-xs font-light">
              once you delete a data, it cannot be retrieved.
            </p>
          </div>

          <p className="text-xs font-ligt ">
            Type{" "}
            <span className="font-bold text-prmColor">
              {props.confirmation}
            </span>{" "}
            to confirm deletion.
          </p>

          <input
            className="p-2 text-prmColor bg-white  rounded-md border-neutral-200 border-2 w-full text-sm mb-auto
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
            className="w-full text-center  text-sm font-normal bg-prmColor text-accntColor rounded-md p-2 disabled:saturate-0"
          >
            Confirm Deletion
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteData;

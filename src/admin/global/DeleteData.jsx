"use client";
import React from "react";
import axios from "axios";

import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/base/context";
import Message from "../../components/global/Message";
import Loading from "../../components/global/Loading";
import { useLoading } from "../../hooks/useLoading";
import { useMessage } from "../../hooks/useMessage";

const DeleteData = (props) => {
  const [confirmation, setConfirmation] = React.useState("");
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const { loading, setLoadingState } = useLoading(false);
  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession();
  const user = session?.user?.name;

  const handleConfirmation = ({ value }) => {
    setConfirmation(value);
  };

  const { url } = useGlobalContext();

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
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen h-full backdrop-blur-md fixed z-30 top-0 left-0 p-5 cstm-flex-col justify-start">
      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <button onClick={props.handleCanDeleteData} className="cstm-bg-hover ml-auto">
        <IoClose className="text-prmColor scale-150 " />
      </button>

      <div className="cstm-flex-col w-full cstm-w-limit border-collapse h-screen">
        <form
          onSubmit={(e) => deleteData(e)}
          className="w-11/12 rounded-md bg-white min-h-[15rem] shadow-md my-auto cstm-flex-col justify-start p-5 text-center gap-5 absolute
                      t:w-96
                      l-s:w-[26rem]"
        >
          <div className="w-full">
            <p className="text-prmColor font-bold">Notice</p>
            <p className="text-xs font-light">once you delete a data, it cannot be retrieved.</p>
          </div>

          <p className="text-xs font-ligt ">
            Type <span className="font-bold text-prmColor">{props.confirmation}</span> to confirm deletion.
          </p>

          <input
            className="p-2 text-prmColor bg-white font-poppins rounded-md border-neutral-200 border-2 w-full
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
            className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 disabled:saturate-0"
          >
            Confirm Deletion
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteData;

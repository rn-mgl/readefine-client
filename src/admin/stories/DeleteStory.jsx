"use client";
import React from "react";
import axios from "axios";

import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/src/context";

const DeleteStory = (props) => {
  const [confirmation, setConfirmation] = React.useState("");

  const { data: session } = useSession();

  const user = session?.user?.name;

  const handleConfirmation = ({ value }) => {
    setConfirmation(value);
  };

  const { url } = useGlobalContext();

  const router = useRouter();

  const deleteStory = async (e) => {
    e.preventDefault();

    if (confirmation !== props.confirmation) {
      return;
    }

    try {
      const { data } = await axios.delete(`${url}/admin_story/${props.storyId}`, {
        headers: { Authorization: user.token },
      });

      if (data) {
        router.push("/controller/stories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen backdrop-blur-md fixed z-30 top-0 left-0 p-5 cstm-flex-col justify-start">
      <div className="cstm-bg-hover ml-auto">
        <IoClose onClick={props.handleCanDeleteStory} className="text-prmColor scale-150 " />
      </div>

      <div className="cstm-flex-col w-full cstm-w-limit border-collapse h-screen">
        <form
          onSubmit={(e) => deleteStory(e)}
          className="w-11/12 rounded-md bg-white min-h-[15rem] shadow-md my-auto cstm-flex-col justify-start p-2 text-center gap-5 absolute
                    t:w-7/12
                    l-s:w-6/12
                    l-l:w-4/12"
        >
          <div className="w-full">
            <p className="text-prmColor font-bold">Delete Story?</p>
            <p className="text-xs font-light">
              <span className="font-semibold">note:</span> once you delete a story, it cannot be
              retrieved.
            </p>
          </div>

          <p className="text-xs font-ligt ">
            Type <span className="font-bold text-prmColor">{props.confirmation}</span> to confirm
            deletion.
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
            className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2
                          t:text-base"
          >
            Confirm Deletion
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteStory;

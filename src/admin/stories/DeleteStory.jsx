"use client";
import { useGlobalContext } from "@/src/components/context";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { IoClose } from "react-icons/io5";

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
      const { data } = await axios.delete(`${url}/admin_story/${props.story_id}`, {
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
    <div className="w-full min-h-screen backdrop-blur-md fixed z-20 top-0 left-0 p-5 cstm-flex-col justify-start">
      <div className="hover:bg-black hover:bg-opacity-10 p-2 rounded-full ml-auto">
        <IoClose onClick={props.handleCanDeleteStory} className="text-prmColor scale-150 " />
      </div>

      <form
        onSubmit={(e) => deleteStory(e)}
        className="w-11/12 rounded-md bg-white min-h-[15rem] shadow-md my-auto cstm-flex-col justify-start p-2 text-center gap-5"
      >
        <div className="w-full">
          <p className="text-prmColor font-bold">Delete Story?</p>
          <p className="text-xs font-light">
            <span className="font-semibold">note:</span> once you delete a story, it cannot
            retrieved.
          </p>
        </div>

        <p className="text-xs font-ligt ">
          Type <span className="font-bold text-prmColor">{props.confirmation}</span> to confirm
          deletion.
        </p>

        <input
          className="p-1 px-2 text-prmColor bg-white font-poppins rounded-md border-neutral-200 border-2 text-sm w-full
                    focus:outline-none "
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
  );
};

export default DeleteStory;

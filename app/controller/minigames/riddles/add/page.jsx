"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import Message from "@/src/src/components/global/Message";
import axios from "axios";

import { useSession } from "next-auth/react";
import { wordCount } from "@/src/src/functions/wordCount";
import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";

const AddRiddle = () => {
  const [riddleData, setRiddleData] = React.useState({ riddle: "", answer: "" });
  const [message, setMessage] = React.useState({ msg: "", active: false });

  const { data: session } = useSession({ required: true });
  const user = session?.user?.name;
  const router = useRouter();
  const { url } = useGlobalContext();

  const handleRiddleData = ({ name, value }) => {
    setRiddleData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addRiddle = async (e) => {
    e.preventDefault();
    const { riddle, answer } = riddleData;
    try {
      const { data } = await axios.post(
        `${url}/admin_riddles`,
        { riddle, answer },
        { headers: { Authorization: user.token } }
      );
      if (data) {
        router.push("/controller/riddles");
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  };

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Riddles" mainHeader="Add Riddle" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      <form
        onSubmit={(e) => addRiddle(e)}
        className="w-full cstm-flex-col cstm-w-limit border-collapse"
      >
        <div className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-[75vh] justify-start items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar">
          <div className="cstm-flex-row w-full">
            <textarea
              name="answer"
              id=""
              cols="30"
              rows="1"
              placeholder="Answer"
              value={riddleData.answer}
              className="resize-none p-2 focus:outline-none font-bold text-prmColor mr-auto"
              onChange={(e) => handleRiddleData(e.target)}
            ></textarea>
          </div>

          <div className="cstm-separator" />
          <div className="w-full h-full cstm-flex-col">
            <textarea
              name="riddle"
              id=""
              cols="30"
              rows="1"
              placeholder="riddle..."
              value={riddleData.riddle}
              className="resize-none p-2 focus:outline-none w-full h-full mr-auto"
              onChange={(e) => handleRiddleData(e.target)}
            ></textarea>
            <p className="ml-auto">words: {wordCount(riddleData.riddle)}</p>
          </div>
        </div>
        <div className="pt-4 cstm-flex-row w-full">
          <button
            className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 px-4
                t:text-base"
          >
            Add Riddle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRiddle;

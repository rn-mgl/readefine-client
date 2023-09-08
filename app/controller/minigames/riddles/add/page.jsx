"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import Message from "@/src/src/components/global/Message";
import axios from "axios";
import Link from "next/link";

import { BsArrowLeft } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { wordCount } from "@/src/src/functions/wordCount";
import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import { useMessage } from "@/src/src/hooks/useMessage";

const AddRiddle = () => {
  const [riddleData, setRiddleData] = React.useState({ riddle: "", answer: "" });

  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession({ required: true });
  const user = session?.user?.name;
  const { url } = useGlobalContext();
  const router = useRouter();

  // handle on change of riddle
  const handleRiddleData = ({ name, value }) => {
    setRiddleData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // add riddle
  const addRiddle = async (e) => {
    e.preventDefault();
    const { riddle, answer } = riddleData;

    try {
      const { data } = await axios.post(
        `${url}/admin_riddles`,
        { riddle, answer },
        { headers: { Authorization: user.token } }
      );

      // reset if riddle is added
      if (data) {
        setMessageStatus(true, `Successfully added ${answer}.`, "info");
        setRiddleData({ riddle: "", answer: "" });
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Riddles" mainHeader="Add Riddle" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <form onSubmit={(e) => addRiddle(e)} className="w-full cstm-flex-col h-full cstm-w-limit border-collapse gap-5">
        <Link href="/controller/minigames/riddles" className="cstm-bg-hover mr-auto text-prmColor" type="button">
          <BsArrowLeft />
        </Link>

        <div
          className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-full 
                    justify-start items-start bg-white text-sm gap-5 shadow-md cstm-scrollbar"
        >
          <div className="cstm-flex-row w-full">
            <textarea
              name="answer"
              id=""
              cols="30"
              rows="1"
              placeholder="Answer"
              value={riddleData.answer}
              required={true}
              className="resize-none w-full p-2 focus:outline-none font-bold text-prmColor mr-auto"
              onChange={(e) => handleRiddleData(e.target)}
            />
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
              required={true}
              className="resize-none p-2 focus:outline-none w-full h-full mr-auto"
              onChange={(e) => handleRiddleData(e.target)}
            />

            <p className="ml-auto">words: {wordCount(riddleData.riddle)}</p>
          </div>
        </div>

        <div className="cstm-flex-row w-full">
          <button
            className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-prmColor 
                          text-accntColor rounded-full p-2 px-4 t:px-10"
          >
            Add Riddle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRiddle;

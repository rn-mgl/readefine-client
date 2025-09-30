"use client";
import AdminPageHeader from "@/admin/global/PageHeader";
import Message from "@/components/global/Message";
import axios from "axios";
import Link from "next/link";
import React from "react";

import { isTokenExpired } from "@/functions/jwtFns";
import { wordCount } from "@/functions/wordCount";
import { useMessage } from "@/hooks/useMessage";
import useAdminActivities from "@/src/hooks/useAdminActivities";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

const AddRiddle = () => {
  const [riddleData, setRiddleData] = React.useState({
    riddle: "",
    answer: "",
  });

  const { message, setMessageStatus } = useMessage();
  const { createAdminActivity } = useAdminActivities();

  const { data: session } = useSession({ required: true });
  const user = session?.user;
  const url = process.env.API_URL;
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
        const activityData = await createAdminActivity(
          "riddle",
          riddleData.answer,
          "C"
        );

        if (activityData) {
          setMessageStatus(true, `Successfully added ${answer}.`, "info");
          setRiddleData({ riddle: "", answer: "" });
        }
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
    <div className="p-4 bg-accntColor w-full min-h-screen h-screen cstm-flex-col gap-4 justify-start">
      <AdminPageHeader subHeader="Riddles" mainHeader="Add Riddle" />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <form
        onSubmit={(e) => addRiddle(e)}
        className="w-full cstm-flex-col h-full  border-collapse gap-4"
      >
        <Link
          href="/controller/minigames/riddles"
          className="cstm-bg-hover mr-auto text-prmColor"
          type="button"
        >
          <BsArrowLeft />
        </Link>

        <div
          className="table-fixed p-4 rounded-2xl cstm-flex-col overflow-auto w-full h-full 
                    justify-start items-start bg-white text-sm gap-4 shadow-md cstm-scrollbar"
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
            className="w-fit text-center  ml-auto text-sm font-normal bg-prmColor 
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

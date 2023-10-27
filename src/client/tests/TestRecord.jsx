"use client";
import React from "react";
import axios from "axios";

import { useGlobalContext } from "@/base/context";
import { useSession } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import { BsCheck } from "react-icons/bs";
import Message from "@/components/global/Message";
import { useMessage } from "@/hooks/useMessage";

const TestRecord = (props) => {
  const [testData, setTestData] = React.useState([]);

  const { message, setMessageStatus } = useMessage();

  const { url } = useGlobalContext();
  const { data: session } = useSession();
  const user = session?.user?.name;

  const questionsAndAnswer = testData?.map((q, i) => {
    const isCorrect = q.choice === q.answer;
    return (
      <div
        className="p-4 bg-white rounded-2xl w-full h-full border-2 border-neutral-300 
                  cstm-flex-col gap-4 justify-start shadow-solid animate-fadeIn"
        style={{ animationDuration: `${i * 0.1}s` }}
        key={q.question_id}
      >
        <div className="w-full h-44 overflow-y-auto cstm-scrollbar">
          <p className="font-semibold">{q.question}</p>
        </div>

        <div className="cstm-separator" />

        <div className="cstm-flex-col gap-3 w-full h-full t:cstm-flex-row t:flex-wrap">
          <div className="w-full h-full cstm-flex-col gap-4">
            <div
              className={`cstm-flex-col w-full gap-2 text-center t:w-full 
                rounded-md p-2 h-full ${isCorrect ? "bg-green-100" : "bg-red-100"}`}
            >
              <div className="cstm-flex-row gap-2  w-full ">
                <p className="font-bold text-prmColor">Your Answer</p>
                <div className={`${isCorrect ? "bg-prmColor" : "bg-scndColor"} rounded-full cstm-flex-col`}>
                  {isCorrect ? <BsCheck className="text-scndColor" /> : <IoClose className="text-prmColor " />}
                </div>
              </div>

              <p className={`${q.choice ? "opacity-100" : "opacity-50"}`}>{q.choice ? q.choice : "No Answer"}</p>
            </div>

            <div className="cstm-separator" />

            <div className="cstm-flex-col w-full gap-2 text-center t:w-full bg-prmColor p-2 rounded-md h-full">
              <p className="font-bold text-scndColor">Answer</p>
              <p className="text-accntColor">{q.answer}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const getTestData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/taken_test`, {
        headers: { Authorization: user?.token },
        params: { testId: props.testId },
      });
      if (data) {
        setTestData(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, props.testId, setMessageStatus]);

  React.useEffect(() => {
    if (user) {
      getTestData();
    }
  }, [user, getTestData]);

  return (
    <div
      className="fixed w-full top-0 left-0 h-full bg-accntColor z-30 
                  cstm-flex-col justify-start overflow-y-auto cstm-scrollbar-2"
    >
      {message.active ? <Message setMessageStatus={setMessageStatus} /> : null}
      <div className="w-full h-auto cstm-w-limit cstm-flex-col justify-start gap-4 p-4">
        <button onClick={() => props.handleSeeTestRecord(props.testId)} className="cstm-bg-hover ml-auto">
          <IoClose className="text-prmColor scale-150" />
        </button>

        <div className="w-full h-full grid grid-cols-1 t:grid-cols-2 l-l:grid-cols-3 gap-4">{questionsAndAnswer}</div>
      </div>
    </div>
  );
};

export default TestRecord;

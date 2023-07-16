"use client";
import React from "react";
import axios from "axios";

import { useGlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import { BsCheck } from "react-icons/bs";
import ActionLabel from "../../components/global/ActionLabel";

const TestRecord = (props) => {
  const [testData, setTestData] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false });

  const { url } = useGlobalContext();
  const { data: session } = useSession();
  const user = session?.user?.name;

  const questionsAndAnswer = testData?.map((q, i) => {
    const isCorrect = q.choice === q.answer;
    return (
      <div
        className="p-5 bg-white rounded-md w-full cstm-flex-col gap-5 items-start t:w-10/12 l-l:w-8/12 shadow-md"
        key={q.question_id}
      >
        <p className="font-bold">{q.question}</p>
        <div className="cstm-separator" />
        <div className="cstm-flex-col gap-3 w-full t:cstm-flex-row t:flex-wrap">
          <div className="w-full h-full cstm-flex-col gap-5 t:cstm-flex-row">
            <div className="cstm-flex-col w-full gap-2 text-center t:w-full bg-accntColor rounded-md p-2 h-full">
              <div className="cstm-flex-row gap-2  w-full ">
                <p className="font-bold text-prmColor">Your Answer</p>
                <div
                  className={`${
                    isCorrect ? "bg-prmColor" : "bg-scndColor"
                  } rounded-full cstm-flex-col`}
                >
                  {isCorrect ? (
                    <BsCheck className="text-scndColor" />
                  ) : (
                    <IoClose className="text-prmColor " />
                  )}
                </div>
              </div>

              <p className={`${q.choice ? "opacity-100" : "opacity-50"}`}>
                {q.choice ? q.choice : "No Answer"}
              </p>
            </div>
            <div className="cstm-separator t:hidden" />
            <div className="cstm-flex-col w-full gap-2 text-center t:w-full bg-prmColor p-2 rounded-md h-full">
              <p className="font-bold text-scndColor">Answer</p>
              <p className="text-white">{q.answer}</p>
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
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, props.testId]);

  React.useEffect(() => {
    if (user) {
      getTestData();
    }
  }, [user, getTestData]);

  console.log(testData);

  return (
    <div className="fixed w-full top-0 left-0 h-full backdrop-blur-md z-30 p-5 cstm-flex-col justify-start overflow-y-auto cstm-scrollbar">
      <div className="w-full h-auto cstm-w-limit cstm-flex-col justify-start gap-5 ">
        <button
          onClick={() => props.handleSeeTestRecord(props.testId)}
          className="cstm-bg-hover ml-auto"
        >
          <IoClose className="text-prmColor scale-150" />
        </button>

        {questionsAndAnswer}
      </div>
    </div>
  );
};

export default TestRecord;

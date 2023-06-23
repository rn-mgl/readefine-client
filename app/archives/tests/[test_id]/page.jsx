"use client";
import axios from "axios";
import React from "react";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import QuestionSlide from "@/src/src/client/tests/QuestionSlide";
import Link from "next/link";
import ScorePopup from "@/src/src/components/tests/ScorePopup";
import Message from "@/src/src/components/global/Message";

import { useSession } from "next-auth/react";
import { computeScore, shuffleQuestions } from "@/src/src/functions/testFns";
import { useGlobalContext } from "@/src/context";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";

const SingleTest = ({ params }) => {
  const [testData, setTestData] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [activePage, setActivePage] = React.useState(0);
  const [isFinished, setIsFinished] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [message, setMessage] = React.useState({ msg: "", active: false });
  const [selectedChoices, setSelectedChoices] = React.useState({
    choice1: { answer: "", questionId: -1 },
    choice2: { answer: "", questionId: -1 },
    choice3: { answer: "", questionId: -1 },
    choice4: { answer: "", questionId: -1 },
    choice5: { answer: "", questionId: -1 },
    choice6: { answer: "", questionId: -1 },
    choice7: { answer: "", questionId: -1 },
    choice8: { answer: "", questionId: -1 },
    choice9: { answer: "", questionId: -1 },
    choice10: { answer: "", questionId: -1 },
  });

  const { url } = useGlobalContext();
  const { data: session } = useSession();
  const testId = params?.test_id;
  const user = session?.user?.name;

  const handleSelectedChoices = (id, { name, value }) => {
    setSelectedChoices((prev) => {
      return {
        ...prev,
        [name]: { answer: value, questionId: id },
      };
    });
  };

  const handleIncrement = () => {
    setActivePage((prev) => (prev + 1 > 9 ? 9 : prev + 1));
  };

  const clearChoices = () => {
    setSelectedChoices({
      choice1: { answer: "", questionId: -1 },
      choice2: { answer: "", questionId: -1 },
      choice3: { answer: "", questionId: -1 },
      choice4: { answer: "", questionId: -1 },
      choice5: { answer: "", questionId: -1 },
      choice6: { answer: "", questionId: -1 },
      choice7: { answer: "", questionId: -1 },
      choice8: { answer: "", questionId: -1 },
      choice9: { answer: "", questionId: -1 },
      choice10: { answer: "", questionId: -1 },
    });
  };

  const handleDecrement = () => {
    setActivePage((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  const handleIsFinished = () => {
    setIsFinished((prev) => !prev);
  };

  const questionSlides = questions.map((q, index) => {
    return (
      <React.Fragment key={q.question_id}>
        <QuestionSlide
          question={q.question}
          choice1={q.choice_1}
          choice2={q.choice_2}
          choice3={q.choice_3}
          choice4={q.choice_4}
          index={index}
          selectedChoices={selectedChoices}
          questionId={q.question_id}
          activePage={activePage}
          handleSelectedChoices={handleSelectedChoices}
          maxPage={10}
        />
      </React.Fragment>
    );
  });

  const submitAnswers = async () => {
    let answeredAll = false;

    // check if all are answered
    for (let i = 1; i <= 10; i++) {
      answeredAll = selectedChoices[`choice${i}`].answer !== "";
    }

    if (!answeredAll) {
      // add message
      return;
    }

    const currScore = computeScore(setScore, setIsFinished, questions, selectedChoices);

    // check if legible for growth
    if (user?.lexile - 50 > testData.lexile) {
      // add message
      return;
    }

    // check if passed
    if (currScore < 7) {
      // add message
      clearChoices();
      return;
    }

    // add record to db
    try {
      const { data } = await axios.post(
        `${url}/taken_test/${testId}`,
        { selectedChoices, score: currScore },
        { headers: { Authorization: user?.token } }
      );
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  };

  const getTestData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/test/${testId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setTestData(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, testId]);

  const getQuestions = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/test_question`, {
        params: { testId },
        headers: { Authorization: user?.token },
      });
      if (data) {
        shuffleQuestions(data);
        setQuestions(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [user, url, testId]);

  React.useEffect(() => {
    if (user) {
      getTestData();
    }
  }, [user, getTestData]);

  React.useEffect(() => {
    if (user) {
      getQuestions();
    }
  }, [user, getQuestions]);

  return (
    <div className="p-5 w-full min-h-screen bg-accntColor cstm-flex-col gap-2 justify-start overflow-x-hidden">
      <ClientPageHeader mainHeader={testData?.title} subHeader="Test" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      {isFinished ? <ScorePopup score={score} handleIsFinished={handleIsFinished} /> : null}
      <div className="cstm-flex-row items-start gap-2 w-full cstm-w-limit relative h-[65vh] l-l:h-[70vh]">
        <Link href="/archives/tests" className="cstm-bg-hover mr-auto">
          <BsArrowLeft className="text-prmColor" />
        </Link>
        {questionSlides}
      </div>

      <div className="cstm-flex-col w-full mt-auto cstm-w-limit gap-5 t:gap-2">
        {activePage === 9 ? (
          <button
            onClick={submitAnswers}
            className="bg-prmColor w-full ml-auto p-2  rounded-full cstm-flex-col font-medium text-scndColor shadow-solid shadow-indigo-950
                      t:w-fit t:px-10 t:mx-auto "
          >
            Submit
          </button>
        ) : null}
        <div className="cstm-flex-row w-full">
          {activePage > 0 ? (
            <button
              onClick={handleDecrement}
              className="bg-prmColor mr-auto p-2 w-16 rounded-md cstm-flex-col font-medium text-white shadow-solid shadow-indigo-950"
            >
              <AiFillCaretLeft />
            </button>
          ) : null}

          {activePage < 9 ? (
            <button
              onClick={handleIncrement}
              className="bg-prmColor ml-auto p-2 w-16 rounded-md cstm-flex-col font-medium text-white shadow-solid shadow-indigo-950"
            >
              <AiFillCaretRight />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SingleTest;

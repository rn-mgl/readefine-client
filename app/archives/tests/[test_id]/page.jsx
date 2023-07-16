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
import { useRouter } from "next/navigation";
import TestResult from "@/src/src/client/tests/TestResult";
import ReceiveAchievement from "@/src/src/client/achievements/ReceiveAchievement";

const SingleTest = ({ params }) => {
  const [testData, setTestData] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [activePage, setActivePage] = React.useState(0);
  const [userLexile, setUserLexile] = React.useState(-1);
  const [isFinished, setIsFinished] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
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
  const [accomplishedAchievement, setAccomplishedAchievement] = React.useState({
    accomplished: false,
    achievements: [],
  });

  const { url } = useGlobalContext();
  const { data: session } = useSession();
  const testId = params?.test_id;
  const user = session?.user?.name;
  const router = useRouter();

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

  const handleHasSubmitted = () => {
    setHasSubmitted((prev) => !prev);
  };

  const handleAccomplishedAchievement = () => {
    setAccomplishedAchievement({
      accomplished: false,
      data: {},
    });
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

  // submit test answers and do checkings
  const submitAnswers = async () => {
    let answeredAll = false;
    const legibleForGrowth = testData.lexile > userLexile.lexile - 100;

    // check if all are answered
    for (let i = 1; i <= 10; i++) {
      answeredAll = selectedChoices[`choice${i}`].answer !== "";
    }

    // do not submit if not all are answered
    if (!answeredAll) {
      setMessage({ active: true, msg: "Please answer all items." });
      return;
    }

    // get score
    const currScore = computeScore(setScore, setIsFinished, questions, selectedChoices);

    // check if legible for growth
    if (!legibleForGrowth) {
      setMessage({
        active: true,
        msg: "Your test will be recorded but not graded.",
      });
    }

    // check if passed, do not record if not
    if (currScore < 7) {
      setIsFinished(true);
      return;
    }

    // add record to db
    try {
      // record test and answers
      const { data } = await axios.post(
        `${url}/taken_test`,
        { selectedChoices, testId, score: currScore, legibleForGrowth, lexile: userLexile?.lexile },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        // update lexile achievement points and return if achievement is met
        const { data: achievementData } = await axios.patch(
          `${url}/user_achievement`,
          {
            type: "user_lexile",
            specifics: "lexile_growth",
            userId: user?.userId,
            toAdd: data?.toAdd,
          },
          { headers: { Authorization: user?.token } }
        );

        // if there are achievements
        if (achievementData.length) {
          setAccomplishedAchievement({ accomplished: true, achievements: achievementData });
        }

        // can see result after record
        setIsFinished(true);
        setHasSubmitted(true);
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
        setQuestions(shuffleQuestions(data));
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [user, url, testId]);

  const getUserLexile = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/user_lexile`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setUserLexile(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setUserLexile, url, user]);

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

  React.useEffect(() => {
    if (user) {
      getUserLexile();
    }
  }, [user, getUserLexile]);

  return (
    <div className="p-5 w-full min-h-screen bg-accntColor cstm-flex-col gap-5 justify-start overflow-x-hidden">
      <ClientPageHeader mainHeader={testData?.title} subHeader="Test" />

      {accomplishedAchievement.accomplished ? (
        <ReceiveAchievement
          achievements={accomplishedAchievement.achievements}
          handleAccomplishedAchievement={handleAccomplishedAchievement}
        />
      ) : null}

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {isFinished ? (
        <ScorePopup url="/archives/tests" score={score} handleIsFinished={handleIsFinished} />
      ) : null}

      <div className="cstm-w-limit cstm-flex-col gap-5 w-full">
        <div className="cstm-flex-row w-full">
          <Link href="/archives/tests" className="cstm-bg-hover mr-auto">
            <BsArrowLeft className="text-prmColor" />
          </Link>

          {activePage === 9 && !hasSubmitted ? (
            <button
              onClick={submitAnswers}
              className="bg-prmColor w-fit ml-auto p-2 px-10  text-sm rounded-full cstm-flex-col font-medium text-scndColor shadow-solid shadow-indigo-950"
            >
              Submit
            </button>
          ) : null}
        </div>
        <p className="text-xs">
          <span className="font-bold text-prmColor">note:</span> Changing tabs will reset your test.
        </p>

        <div className="cstm-flex-row items-start w-full relative h-[60vh] t:h-[65vh]">
          {questionSlides}
        </div>
      </div>

      <div className="cstm-flex-col w-full mt-auto cstm-w-limit gap-5 t:gap-2">
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

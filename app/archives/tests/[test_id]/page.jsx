"use client";
import axios from "axios";
import React from "react";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import QuestionSlide from "@/src/src/client/tests/QuestionSlide";
import Link from "next/link";
import ScorePopup from "@/src/src/components/tests/ScorePopup";
import Message from "@/src/src/components/global/Message";
import ReceiveAchievement from "@/src/src/client/achievements/ReceiveAchievement";

import { useSession } from "next-auth/react";
import { computeScore, shuffleQuestions } from "@/src/src/functions/testFns";
import { useGlobalContext } from "@/src/context";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { decipher } from "@/src/src/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

const SingleTest = ({ params }) => {
  const [testData, setTestData] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [userLexile, setUserLexile] = React.useState(-1);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

  const [activePage, setActivePage] = React.useState(0);

  const [isFinished, setIsFinished] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [score, setScore] = React.useState(0);

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
  const decodedTestId = decipher(params?.test_id);
  const user = session?.user?.name;
  const router = useRouter();

  // handle next page
  const handleIncrement = () => {
    setActivePage((prev) => (prev + 1 > 9 ? 9 : prev + 1));
  };

  // handle prev page
  const handleDecrement = () => {
    setActivePage((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  // toggle is finished
  const handleIsFinished = () => {
    setIsFinished((prev) => !prev);
  };

  // handle reset achievement to close pop up reward
  const handleAccomplishedAchievement = () => {
    setAccomplishedAchievement({
      accomplished: false,
      data: {},
    });
  };

  // handle onchange select choice
  const handleSelectedChoices = (id, { name, value }) => {
    setSelectedChoices((prev) => {
      return {
        ...prev,
        [name]: { answer: value, questionId: id },
      };
    });
  };

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
      setMessage({ active: true, msg: "Please answer all items.", type: "warning" });
      return;
    }

    // get score
    const currScore = computeScore(setScore, setIsFinished, questions, selectedChoices);

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
        {
          selectedChoices,
          testId: decodedTestId,
          score: currScore,
          legibleForGrowth,
          lexile: userLexile?.lexile,
        },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        // update lexile achievement points and return if achievement is met
        const { data: lexileAhievementData } = await axios.patch(
          `${url}/user_achievement`,
          {
            type: "user_lexile",
            specifics: "lexile_growth",
            toAdd: data?.toAdd,
          },
          { headers: { Authorization: user?.token } }
        );

        // if there are achievements
        if (lexileAhievementData.length) {
          setAccomplishedAchievement({ accomplished: true, achievements: lexileAhievementData });
        }

        // update test achievement points and return if achievement is met
        const { data: testAchievementData } = await axios.patch(
          `${url}/user_achievement`,
          {
            type: "answered_tests",
            specifics: "book_count",
            toAdd: 1,
          },
          { headers: { Authorization: user?.token } }
        );

        // if there are achievements
        if (testAchievementData.length) {
          setAccomplishedAchievement({ accomplished: true, achievements: testAchievementData });
        }

        // notice if not legible for lexile growth
        if (!legibleForGrowth) {
          setMessage({
            active: true,
            msg: "Your test will be recorded but not graded.",
            type: "info",
          });
        }

        // can see result after record
        setIsFinished(true);
        setHasSubmitted(true);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  };

  // get test data
  const getTestData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/test/${decodedTestId}`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        setTestData(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, decodedTestId]);

  // get questions
  const getQuestions = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/test_question`, {
        params: { testId: decodedTestId },
        headers: { Authorization: user?.token },
      });
      if (data) {
        setQuestions(shuffleQuestions(data));
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [user, url, decodedTestId]);

  // get user lexile
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
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [setUserLexile, url, user]);

  // map questions
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

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[1]);

      if (isExpired) {
        router.push("/login");
      }
    }
  }, [user, router]);

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

          {/* show submit button if at last page and did not submit yet */}
          {activePage === 9 && !hasSubmitted ? (
            <button
              onClick={submitAnswers}
              disabled={hasSubmitted}
              className="bg-prmColor w-fit ml-auto p-2 px-10  text-sm rounded-full cstm-flex-col 
                        font-medium text-scndColor shadow-solid shadow-indigo-950 disabled:saturate-0"
            >
              Submit
            </button>
          ) : null}
        </div>

        <p className="text-xs">
          <span className="font-bold text-prmColor">note:</span> Changing tabs will reset your test.
        </p>

        {/* question pane */}
        <div className="cstm-flex-row items-start w-full relative h-[60vh] t:h-[65vh]">
          {questionSlides}
        </div>
      </div>

      <div className="cstm-flex-col w-full mt-auto cstm-w-limit gap-5 t:gap-5">
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

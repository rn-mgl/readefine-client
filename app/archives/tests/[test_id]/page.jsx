"use client";
import axios from "axios";
import React from "react";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import QuestionSlide from "@/src/src/client/tests/QuestionSlide";
import ScorePopup from "@/src/src/components/tests/ScorePopup";
import Message from "@/src/src/components/global/Message";
import ReceiveAchievement from "@/src/src/client/achievements/ReceiveAchievement";
import TestActions from "@/src/src/client/tests/TestActions";
import PageNavigation from "@/src/src/client/tests/PageNavigation";

import { useSession } from "next-auth/react";
import { shuffleQuestions } from "@/src/src/functions/testFns";
import { useGlobalContext } from "@/src/context";
import { decipher } from "@/src/src/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import { useReceiveAchievement } from "@/src/src/hooks/useReceiveAchievement";
import { useTestControls } from "@/src/src/hooks/useTestControls";
import Loading from "@/src/src/components/global/Loading";
import { useLoading } from "@/src/src/hooks/useLoading";

const SingleTest = ({ params }) => {
  const [userLexile, setUserLexile] = React.useState(-1);
  const [activePage, setActivePage] = React.useState(0);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const [message, setMessage] = React.useState({
    msg: "",
    active: false,
    type: "info",
  });

  const {
    testData,
    questions,
    isFinished,
    score,
    selectedChoices,
    handleIsFinished,
    handleSelectedChoices,
    computeScore,
    setNewTestData,
    setNewQuestions,
  } = useTestControls();

  const { accomplishedAchievement, claimNewAchievement, resetAchievement } = useReceiveAchievement();

  const { loading, setLoadingState } = useLoading(true);

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

  // checker to see if all items are answered
  const allAreAnswered = () => {
    let answeredTests = 0;

    for (let i = 1; i <= 10; i++) {
      const currAnswer = selectedChoices[`choice${i}`].answer;
      answeredTests += currAnswer !== "" ? 1 : 0;
    }

    return answeredTests === 10;
  };

  const updateLexileAchievement = async (toAdd) => {
    try {
      // update lexile achievement points and return if achievement is met
      const { data: lexileAchievementData } = await axios.patch(
        `${url}/user_achievement`,
        {
          type: "user_lexile",
          toAdd,
        },
        { headers: { Authorization: user?.token } }
      );

      // if there are achievements
      if (lexileAchievementData.length) {
        claimNewAchievement(lexileAchievementData);
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessage({
        active: true,
        msg: error?.response?.data?.msg,
        type: "error",
      });
    }
  };

  const updateTestAchievement = async () => {
    try {
      // update test achievement points and return if achievement is met
      const { data: testAchievementData } = await axios.patch(
        `${url}/user_achievement`,
        {
          type: "answered_tests",
          toAdd: 1,
        },
        { headers: { Authorization: user?.token } }
      );

      // if there are achievements
      if (testAchievementData.length) {
        claimNewAchievement(testAchievementData);
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessage({
        active: true,
        msg: error?.response?.data?.msg,
        type: "error",
      });
    }
  };

  // submit test answers and do checkings
  const submitAnswers = async () => {
    const legibleForGrowth = testData.lexile > userLexile.lexile - 100;
    const answeredAll = allAreAnswered();
    setHasSubmitted(true);
    setLoadingState(true);

    // do not submit if not all are answered
    if (!answeredAll) {
      setHasSubmitted(false);
      setLoadingState(false);
      setMessage({
        active: true,
        msg: "Please answer all items.",
        type: "warning",
      });
      return;
    }

    // get score
    const score = computeScore();

    // check if passed, do not record if not
    if (score < 7) {
      handleIsFinished(true);
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
          score,
          legibleForGrowth,
          lexile: userLexile?.lexile,
        },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        if (legibleForGrowth) {
          const lexileAchievement = await updateLexileAchievement(data?.toAdd);
          const testAchievement = await updateTestAchievement();
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
        handleIsFinished(true);
        setLoadingState(false);
      }
    } catch (error) {
      console.log(error);
      setHasSubmitted(false);
      setLoadingState(false);
      setMessage({
        active: true,
        msg: error?.response?.data?.msg,
        type: "error",
      });
    }
  };

  // get test data
  const getTestData = React.useCallback(async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/test/${decodedTestId}`, {
          headers: { Authorization: user?.token },
        });

        if (data) {
          setNewTestData(data);
        }
      } catch (error) {
        console.log(error);

        setMessage({
          active: true,
          msg: error?.response?.data?.msg,
          type: "error",
        });
      }
    }
  }, [url, user?.token, decodedTestId, setNewTestData]);

  // get questions
  const getQuestions = React.useCallback(async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/test_question`, {
          params: { testId: decodedTestId },
          headers: { Authorization: user?.token },
        });

        if (data) {
          const shuffledQuestions = shuffleQuestions(data);
          setNewQuestions(shuffledQuestions);
        }
      } catch (error) {
        console.log(error);

        setMessage({
          active: true,
          msg: error?.response?.data?.msg,
          type: "error",
        });
      }
    }
  }, [user?.token, url, decodedTestId, setNewQuestions]);

  // get user lexile
  const getUserLexile = React.useCallback(async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/user_lexile`, {
          headers: { Authorization: user?.token },
        });

        if (data) {
          setUserLexile(data);
        }
      } catch (error) {
        console.log(error);
        setMessage({
          active: true,
          msg: error?.response?.data?.msg,
          type: "error",
        });
      }
    }
  }, [setUserLexile, url, user?.token]);

  // map questions
  const questionSlides = questions.map((q, index) => {
    return (
      <React.Fragment key={q.question_id}>
        <QuestionSlide
          name={`choice${index + 1}`}
          questionId={q.question_id}
          question={q.question}
          choice1={q.choice_1}
          choice2={q.choice_2}
          choice3={q.choice_3}
          choice4={q.choice_4}
          index={index}
          selectedChoices={selectedChoices}
          activePage={activePage}
          handleSelectedChoices={handleSelectedChoices}
          maxPage={10}
        />
      </React.Fragment>
    );
  });

  React.useEffect(() => {
    getTestData();
  }, [getTestData]);

  React.useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  React.useEffect(() => {
    getUserLexile();
  }, [getUserLexile]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[1]);

      if (isExpired) {
        router.push("/login");
      }
    }
  }, [user, router]);

  return (
    <div className="p-5 w-full min-h-screen h-screen bg-accntColor cstm-flex-col gap-5 justify-start overflow-x-hidden">
      {loading ? <Loading /> : null}

      <ClientPageHeader mainHeader={testData?.title} subHeader="Test" />

      {accomplishedAchievement.accomplished ? (
        <ReceiveAchievement achievements={accomplishedAchievement.achievements} resetAchievement={resetAchievement} />
      ) : null}

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {isFinished ? (
        <ScorePopup url="/archives/tests" score={score} handleIsFinished={() => handleIsFinished(false)} />
      ) : null}

      <div className="cstm-w-limit cstm-flex-col gap-5 w-full h-full relative">
        <TestActions activePage={activePage} hasSubmitted={hasSubmitted} submitAnswers={submitAnswers} />

        {/* question pane */}
        <div className="cstm-flex-row items-start w-full relative h-full">
          {questions.length ? questionSlides : <p>There is no test content for this story yet.</p>}
        </div>
      </div>

      <PageNavigation activePage={activePage} handleDecrement={handleDecrement} handleIncrement={handleIncrement} />
    </div>
  );
};

export default SingleTest;

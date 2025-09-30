"use client";
import axios from "axios";
import React from "react";
import ClientPageHeader from "@/client/global/PageHeader";
import QuestionSlide from "@/client/tests/QuestionSlide";
import ScorePopup from "@/components/tests/ScorePopup";
import Message from "@/components/global/Message";
import ReceiveAchievement from "@/client/achievements/ReceiveAchievement";
import TestActions from "@/client/tests/TestActions";
import PageNavigation from "@/client/tests/PageNavigation";

import { useSession } from "next-auth/react";
import { shuffleQuestions } from "@/functions/testFns";

import { useParams, useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useReceiveAchievement } from "@/hooks/useReceiveAchievement";
import { useTestControls } from "@/hooks/useTestControls";
import Loading from "@/components/global/Loading";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { useUserLexile } from "@/hooks/useUserLexile";

const SingleTest = () => {
  const [activePage, setActivePage] = React.useState(0);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

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
  const { accomplishedAchievement, claimNewAchievement, resetAchievement } =
    useReceiveAchievement();
  const { loading, setLoadingState } = useLoading(true);
  const { message, setMessageStatus } = useMessage();
  const { userLexile } = useUserLexile();

  const url = process.env.API_URL;
  const { data: session } = useSession();
  const params = useParams();
  const testId = params?.test_id;
  const user = session?.user;
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
      setMessageStatus(true, error?.response?.data?.msg, "error");
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
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  // submit test answers and do checkings
  const submitAnswers = async () => {
    const legibleForGrowth = testData.lexile > userLexile - 100;
    const answeredAll = allAreAnswered();
    setHasSubmitted(true);
    setLoadingState(true);

    // do not submit if not all are answered
    if (!answeredAll) {
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(true, "Please answer all items.", "warning");
      return;
    }

    // get score
    const score = computeScore();

    console.log(score);

    // check if passed, do not record if not
    if (score < 7) {
      handleIsFinished(true);
      setHasSubmitted(false);
      setLoadingState(false);
      return;
    }

    // add record to db
    try {
      // record test and answers
      const { data } = await axios.post(
        `${url}/taken_test`,
        {
          selectedChoices,
          testId: testId,
          score,
          legibleForGrowth,
          lexile: userLexile,
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
          setMessageStatus(
            true,
            "Your test will be recorded but not graded.",
            "info"
          );
        }

        // can see result after record
        handleIsFinished(true);
        setLoadingState(false);
      }
    } catch (error) {
      console.log(error);
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  // get test data
  const getTestData = React.useCallback(async () => {
    if (user?.token) {
      setLoadingState(true);
      try {
        const { data } = await axios.get(`${url}/test/${testId}`, {
          headers: { Authorization: user?.token },
        });

        if (data) {
          setNewTestData(data);
          setLoadingState(false);
        }
      } catch (error) {
        console.log(error);
        setLoadingState(false);
        setMessageStatus(true, error?.response?.data?.msg, "error");
      }
    }
  }, [
    url,
    user?.token,
    testId,
    setNewTestData,
    setMessageStatus,
    setLoadingState,
  ]);

  // get questions
  const getQuestions = React.useCallback(async () => {
    if (user?.token) {
      setLoadingState(true);
      try {
        const { data } = await axios.get(`${url}/test_question`, {
          params: { testId: testId },
          headers: { Authorization: user?.token },
        });

        if (data) {
          const shuffledQuestions = shuffleQuestions(data);
          setNewQuestions(shuffledQuestions);
          setLoadingState(false);
        }
      } catch (error) {
        console.log(error);
        setLoadingState(false);
        setMessageStatus(true, error?.response?.data?.msg, "error");
      }
    }
  }, [
    user?.token,
    url,
    testId,
    setNewQuestions,
    setMessageStatus,
    setLoadingState,
  ]);

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
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[1]);

      if (isExpired) {
        router.push("/login");
      }
    }
  }, [user, router]);

  return (
    <div className="p-4 w-full min-h-screen h-screen bg-accntColor cstm-flex-col gap-4 justify-start overflow-x-hidden">
      {loading ? <Loading /> : null}

      <ClientPageHeader mainHeader={testData?.title} subHeader="Test" />

      {accomplishedAchievement.accomplished ? (
        <ReceiveAchievement
          achievements={accomplishedAchievement.achievements}
          resetAchievement={resetAchievement}
        />
      ) : null}

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      {isFinished ? (
        <ScorePopup
          score={score}
          handleIsFinished={() => {
            handleIsFinished(false);
            window.location.href = "/archives/tests";
          }}
        />
      ) : null}

      <div className=" cstm-flex-col gap-4 w-full h-full relative">
        <TestActions
          activePage={activePage}
          hasSubmitted={hasSubmitted}
          submitAnswers={submitAnswers}
        />

        {/* question pane */}
        <div className="cstm-flex-row items-start w-full relative h-full">
          {questions.length ? (
            questionSlides
          ) : (
            <p>There is no test content for this story yet.</p>
          )}
        </div>
      </div>

      <PageNavigation
        activePage={activePage}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
      />
    </div>
  );
};

export default SingleTest;

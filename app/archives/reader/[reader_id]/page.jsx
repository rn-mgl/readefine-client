"use client";

import React, { Suspense } from "react";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import MainProfile from "@/src/src/client/reader/MainProfile";
import axios from "axios";
import EditMain from "@/src/src/client/reader/EditMain";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import EditGradeLevel from "@/src/src/client/reader/EditGradeLevel";
import AnswersText from "@/src/src/client/reader/AnswersText";
import ActivityCard from "@/src/src/client/reader/ActivityCard";
import StoriesCards from "@/src/src/client/stories/StoriesCards";
import TestsCards from "@/src/src/client/tests/TestsCards";
import LowLexileTestMessage from "@/src/src/client/tests/LowLexileTestMessage";
import RewardsCards from "@/src/src/client/rewards/RewardsCards";
import { localizeDate } from "@/src/src/functions/localDate";

const Reader = () => {
  const [userData, setUserData] = React.useState({});
  const [userActivities, setUserActivities] = React.useState({});
  const [canEditMain, setCanEditMain] = React.useState(false);
  const [canEditGradeLevel, setCanEditGradeLevel] = React.useState(false);
  const [showLexileMessage, setShowLexileMessage] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState(-1);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  function handleCanEditMain() {
    setCanEditMain((prev) => !prev);
  }

  const handleCanEditGradeLevel = () => {
    setCanEditGradeLevel((prev) => !prev);
  };

  const handleShowLexileMessage = () => {
    setShowLexileMessage((prev) => !prev);
  };

  const handleSelectedBook = (id) => {
    setSelectedBook(id);
  };

  const getUserData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/user/${user?.userId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, setUserData]);

  const getUserActivities = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/activities/${user?.userId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setUserActivities(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, setUserActivities]);

  const answeredQuestions = userActivities?.questionsData?.map((q) => {
    return (
      <React.Fragment key={q.answer_id}>
        <AnswersText
          question={q.question}
          myAnswer={q.my_answer}
          correctAnswer={q.correct_answer}
          dateAnswered={localizeDate(q.date_answered)}
        />
      </React.Fragment>
    );
  });

  const answeredDangle = userActivities?.dangleData?.map((q) => {
    return (
      <React.Fragment key={q.answer_id}>
        <AnswersText
          duration={q.duration_seconds}
          myAnswer={q.answer}
          correctAnswer={q.word.toUpperCase()}
          dateAnswered={localizeDate(q.date_answered)}
        />
      </React.Fragment>
    );
  });

  const answeredDecipher = userActivities?.decipherData?.map((q) => {
    return (
      <React.Fragment key={q.answer_id}>
        <AnswersText
          duration={q.duration_seconds}
          myAnswer={q.answer}
          correctAnswer={q.word.toUpperCase()}
          dateAnswered={localizeDate(q.date_answered)}
        />
      </React.Fragment>
    );
  });

  const answeredRiddles = userActivities?.riddlesData?.map((q) => {
    return (
      <React.Fragment key={q.answer_id}>
        <AnswersText
          question={q.riddle}
          myAnswer={q.my_answer}
          correctAnswer={q.correct_answer.toUpperCase()}
          dateAnswered={localizeDate(q.date_answered)}
        />
      </React.Fragment>
    );
  });

  const storiesRead = userActivities?.readStoryData?.map((story) => {
    const testId = story?.test_id ? story?.test_id : story.story_id;
    return (
      <React.Fragment key={story.story_id}>
        <StoriesCards
          image={story.book_cover}
          isRead={story.is_read}
          isTaken={story.is_taken}
          isLower={userData?.lexile - 100 > story.lexile}
          title={story.title}
          author={story.author}
          lexile={story.lexile}
          genre={story.genre}
          testId={story.test_id}
          read={`/archives/stories/${story.story_id}`}
          test={`/archives/tests/${testId}`}
          showLexileMessage={showLexileMessage}
          handleShowLexileMessage={handleShowLexileMessage}
          handleSelectedBook={handleSelectedBook}
        />
      </React.Fragment>
    );
  });

  const testsTaken = userActivities?.takenTestData?.map((t) => {
    return (
      <React.Fragment key={t.test_id}>
        <TestsCards
          image={t.book_cover}
          title={t.title}
          author={t.author}
          lexile={t.lexile}
          score={t.score}
          to={`/archives/tests/${t.test_id}`}
          testId={t.test_id}
          isTaken={t.is_taken}
          isLower={userData.lexile - 100 > t.lexile}
          showLexileMessage={showLexileMessage}
          handleShowLexileMessage={handleShowLexileMessage}
          handleSelectedBook={handleSelectedBook}
        />
      </React.Fragment>
    );
  });

  const achievementsAndRewards = userActivities?.achievementData?.map((reward) => {
    return (
      <React.Fragment key={reward.reward_id}>
        <RewardsCards
          image={reward.reward}
          title={reward.reward_name}
          type={reward.reward_type}
          isReceived={reward.is_received}
          to={`/archives/rewards/${reward.reward_id}`}
        />
      </React.Fragment>
    );
  });

  const loggedSessions = userActivities?.sessionsData?.map((s) => {
    return (
      <div className="p-5 rounded-2xl bg-accntColor text-left text-sm w-full" key={s.session_id}>
        <p>
          You <span className="font-semibold">{s.type === "in" ? "logged in" : "logged out"}</span>{" "}
          on <span className="font-semibold">{localizeDate(s.date_logged)}</span>.
        </p>
      </div>
    );
  });

  React.useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user, getUserData]);

  React.useEffect(() => {
    if (user) {
      getUserActivities();
    }
  }, [user, getUserActivities]);

  return (
    <div className="w-full p-5 cstm-flex-col bg-accntColor min-h-screen overflow-y-auto cstm-scrollbar justify-start gap-5">
      <ClientPageHeader mainHeader="Readefine" subHeader="Profile" />

      {showLexileMessage ? (
        <LowLexileTestMessage
          userLexile={userData.lexile}
          testLink={`/archives/tests/${selectedBook}`}
          handleShowLexileMessage={handleShowLexileMessage}
        />
      ) : null}

      {canEditGradeLevel ? (
        <EditGradeLevel
          handleCanEditGradeLevel={handleCanEditGradeLevel}
          gradeLevel={userData?.grade_level}
          getUserData={getUserData}
          lexile={userData?.lexile}
        />
      ) : null}

      {canEditMain ? (
        <EditMain getUserData={getUserData} handleCanEditMain={handleCanEditMain} />
      ) : null}

      <div className="cstm-w-limit cstm-flex-col gap-5 w-full">
        <MainProfile
          handleCanEditGradeLevel={handleCanEditGradeLevel}
          handleCanEditMain={handleCanEditMain}
          userData={userData}
        />

        <div className="cstm-flex-col gap-5 w-full text-center bg-white p-5 rounded-2xl">
          <p className="text-2xl font-extrabold t:mr-auto text-prmColor">Stories Read</p>

          <div className="cstm-flex-row gap-5 w-full overflow-x-auto cstm-scrollbar justify-start p-5">
            {storiesRead}
          </div>
        </div>

        <div className="cstm-flex-col gap-5 w-full text-center bg-white p-5 rounded-2xl ">
          <p className="text-2xl font-extrabold t:mr-auto text-prmColor">Tests Taken</p>

          <div className="cstm-flex-row gap-5 w-full overflow-x-auto cstm-scrollbar justify-start p-5">
            {testsTaken}
          </div>
        </div>

        <div className="cstm-flex-col gap-5 w-full text-center bg-white p-5 rounded-2xl">
          <p className="text-2xl font-extrabold t:mr-auto text-prmColor">Achievements & Rewards</p>

          <div className="cstm-flex-row gap-5 w-full overflow-x-auto cstm-scrollbar justify-start p-5">
            {achievementsAndRewards}
          </div>
        </div>

        <div className="cstm-flex-col gap-5 w-full text-center bg-white p-5 rounded-2xl">
          <p className="text-2xl font-extrabold t:mr-auto text-prmColor">Your Answers</p>

          <div className="cstm-flex-col gap-5 w-full t:cstm-flex-row">
            <ActivityCard label="Test Questions" activity={answeredQuestions} />

            <ActivityCard label="Dangle" activity={answeredDangle} />
          </div>

          <div className="cstm-flex-col gap-5 w-full t:cstm-flex-row">
            <ActivityCard label="Decipher" activity={answeredDecipher} />

            <ActivityCard label="Riddles" activity={answeredRiddles} />
          </div>
        </div>

        <div className="cstm-flex-col gap-5 w-full text-center bg-white p-5 rounded-2xl">
          <p className="text-2xl font-extrabold t:mr-auto text-prmColor">Your Sessions</p>

          <ActivityCard label="Logs" activity={loggedSessions} />
        </div>
      </div>
    </div>
  );
};

export default Reader;

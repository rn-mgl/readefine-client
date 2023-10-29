"use client";

import ClientPageHeader from "@/client/global/PageHeader";
import ActivityCard from "@/client/reader/ActivityCard";
import ActivityInCard from "@/client/reader/ActivityInCard";
import AnswersText from "@/client/reader/AnswersText";
import ChangePassword from "@/client/reader/ChangePassword";
import EditGradeLevel from "@/client/reader/EditGradeLevel";
import EditMain from "@/client/reader/EditMain";
import MainProfile from "@/client/reader/MainProfile";
import SessionText from "@/client/reader/SessionText";
import RewardsCards from "@/client/rewards/RewardsCards";
import StoriesCards from "@/client/stories/StoriesCards";
import LowLexileTestMessage from "@/client/tests/LowLexileTestMessage";
import TestRecord from "@/client/tests/TestRecord";
import TestsCards from "@/client/tests/TestsCards";
import Message from "@/components/global/Message";
import noReads from "@/public/profile/NoReads.svg";
import noReward from "@/public/profile/NoReward.svg";
import noTest from "@/public/profile/NoTest.svg";
import axios from "axios";
import React from "react";

import { useGlobalContext } from "@/base/context";
import { isTokenExpired } from "@/functions/jwtFns";
import { localizeDate } from "@/functions/localDate";
import { cipher, decipher } from "@/functions/security";
import { useMessage } from "@/hooks/useMessage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BsFillPenFill, BsFillSquareFill } from "react-icons/bs";
import { FaBrain } from "react-icons/fa";
import { TbPlusMinus } from "react-icons/tb";

const Reader = ({ params }) => {
  const [userData, setUserData] = React.useState({});
  const [userActivities, setUserActivities] = React.useState({});

  const [canEditMain, setCanEditMain] = React.useState(false);
  const [canEditGradeLevel, setCanEditGradeLevel] = React.useState(false);
  const [canChangePassword, setCanChangePassword] = React.useState(false);

  const [showLexileMessage, setShowLexileMessage] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState(-1);
  const [seeTestRecord, setSeeTestRecord] = React.useState(null);

  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decipheredId = decipher(params?.reader_id);
  const router = useRouter();

  // toggle can edit maini
  function handleCanEditMain() {
    setCanEditMain((prev) => !prev);
  }

  // toggle can edit grade level
  const handleCanEditGradeLevel = () => {
    setCanEditGradeLevel((prev) => !prev);
  };

  // toggle can show lexile message
  const handleShowLexileMessage = () => {
    setShowLexileMessage((prev) => !prev);
  };

  // track selected book for low lexile message
  const handleSelectedBook = (id) => {
    setSelectedBook(id);
  };

  // toggle see test record
  const handleSeeTestRecord = (id) => {
    setSeeTestRecord((prev) => (prev === id ? null : id));
  };

  // toggle can change password
  const handleCanChangePassword = () => {
    setCanChangePassword((prev) => !prev);
  };

  // get user data
  const getUserData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/user/${decipheredId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setUserData(data);
      }
    } catch (error) {
      console.log(error);

      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, decipheredId, setMessageStatus]);

  // get user activities
  const getUserActivities = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/activities/${decipheredId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setUserActivities(data);
      }
    } catch (error) {
      console.log(error);

      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, decipheredId, setMessageStatus]);

  // map answered questions
  const answeredQuestions = userActivities?.questionsData?.map((q) => {
    return (
      <React.Fragment key={q.answer_id}>
        <AnswersText
          question={q.question}
          myAnswer={q.my_answer}
          correctAnswer={q.correct_answer}
          dateAnswered={localizeDate(q.date_answered)}
          userImage={userData?.image}
          complementaryIcon={<BsFillPenFill className="scale-125" />}
        />
      </React.Fragment>
    );
  });

  // map answered dangle
  const answeredDangle = userActivities?.dangleData?.map((q) => {
    return (
      <React.Fragment key={q.answer_id}>
        <AnswersText
          duration={q.duration_seconds}
          myAnswer={q.answer}
          correctAnswer={q.word.toUpperCase()}
          dateAnswered={localizeDate(q.date_answered)}
          userImage={userData?.image}
          complementaryIcon={<BsFillSquareFill className="scale-125" />}
        />
      </React.Fragment>
    );
  });

  // map answered decipher
  const answeredDecipher = userActivities?.decipherData?.map((q) => {
    return (
      <React.Fragment key={q.answer_id}>
        <AnswersText
          duration={q.duration_seconds}
          myAnswer={q.answer}
          correctAnswer={q.word.toUpperCase()}
          dateAnswered={localizeDate(q.date_answered)}
          userImage={userData?.image}
          complementaryIcon={<TbPlusMinus className="scale-125" />}
        />
      </React.Fragment>
    );
  });

  // map answered riddles
  const answeredRiddles = userActivities?.riddlesData?.map((q) => {
    return (
      <React.Fragment key={q.answer_id}>
        <AnswersText
          question={q.riddle}
          myAnswer={q.my_answer}
          correctAnswer={q.correct_answer.toUpperCase()}
          dateAnswered={localizeDate(q.date_answered)}
          userImage={userData?.image}
          complementaryIcon={<FaBrain className="scale-125" />}
        />
      </React.Fragment>
    );
  });

  // map read stories
  const storiesRead = userActivities?.readStoryData?.map((story) => {
    const cipheredStoryId = cipher(story.story_id);
    const testId = story?.test_id ? story?.test_id : story.story_id;
    const cipheredTestId = cipher(testId);
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
          read={`/archives/stories/${cipheredStoryId}`}
          test={`/archives/tests/${cipheredTestId}`}
          showLexileMessage={showLexileMessage}
          handleShowLexileMessage={handleShowLexileMessage}
          handleSelectedBook={handleSelectedBook}
        />
      </React.Fragment>
    );
  });

  // map taken tests
  const testsTaken = userActivities?.takenTestData?.map((t) => {
    const cipheredTestId = cipher(t.test_id);
    return (
      <React.Fragment key={t.test_id}>
        <TestsCards
          image={t.book_cover}
          title={t.title}
          author={t.author}
          lexile={t.lexile}
          score={t.score}
          to={`/archives/tests/${cipheredTestId}`}
          testId={t.test_id}
          isTaken={t.is_taken}
          isLower={userData.lexile - 100 > t.lexile}
          showLexileMessage={showLexileMessage}
          handleShowLexileMessage={handleShowLexileMessage}
          handleSelectedBook={handleSelectedBook}
          handleSeeTestRecord={handleSeeTestRecord}
        />
      </React.Fragment>
    );
  });

  // map achievements and rewards
  const achievementsAndRewards = userActivities?.achievementData?.map((reward) => {
    const cipheredRewardId = cipher(reward.reward_id);
    return (
      <React.Fragment key={reward.reward_id}>
        <RewardsCards
          image={reward.reward}
          title={reward.reward_name}
          type={reward.reward_type}
          isReceived={reward.is_received}
          to={`/archives/rewards/${cipheredRewardId}`}
        />
      </React.Fragment>
    );
  });

  // map logged sessions
  const loggedSessions = userActivities?.sessionsData?.map((session) => {
    return (
      <React.Fragment key={session.session_id}>
        <SessionText
          sessionType={session.type === "in" ? "logged in" : "logged out"}
          userData={userData}
          dateLogged={localizeDate(session.date_logged)}
        />
      </React.Fragment>
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

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[1]);

      if (isExpired) {
        router.push("/login");
      }
    }
  }, [user, router]);

  return (
    <div
      className="w-full p-4 cstm-flex-col bg-accntColor min-h-screen overflow-y-auto 
                  cstm-scrollbar justify-start gap-4"
    >
      <ClientPageHeader mainHeader="Readefine" subHeader="Profile" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      {showLexileMessage ? (
        <LowLexileTestMessage
          userLexile={userData.lexile}
          testLink={`/archives/tests/${cipher(selectedBook)}`}
          handleShowLexileMessage={handleShowLexileMessage}
        />
      ) : null}

      {seeTestRecord ? <TestRecord testId={seeTestRecord} handleSeeTestRecord={handleSeeTestRecord} /> : null}

      {canEditGradeLevel ? (
        <EditGradeLevel
          handleCanEditGradeLevel={handleCanEditGradeLevel}
          gradeLevel={userData?.grade_level}
          getUserData={getUserData}
          lexile={userData?.lexile}
        />
      ) : null}

      {canEditMain ? <EditMain handleCanEditMain={handleCanEditMain} /> : null}

      {canChangePassword ? <ChangePassword handleCanChangePassword={handleCanChangePassword} /> : null}

      <div className="cstm-w-limit cstm-flex-col gap-4 w-full">
        <MainProfile
          handleCanEditGradeLevel={handleCanEditGradeLevel}
          handleCanEditMain={handleCanEditMain}
          handleCanChangePassword={handleCanChangePassword}
          userData={userData}
        />

        <div
          className="cstm-flex-col w-full bg-gradient-to-br
                    from-prmColor to-scndColor p-2 rounded-md"
        >
          <p className="font-semibold text-accntColor">Activity Log</p>
        </div>

        {/* read stories cards */}
        <ActivityInCard
          label="Stories Read"
          placeholder="You haven't read any books yet."
          tempImage={noReads}
          hasActivities={userActivities?.readStoryData?.length}
          activities={storiesRead}
        />

        {/* taken tests cards */}
        <ActivityInCard
          label="Tests Taken"
          placeholder="You haven't taken any tests yet."
          tempImage={noTest}
          hasActivities={userActivities?.takenTestData?.length}
          activities={testsTaken}
        />

        {/* achievement cards */}
        <ActivityInCard
          label="Achievements & Rewards"
          placeholder=" You haven't received any rewards yet."
          tempImage={noReward}
          hasActivities={userActivities?.achievementData?.length}
          activities={achievementsAndRewards}
        />

        {/* answers */}
        <div className="cstm-flex-col gap-4 w-full text-center bg-white p-4 rounded-2xl">
          <div
            className="cstm-flex-col w-full bg-gradient-to-br t:w-fit t:px-10 t:mr-auto
                    from-prmColor to-scndColor p-2 rounded-md"
          >
            <p className="font-semibold text-accntColor">Your Answers</p>
          </div>

          <div className="cstm-flex-col gap-4 w-full">
            <ActivityCard
              label="Test Questions"
              activity={answeredQuestions}
              hasContent={userActivities?.questionsData?.length}
              noContentMessage="You haven't answered any test questions yet."
            />

            <ActivityCard
              label="Dangle"
              activity={answeredDangle}
              hasContent={userActivities?.dangleData?.length}
              noContentMessage="You haven't played dangle yet."
            />

            <ActivityCard
              label="Decipher"
              activity={answeredDecipher}
              hasContent={userActivities?.decipherData?.length}
              noContentMessage="You haven't answered decipher yet."
            />

            <ActivityCard
              label="Riddles"
              activity={answeredRiddles}
              hasContent={userActivities?.riddlesData?.length}
              noContentMessage="You haven't answered riddles yet."
            />
          </div>
        </div>

        {/* session */}
        <div className="cstm-flex-col gap-4 w-full text-center bg-white p-4 rounded-2xl">
          <div
            className="cstm-flex-col w-full bg-gradient-to-br t:w-fit t:px-10 t:mr-auto
                    from-prmColor to-scndColor p-2 rounded-md"
          >
            <p className="font-semibold text-accntColor">Your Sessions</p>
          </div>

          <ActivityCard
            label="Logs"
            activity={loggedSessions}
            hasContent={userActivities?.sessionsData?.length}
            noContentMessage="You haven't logged in readefine yet."
          />
        </div>
      </div>
    </div>
  );
};

export default Reader;

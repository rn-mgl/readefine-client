"use client";

import React from "react";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import MainProfile from "@/src/src/client/reader/MainProfile";
import axios from "axios";
import EditMain from "@/src/src/client/reader/EditMain";
import EditGradeLevel from "@/src/src/client/reader/EditGradeLevel";
import AnswersText from "@/src/src/client/reader/AnswersText";
import ActivityCard from "@/src/src/client/reader/ActivityCard";
import StoriesCards from "@/src/src/client/stories/StoriesCards";
import TestsCards from "@/src/src/client/tests/TestsCards";
import LowLexileTestMessage from "@/src/src/client/tests/LowLexileTestMessage";
import RewardsCards from "@/src/src/client/rewards/RewardsCards";
import TestRecord from "@/src/src/client/tests/TestRecord";
import ChangePassword from "@/src/src/client/reader/ChangePassword";
import Image from "next/image";

import noReads from "../../../../public/profile/NoReads.svg";
import noTest from "../../../../public/profile/NoTest.svg";
import noReward from "../../../../public/profile/NoReward.svg";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { localizeDate } from "@/src/src/functions/localDate";
import { cipher, decipher } from "@/src/src/functions/security";
import { BsFillPenFill, BsFillSquareFill } from "react-icons/bs";
import { TbPlusMinus } from "react-icons/tb";
import { FaBrain } from "react-icons/fa";
import Message from "@/src/src/components/global/Message";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

const Reader = ({ params }) => {
  const [userData, setUserData] = React.useState({});
  const [userActivities, setUserActivities] = React.useState({});

  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

  const [canEditMain, setCanEditMain] = React.useState(false);
  const [canEditGradeLevel, setCanEditGradeLevel] = React.useState(false);
  const [canChangePassword, setCanChangePassword] = React.useState(false);

  const [showLexileMessage, setShowLexileMessage] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState(-1);
  const [seeTestRecord, setSeeTestRecord] = React.useState(null);

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
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setUserData, decipheredId]);

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
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setUserActivities, decipheredId]);

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
          complementaryIcon={<BsFillPenFill className="scale-150" />}
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
          complementaryIcon={<BsFillSquareFill className="scale-150" />}
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
          complementaryIcon={<TbPlusMinus className="scale-150" />}
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
          complementaryIcon={<FaBrain className="scale-150" />}
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
  const loggedSessions = userActivities?.sessionsData?.map((s) => {
    return (
      <div
        className="p-5 rounded-2xl bg-accntColor text-left text-sm w-full cstm-flex-row gap-2"
        key={s.session_id}
      >
        <div
          style={{ backgroundImage: userData?.image ? `url(${userData?.image})` : null }}
          className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] bg-center bg-cover rounded-full bg-prmColor bg-opacity-20"
        />
        <p className="w-full">
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

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[1]);

      if (isExpired) {
        router.push("/login");
      }
    }
  }, [user, router]);

  return (
    <div className="w-full p-5 cstm-flex-col bg-accntColor min-h-screen overflow-y-auto cstm-scrollbar justify-start gap-5">
      <ClientPageHeader mainHeader="Readefine" subHeader="Profile" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {showLexileMessage ? (
        <LowLexileTestMessage
          userLexile={userData.lexile}
          testLink={`/archives/tests/${cipher(selectedBook)}`}
          handleShowLexileMessage={handleShowLexileMessage}
        />
      ) : null}

      {seeTestRecord ? (
        <TestRecord testId={seeTestRecord} handleSeeTestRecord={handleSeeTestRecord} />
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

      {canChangePassword ? (
        <ChangePassword handleCanChangePassword={handleCanChangePassword} />
      ) : null}

      <div className="cstm-w-limit cstm-flex-col gap-5 w-full">
        <MainProfile
          handleCanEditGradeLevel={handleCanEditGradeLevel}
          handleCanEditMain={handleCanEditMain}
          handleCanChangePassword={handleCanChangePassword}
          userData={userData}
        />

        {/* read stories cards */}
        <div className="cstm-flex-col gap-5 w-full text-center bg-white p-5 rounded-2xl">
          <p className="text-xl font-extrabold t:mr-auto text-prmColor">Stories Read</p>

          <div className="cstm-flex-row gap-5 w-full overflow-x-auto cstm-scrollbar justify-start p-5">
            {userActivities?.readStoryData?.length ? (
              storiesRead
            ) : (
              <div className="cstm-flex-col w-full">
                <Image src={noReads} alt="empty" loading="lazy" width={240} draggable={false} />
                <p className="text-xs opacity-80">You haven&apos;t read any books yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* taken tests cards */}
        <div className="cstm-flex-col gap-5 w-full text-center bg-white p-5 rounded-2xl ">
          <p className="text-xl font-extrabold t:mr-auto text-prmColor">Tests Taken</p>

          <div className="cstm-flex-row gap-5 w-full overflow-x-auto cstm-scrollbar justify-start p-5">
            {userActivities?.takenTestData?.length ? (
              testsTaken
            ) : (
              <div className="cstm-flex-col w-full">
                <Image src={noTest} alt="empty" loading="lazy" width={220} draggable={false} />
                <p className="text-xs opacity-80">You haven&apos;t taken any tests yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* achievement cards */}
        <div className="cstm-flex-col gap-5 w-full text-center bg-white p-5 rounded-2xl">
          <p className="text-xl font-extrabold t:mr-auto text-prmColor">Achievements & Rewards</p>

          <div className="cstm-flex-row gap-5 w-full overflow-x-auto cstm-scrollbar justify-start p-5">
            {userActivities?.achievementData?.length ? (
              achievementsAndRewards
            ) : (
              <div className="cstm-flex-col w-full">
                <Image src={noReward} alt="empty" loading="lazy" width={220} draggable={false} />
                <p className="text-xs opacity-80">You haven&apos;t received any rewards yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* answers */}
        <div className="cstm-flex-col gap-5 w-full text-center bg-white p-5 rounded-2xl">
          <p className="text-xl font-extrabold t:mr-auto text-prmColor">Your Answers</p>

          <div className="cstm-flex-col gap-5 w-full">
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
        <div className="cstm-flex-col gap-5 w-full text-center bg-white p-5 rounded-2xl">
          <p className="text-2xl font-extrabold t:mr-auto text-prmColor">Your Sessions</p>

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

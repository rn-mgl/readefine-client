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

const Reader = () => {
  const [userData, setUserData] = React.useState({});
  const [userActivities, setUserActivities] = React.useState({});
  const [canEditMain, setCanEditMain] = React.useState(false);
  const [canEditGradeLevel, setCanEditGradeLevel] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const answeredQuestions = userActivities?.questionsData?.map((q) => {
    return (
      <React.Fragment key={q.answer_id}>
        <AnswersText
          question={q.question}
          myAnswer={q.my_answer}
          correctAnswer={q.correct_answer}
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
        />
      </React.Fragment>
    );
  });

  function handleCanEditMain() {
    setCanEditMain((prev) => !prev);
  }

  const handleCanEditGradeLevel = () => {
    setCanEditGradeLevel((prev) => !prev);
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

        <div className="cstm-flex-col gap-5 w-full text-center">
          <p className="text-2xl font-extrabold t:mr-auto">Your Answers</p>

          <div className="cstm-flex-col gap-5 w-full t:cstm-flex-row">
            <ActivityCard label="Test Questions" activity={answeredQuestions} />

            <ActivityCard label="Dangle" activity={answeredDangle} />
          </div>

          <div className="cstm-flex-col gap-5 w-full t:cstm-flex-row">
            <ActivityCard label="Decipher" activity={answeredDecipher} />

            <ActivityCard label="Riddles" activity={answeredRiddles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;

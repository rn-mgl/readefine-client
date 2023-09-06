"use client";

import axios from "axios";
import React from "react";
import EditMain from "@/src/src/admin/overview/EditMain";

import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import ActivityCard from "@/src/src/admin/overview/ActivityCard";
import MainOverview from "@/src/src/admin/overview/MainOverview";
import ActivityText from "@/src/src/admin/overview/ActivityText";
import ChangePassword from "@/src/src/admin/overview/ChangePassword";
import ComplementActivityText from "@/src/src/admin/overview/ComplementActivityText";
import Message from "@/src/src/components/global/Message";

import noGame from "../../../../public/profile/NoGame.svg";
import noReads from "../../../../public/profile/NoReads.svg";
import noReward from "../../../../public/profile/NoReward.svg";
import noTest from "../../../../public/profile/NoTest.svg";

import { decipher } from "@/src/src/functions/security";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { localizeDate } from "@/src/src/functions/localDate";
import { GiBrain, GiNotebook, GiSpellBook } from "react-icons/gi";
import { ImCheckmark } from "react-icons/im";
import { AiFillTrophy } from "react-icons/ai";
import { RxActivityLog } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import SessionText from "@/src/src/admin/overview/SessionText";
import { useLoading } from "@/src/src/hooks/useLoading";

const Overview = ({ params }) => {
  const [adminData, setAdminData] = React.useState({});
  const [adminActivities, setAdminActivities] = React.useState({});

  const [canEditMain, setCanEditMain] = React.useState(false);
  const [canChangePassword, setCanChangePassword] = React.useState(false);

  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

  const { loading, setLoadingState } = useLoading(true);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decipheredId = decipher(params?.admin_id);
  const router = useRouter();

  // toggle can edit main data
  const handleCanEditMain = () => {
    setCanEditMain((prev) => !prev);
  };

  // toggle can change password
  const handleCanChangePassword = () => {
    setCanChangePassword((prev) => !prev);
  };

  // get admin data
  const getAdminData = React.useCallback(async () => {
    setLoadingState(true);
    try {
      const { data } = await axios.get(`${url}/admin/${decipheredId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setAdminData(data);
        setLoadingState(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setAdminData, setLoadingState, decipheredId]);

  // get admin activities
  const getAdminActivies = React.useCallback(async () => {
    setLoadingState(true);
    try {
      const { data } = await axios.get(`${url}/admin_activities/${decipheredId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setAdminActivities(data);
        setLoadingState(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setAdminActivities, setLoadingState, decipheredId]);

  // map story activity
  const storyActivity = adminActivities?.storyData?.map((d, i) => {
    return (
      <React.Fragment key={i}>
        <ActivityText addedData={d.title} dateAdded={localizeDate(d.date_added)} userImage={adminData?.image} />
      </React.Fragment>
    );
  });

  // map story content
  const storyContentActivity = adminActivities?.storyContentData?.map((d, i) => {
    let text = "";

    // check the types of content the admin added
    if (d.content && d.header && d.image) {
      text = `content, header, and image`;
    } else if (d.content && d.header) {
      text = `content and header`;
    } else if (d.content) {
      text = `content`;
    } else if (d.header) {
      text = `header`;
    } else if (d.image) {
      text = `image`;
    }
    return (
      <React.Fragment key={i}>
        <ComplementActivityText
          date={localizeDate(d.date_added)}
          youAddedLabel={`You added ${text === "image" ? "an" : "a"}`}
          addedContent={text}
          complementaryLabel="On the story"
          complementaryContent={`${d.title} at page ${d.page}`}
          userImage={adminData?.image}
          complementaryIcon={<GiSpellBook className="scale-150" />}
        />
      </React.Fragment>
    );
  });

  // map test activity
  const testActivity = adminActivities?.testData?.map((d, i) => {
    return (
      <React.Fragment key={i}>
        <ActivityText addedData={d.title} dateAdded={localizeDate(d.date_added)} userImage={adminData?.image} />
      </React.Fragment>
    );
  });

  // map test questions
  const testQuestionsActivity = adminActivities?.testQuestionData?.map((q, i) => {
    return (
      <React.Fragment key={i}>
        <ComplementActivityText
          date={localizeDate(q.date_added)}
          youAddedLabel="You added the question"
          addedContent={q.question}
          complementaryLabel="On the test"
          complementaryContent={q.title}
          userImage={adminData?.image}
          complementaryIcon={<GiNotebook className="scale-150" />}
        />
      </React.Fragment>
    );
  });

  // map test answer
  const testAnswer = adminActivities?.testAnswerData?.map((a, i) => {
    return (
      <React.Fragment key={i}>
        <ComplementActivityText
          date={localizeDate(a.date_added)}
          youAddedLabel="You added the answer"
          addedContent={a.answer}
          complementaryLabel="On the question"
          complementaryContent={a.question}
          userImage={adminData?.image}
          complementaryIcon={<ImCheckmark className="scale-150" />}
        />
      </React.Fragment>
    );
  });

  // map achievement activity
  const achievementActivity = adminActivities?.achievementData?.map((d, i) => {
    return (
      <React.Fragment key={i}>
        <ActivityText
          addedData={d.achievement_name}
          dateAdded={localizeDate(d.date_added)}
          userImage={adminData?.image}
        />
      </React.Fragment>
    );
  });

  // map reward activity
  const rewardActivity = adminActivities?.rewardData?.map((r, i) => {
    return (
      <React.Fragment key={i}>
        <ComplementActivityText
          date={localizeDate(r.date_added)}
          youAddedLabel="You added the reward"
          addedContent={r.reward_name}
          complementaryLabel="For the achievement"
          complementaryContent={r.achievement_name}
          userImage={adminData?.image}
          complementaryIcon={<AiFillTrophy className="scale-150" />}
        />
      </React.Fragment>
    );
  });

  // map riddles activity
  const riddlesActivity = adminActivities?.riddlesData?.map((r, i) => {
    return (
      <React.Fragment key={i}>
        <ComplementActivityText
          date={localizeDate(r.date_added)}
          youAddedLabel="You added the riddle"
          addedContent={r.riddle}
          complementaryLabel="With the answer"
          complementaryContent={r.answer}
          userImage={adminData?.image}
          complementaryIcon={<GiBrain className="scale-150" />}
        />
      </React.Fragment>
    );
  });

  // map session activity
  const sessionActivity = adminActivities?.sessionData?.map((s, i) => {
    return (
      <React.Fragment key={s.session_id}>
        <SessionText
          sessionType={session.type === "in" ? "logged in" : "logged out"}
          adminData={adminData}
          dateLogged={localizeDate(session.date_logged)}
        />
      </React.Fragment>
    );
  });

  React.useEffect(() => {
    if (user) {
      getAdminData();
    }
  }, [user, getAdminData]);

  React.useEffect(() => {
    if (user) {
      getAdminActivies();
    }
  }, [user, getAdminActivies]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="w-full min-h-screen bg-accntColor p-5 cstm-flex-col justify-start cstm-scrollbar gap-5">
      <AdminPageHeader mainHeader="Overview" subHeader="Readefine" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {canEditMain ? <EditMain adminId={user?.adminId} handleCanEditMain={handleCanEditMain} /> : null}

      {canChangePassword ? <ChangePassword handleCanChangePassword={handleCanChangePassword} /> : null}

      <div className="cstm-flex-col cstm-scrollbar cstm-w-limit w-full gap-5">
        <MainOverview
          adminData={adminData}
          handleCanEditMain={handleCanEditMain}
          handleCanChangePassword={handleCanChangePassword}
        />

        <div className="text-xl font-extrabold t:mr-auto cstm-flex-row gap-5">
          <RxActivityLog /> Activity Log <RxActivityLog className="-scale-x-100" />
        </div>

        <div className="cstm-flex-col justify-start gap-5 t:gap-10 w-full">
          <ActivityCard
            label="Story"
            activity={storyActivity}
            isEmpty={adminActivities?.storyData?.length === 0}
            fillerImage={noReads}
            fillerText="No activities found on stories."
            loading={loading}
          />

          <ActivityCard
            label="Story Content"
            activity={storyContentActivity}
            isEmpty={adminActivities?.storyData?.length === 0}
            fillerImage={noReads}
            fillerText="No activities found on story content."
            loading={loading}
          />

          <ActivityCard
            label="Test"
            activity={testActivity}
            isEmpty={adminActivities?.testData?.length === 0}
            fillerImage={noTest}
            fillerText="No activities found on tests."
            loading={loading}
          />

          <ActivityCard
            label="Test Questions"
            activity={testQuestionsActivity}
            isEmpty={adminActivities?.testQuestionData?.length === 0}
            fillerImage={noTest}
            fillerText="No activities found on test questions."
            loading={loading}
          />

          <ActivityCard
            label="Test Answers"
            activity={testAnswer}
            isEmpty={adminActivities?.testAnswerData?.length === 0}
            fillerImage={noTest}
            fillerText="No activities found on test answers."
            loading={loading}
          />

          <ActivityCard
            label="Achievements"
            activity={achievementActivity}
            isEmpty={adminActivities?.achievementData?.length === 0}
            fillerImage={noReward}
            fillerText="No activities found on achievements."
            loading={loading}
          />

          <ActivityCard
            label="Rewards"
            activity={rewardActivity}
            isEmpty={adminActivities?.rewardData?.length === 0}
            fillerImage={noReward}
            fillerText="No activities found on rewards."
            loading={loading}
          />

          <ActivityCard
            label="Riddles"
            activity={riddlesActivity}
            isEmpty={adminActivities?.riddlesData?.length === 0}
            fillerImage={noGame}
            fillerText="No activities found on riddles."
            loading={loading}
          />

          <ActivityCard
            label="Sessions"
            activity={sessionActivity}
            isEmpty={adminActivities?.riddlesData?.length === 0}
            fillerImage={noGame}
            fillerText="No sessions found."
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;

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

import { decipher } from "@/src/src/functions/security";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { localizeDate } from "@/src/src/functions/localDate";
import { GiBrain, GiNotebook, GiSpellBook } from "react-icons/gi";
import { ImCheckmark } from "react-icons/im";
import { AiFillTrophy } from "react-icons/ai";
import { RxActivityLog } from "react-icons/rx";

const Overview = ({ params }) => {
  const [adminData, setAdminData] = React.useState({});
  const [adminActivities, setAdminActivities] = React.useState({});
  const [canEditMain, setCanEditMain] = React.useState(false);
  const [canChangePassword, setCanChangePassword] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decipheredId = decipher(params?.admin_id);

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
    try {
      const { data } = await axios.get(`${url}/admin/${decipheredId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setAdminData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, setAdminData, decipheredId]);

  // get admin activities
  const getAdminActivies = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_activities/${decipheredId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setAdminActivities(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, setAdminActivities, decipheredId]);

  // map story activity
  const storyActivity = adminActivities?.storyData?.map((d, i) => {
    return (
      <React.Fragment key={i}>
        <ActivityText
          addedData={d.title}
          dateAdded={localizeDate(d.date_added)}
          userImage={adminData?.image}
        />
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
        <ActivityText
          addedData={d.title}
          dateAdded={localizeDate(d.date_added)}
          userImage={adminData?.image}
        />
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

  return (
    <div className="w-full min-h-screen bg-accntColor p-5 cstm-flex-col justify-start cstm-scrollbar gap-5">
      <AdminPageHeader mainHeader="Overview" subHeader="Readefine" />

      {canEditMain ? (
        <EditMain
          getAdminData={getAdminData}
          adminId={user?.adminId}
          handleCanEditMain={handleCanEditMain}
        />
      ) : null}

      {canChangePassword ? (
        <ChangePassword handleCanChangePassword={handleCanChangePassword} />
      ) : null}

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
          <ActivityCard label="Story" activity={storyActivity} />

          <ActivityCard label="Story Content" activity={storyContentActivity} />

          <ActivityCard label="Test" activity={testActivity} />

          <ActivityCard label="Test Questions" activity={testQuestionsActivity} />

          <ActivityCard label="Test Answers" activity={testAnswer} />

          <ActivityCard label="Achievements" activity={achievementActivity} />

          <ActivityCard label="Rewards" activity={rewardActivity} />

          <ActivityCard label="Riddles" activity={riddlesActivity} />
        </div>
      </div>
    </div>
  );
};

export default Overview;

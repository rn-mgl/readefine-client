"use client";

import axios from "axios";
import React from "react";
import EditMain from "@/src/src/admin/overview/EditMain";

import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import ActivityCard from "@/src/src/admin/overview/ActivityCard";
import MainOverview from "@/src/src/admin/overview/MainOverview";
import ActivityText from "@/src/src/admin/overview/ActivityText";
import ChangePassword from "@/src/src/admin/overview/ChangePassword";

import { BsDot } from "react-icons/bs";
import { decipher } from "@/src/src/functions/security";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { localizeDate } from "@/src/src/functions/localDate";

const Overview = ({ params }) => {
  const [adminData, setAdminData] = React.useState({});
  const [adminActivities, setAdminActivities] = React.useState({});
  const [canEditMain, setCanEditMain] = React.useState(false);
  const [canChangePassword, setCanChangePassword] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decipheredId = decipher(params?.admin_id);

  const handleCanEditMain = () => {
    setCanEditMain((prev) => !prev);
  };

  const handleCanChangePassword = () => {
    setCanChangePassword((prev) => !prev);
  };

  const storyActivity = adminActivities?.storyData?.map((d, i) => {
    return (
      <React.Fragment key={i}>
        <ActivityText addedData={d.title} dateAdded={localizeDate(d.date_added)} />
      </React.Fragment>
    );
  });

  const storyContentActivity = adminActivities?.storyContentData?.map((d, i) => {
    let text = "";

    if (d.content && d.header && d.image) {
      text = `a content, header, and image`;
    } else if (d.content && d.header) {
      text = `a content and header`;
    } else if (d.content) {
      text = `a content`;
    } else if (d.header) {
      text = `a header`;
    } else if (d.image) {
      text = `an image`;
    }
    return (
      <React.Fragment key={i}>
        <div className="cstm-flex-col items-start gap-2 w-full text-sm bg-accntColor p-5 rounded-2xl relative">
          <p className="text-xs font-semibold">{localizeDate(d.date_added)}</p>
          <div className="cstm-flex-row gap-2 justify-start">
            <div>
              <BsDot className="scale-[2]" />
            </div>

            <p>
              You added <span className="text-prmColor font-bold">{text}</span> on the story{" "}
              <span className="text-prmColor font-bold">{d.title}</span>.
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  });

  const testActivity = adminActivities?.testData?.map((d, i) => {
    return (
      <React.Fragment key={i}>
        <ActivityText addedData={d.title} dateAdded={localizeDate(d.date_added)} />
      </React.Fragment>
    );
  });

  const testQuestionsActivity = adminActivities?.testQuestionData?.map((q, i) => {
    return (
      <React.Fragment key={i}>
        <div className="cstm-flex-col items-start gap-2 w-full text-sm bg-accntColor p-5 rounded-2xl relative">
          <p className="text-xs font-semibold">{localizeDate(q.date_added)}</p>
          <div className="cstm-flex-row gap-2 justify-start">
            <div>
              <BsDot className="scale-[2]" />
            </div>

            <p>
              You added the question <span className="text-prmColor font-bold">{q.question}</span>{" "}
              on the test <span className="text-prmColor font-bold">{q.title}</span>.
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  });

  const testAnswer = adminActivities?.testAnswerData?.map((a, i) => {
    return (
      <React.Fragment key={i}>
        <div className="cstm-flex-col items-start gap-2 w-full text-sm bg-accntColor p-5 rounded-2xl relative">
          <p className="text-xs font-semibold">{localizeDate(a.date_added)}</p>
          <div className="cstm-flex-row gap-2 justify-start">
            <div>
              <BsDot className="scale-[2]" />
            </div>

            <p>
              You added the answer <span className="text-prmColor font-bold">{a.answer}</span> on
              the question <span className="text-prmColor font-bold">{a.question}</span>.
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  });

  const achievementActivity = adminActivities?.achievementData?.map((d, i) => {
    return (
      <React.Fragment key={i}>
        <ActivityText addedData={d.achievement_name} dateAdded={localizeDate(d.date_added)} />
      </React.Fragment>
    );
  });

  const rewardActivity = adminActivities?.rewardData?.map((r, i) => {
    return (
      <React.Fragment key={i}>
        <div className="cstm-flex-col items-start gap-2 w-full text-sm bg-accntColor p-5 rounded-2xl relative">
          <p className="text-xs font-semibold">{localizeDate(r.date_added)}</p>
          <div className="cstm-flex-row gap-2 justify-start">
            <div>
              <BsDot className="scale-[2]" />
            </div>

            <p>
              You added <span className="text-prmColor font-bold">{r.reward_name}</span> for the
              achievement <span className="text-prmColor font-bold">{r.achievement_name}</span>.
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  });

  const riddlesActivity = adminActivities?.riddlesData?.map((r, i) => {
    return (
      <React.Fragment key={i}>
        <div className="cstm-flex-col items-start gap-2 w-full text-sm bg-accntColor p-5 rounded-2xl relative">
          <p className="text-xs font-semibold">{localizeDate(r.date_added)}</p>
          <div className="cstm-flex-row gap-2 justify-start">
            <div>
              <BsDot className="scale-[2]" />
            </div>

            <p>
              You added the <span className="text-prmColor font-bold">{r.riddle}</span> with the
              answer <span className="text-prmColor font-bold">{r.answer}</span>.
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  });

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

        <p className="text-2xl font-extrabold t:mr-auto">Your Activities</p>

        <div className="cstm-flex-col justify-start gap-5 w-full t:cstm-flex-row">
          <ActivityCard label="Story" activity={storyActivity} />

          <ActivityCard label="Story Content" activity={storyContentActivity} />
        </div>

        <div className="cstm-flex-col justify-start gap-5 w-full t:cstm-flex-row">
          <ActivityCard label="Test" activity={testActivity} />

          <ActivityCard label="Test Questions" activity={testQuestionsActivity} />
        </div>

        <div className="cstm-flex-col justify-start gap-5 w-full t:cstm-flex-row">
          <ActivityCard label="Test Answers" activity={testAnswer} />

          <ActivityCard label="Achievements" activity={achievementActivity} />
        </div>

        <div className="cstm-flex-col justify-start gap-5 w-full t:cstm-flex-row">
          <ActivityCard label="Rewards" activity={rewardActivity} />

          <ActivityCard label="Riddles" activity={riddlesActivity} />
        </div>
      </div>
    </div>
  );
};

export default Overview;

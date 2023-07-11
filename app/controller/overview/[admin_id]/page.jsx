"use client";

import axios from "axios";
import React from "react";
import EditMain from "@/src/src/admin/overview/EditMain";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import { BsDot } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { localizeDate } from "@/src/src/functions/localDate";
import ActivityCard from "@/src/src/admin/overview/ActivityCard";
import MainOverview from "@/src/src/admin/overview/MainOverview";
import ActivityText from "@/src/src/admin/overview/ActivityText";

const Overview = () => {
  const [adminData, setAdminData] = React.useState({});
  const [adminActivities, setAdminActivities] = React.useState({});
  const [canEditMain, setCanEditMain] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

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
      text = `a content, header, and image on the story ${d.title} at page ${d.page}`;
    } else if (d.content && d.header) {
      text = `a content and header on the story ${d.title} at page ${d.page}`;
    } else if (d.content) {
      text = `a content on the story ${d.title} at page ${d.page}`;
    } else if (d.header) {
      text = `a header on the story ${d.title} at page ${d.page}`;
    } else if (d.image) {
      text = `an image on the story ${d.title} at page ${d.page}`;
    }
    return (
      <React.Fragment key={i}>
        <ActivityText addedData={text} dateAdded={localizeDate(d.date_added)} />
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

  const testAnswer = adminActivities?.testAnswerData?.map((d, i) => {
    return (
      <React.Fragment key={i}>
        <ActivityText
          addedData={`${d.answer} as an answer on to ${d.question}`}
          dateAdded={localizeDate(d.date_added)}
        />
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

  const rewardActivity = adminActivities?.rewardData?.map((d, i) => {
    return (
      <React.Fragment key={i}>
        <ActivityText
          addedData={`${d.reward_name} for the achievement ${d.achievement_name}`}
          dateAdded={localizeDate(d.date_added)}
        />
      </React.Fragment>
    );
  });

  const riddlesActivity = adminActivities?.riddlesData?.map((d, i) => {
    return (
      <React.Fragment key={i}>
        <ActivityText
          addedData={`${d.riddle} with the answer ${d.answer}`}
          dateAdded={localizeDate(d.date_added)}
        />
      </React.Fragment>
    );
  });

  const handleCanEditMain = () => {
    setCanEditMain((prev) => !prev);
  };

  const getAdminData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin/${user?.adminId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setAdminData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, setAdminData]);

  const getAdminActivies = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_activities/${user?.adminId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setAdminActivities(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, setAdminActivities]);

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

  console.log(adminActivities);

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

      <div className="cstm-flex-col cstm-scrollbar cstm-w-limit w-full gap-5">
        <MainOverview adminData={adminData} handleCanEditMain={handleCanEditMain} />

        <p className="text-2xl font-extrabold t:mr-auto">Your Activities</p>

        <div className="cstm-flex-col justify-start gap-5 w-full t:cstm-flex-row">
          <ActivityCard label="Story" activity={storyActivity} />

          <ActivityCard label="Story Content" activity={storyContentActivity} />
        </div>

        <div className="cstm-flex-col justify-start gap-5 w-full t:cstm-flex-row">
          <ActivityCard label="Test" activity={testActivity} />

          <ActivityCard label="Test Questions" activity={achievementActivity} />
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

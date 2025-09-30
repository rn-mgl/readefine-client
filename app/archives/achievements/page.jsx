"use client";
import React, { Suspense } from "react";
import AchievementsFilter from "@/client/achievements/AchievementsFilter";
import ClientPageHeader from "@/client/global/PageHeader";
import axios from "axios";
import AchievementPanel from "@/client/achievements/AchievementPanel";
import Message from "@/components/global/Message";
import Image from "next/image";

import noReward from "@/public/profile/NoReward.svg";

import { useSession } from "next-auth/react";

import { typeConversion } from "@/functions/typeConversion";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useMessage } from "@/hooks/useMessage";
import { useAchievementFilters } from "@/hooks/useAchievementFilters";

const ClientAchievements = () => {
  const [achievements, setAchievements] = React.useState([]);

  const { message, setMessageStatus } = useMessage();
  const {
    typeFilter,
    goalRangeFilter,
    searchFilter,
    sortFilter,
    handleSearchFilter,
    handleGoalRangeFilter,
    handleSortFilter,
    handleTypeFilter,
  } = useAchievementFilters();

  const { data: session } = useSession({ required: true });
  const user = session?.user;
  const url = process.env.API_URL;
  const router = useRouter();

  // get achievements
  const getAchievement = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/user_achievement`, {
        headers: { Authorization: user.token },
        params: {
          searchFilter,
          goalRangeFilter,
          sortFilter,
          typeFilter,
        },
      });

      if (data) {
        setAchievements(data);
      }
    } catch (error) {
      console.log(error);

      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [
    url,
    user?.token,
    searchFilter,
    goalRangeFilter,
    sortFilter,
    typeFilter,
    setMessageStatus,
  ]);

  // map achievements
  const achievementPanels = achievements.map((a) => {
    return (
      <React.Fragment key={a.achievement_id}>
        <AchievementPanel
          title={a.achievement_name}
          task={a.task}
          points={a.points}
          goal={a.goal}
          type={typeConversion[a.achievement_type]}
          to={`/archives/achievements/${a.achievement_id}`}
        />
      </React.Fragment>
    );
  });

  React.useEffect(() => {
    if (user) {
      getAchievement();
    }
  }, [user, getAchievement]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[1]);

      if (isExpired) {
        router.push("/login");
      }
    }
  }, [user, router]);

  return (
    <div className="p-4 bg-accntColor w-full min-h-screen h-full cstm-flex-col gap-4 justify-start overflow-hidden">
      <ClientPageHeader mainHeader="Readefine" subHeader="Achievements" />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <AchievementsFilter
        searchFilter={searchFilter}
        goalRangeFilter={goalRangeFilter}
        sortFilter={sortFilter}
        typeFilter={typeFilter}
        handleSearchFilter={handleSearchFilter}
        handleGoalRangeFilter={handleGoalRangeFilter}
        handleSortFilter={handleSortFilter}
        handleTypeFilter={handleTypeFilter}
      />

      <div className="w-full cstm-flex-col gap-4  relative ">
        {achievements.length ? (
          <div
            className="w-full overflow-y-auto cstm-scrollbar cstm-flex-col gap-4 justify-start 
                      t:items-start p-4 bg-white rounded-2xl relative"
          >
            {achievementPanels}
          </div>
        ) : (
          <div className="cstm-flex-col absolute top-2/4 translate-y-2/4 left-2/4 -translate-x-2/4 w-full">
            <Image
              src={noReward}
              alt="empty"
              priority
              width={220}
              draggable={false}
            />
            <p className="text-xs opacity-80">No Achievements Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientAchievements;

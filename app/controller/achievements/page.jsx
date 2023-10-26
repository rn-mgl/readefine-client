"use client";
import React from "react";
import AdminPageHeader from "@/admin/global/PageHeader";
import AchievementsFilter from "@/admin/achievements/AchievementsFilter";
import axios from "axios";
import Link from "next/link";
import AchievementsCards from "@/admin/achievements/AchievementsCards";
import Message from "@/components/global/Message";
import Image from "next/image";

import noReward from "@/public/profile/NoReward.svg";

import { IoAddOutline } from "react-icons/io5";
import { typeConversion } from "@/functions/typeConversion";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/base/context";
import { cipher } from "@/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useMessage } from "@/hooks/useMessage";
import { useAchievementFilters } from "@/hooks/useAchievementFilters";
import useAdminActivities from "@/src/hooks/useAdminActivities";

const AdminAchievements = () => {
  const [achievements, setAchievements] = React.useState([]);

  const { message, setMessageStatus } = useMessage();
  const {
    typeFilter,
    goalRangeFilter,
    searchFilter,
    sortFilter,
    dateRangeFilter,
    handleSearchFilter,
    handleDateRangeFilter,
    handleGoalRangeFilter,
    handleSortFilter,
    handleTypeFilter,
  } = useAchievementFilters();

  const { createAdminActivity } = useAdminActivities();

  const { data: session } = useSession({ required: true });
  const user = session?.user?.name;
  const { url } = useGlobalContext();
  const router = useRouter();

  // get achievement data
  const getAchievement = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_achievement`, {
        headers: { Authorization: user?.token },
        params: {
          searchFilter,
          goalRangeFilter,
          sortFilter,
          dateRangeFilter,
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
  }, [url, user?.token, searchFilter, goalRangeFilter, sortFilter, dateRangeFilter, typeFilter, setMessageStatus]);

  // map achievement cards
  const achievementCards = achievements.map((a) => {
    const cipheredAchievementId = cipher(a.achievement_id);

    return (
      <React.Fragment key={a.achievement_id}>
        <AchievementsCards
          image={a.reward}
          title={a.achievement_name}
          type={typeConversion[a.achievement_type]}
          task={a.task}
          goal={a.goal}
          to={`/controller/achievements/${cipheredAchievementId}`}
          createAdminActivity={async () => await createAdminActivity("achievement", a.achievement_name, "R")}
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
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="p-4 bg-accntColor w-full min-h-screen cstm-flex-col gap-4 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Achievements & Tasks" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <div className="w-full cstm-flex-col gap-4 cstm-w-limit">
        <AchievementsFilter
          typeFilter={typeFilter}
          searchFilter={searchFilter}
          goalRangeFilter={goalRangeFilter}
          sortFilter={sortFilter}
          dateRangeFilter={dateRangeFilter}
          handleSearchFilter={handleSearchFilter}
          handleDateRangeFilter={handleDateRangeFilter}
          handleGoalRangeFilter={handleGoalRangeFilter}
          handleSortFilter={handleSortFilter}
          handleTypeFilter={handleTypeFilter}
        />

        <Link href="/controller/achievements/add" className="cstm-bg-hover mr-auto p-2 w-fit">
          <IoAddOutline className="text-prmColor cursor-pointer scale-150" />
        </Link>

        <div className="w-full cstm-flex-col flex-wrap gap-4 relative t:items-start t:cstm-flex-row">
          {achievements.length ? (
            achievementCards
          ) : (
            <div className="cstm-flex-col absolute top-2/4 translate-y-2/4 left-2/4 -translate-x-2/4 w-full">
              <Image src={noReward} alt="empty" priority width={220} draggable={false} />
              <p className="text-xs opacity-80">No Achievements Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAchievements;

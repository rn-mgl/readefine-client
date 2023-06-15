"use client";
import React from "react";
import AdminPageHeader from "../../../src/admin/global/PageHeader";
import AchievementsFilter from "@/src/src/admin/achievements/AchievementsFilter";
import axios from "axios";
import Link from "next/link";

import { IoAddOutline } from "react-icons/io5";
import { specificsConversion, typeConversion } from "@/src/src/functions/typeConversion";
import { inputDate } from "@/src/src/functions/localDate";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import AchievementsCards from "@/src/src/admin/achievements/AchievementsCards";

const ClientAchievements = () => {
  const [achievements, setAchievements] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState({
    toSearch: "achievement_name",
    searchKey: "",
  });
  const [goalRangeFilter, setGoalRangeFilter] = React.useState({ from: 0, to: 1250 });
  const [sortFilter, setSortFilter] = React.useState({
    toSort: "achievement_name",
    sortMode: "ASC",
  });
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "",
    to: inputDate(new Date().toLocaleDateString()),
  });
  const { data: session } = useSession({ required: true });

  const user = session?.user?.name;
  const { url } = useGlobalContext();

  const handleSearchFilter = ({ name, value }) => {
    setSearchFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleDateRangeFilter = ({ name, value }) => {
    setDateRangeFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleGoalRangeFilter = ({ name, value }) => {
    setGoalRangeFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSortFilter = ({ name, value }) => {
    setSortFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const achievementCards = achievements.map((a) => {
    return (
      <React.Fragment key={a.achievement_id}>
        <AchievementsCards
          image={a.reward}
          title={a.achievement_name}
          type={typeConversion[a.achievement_type]}
          specifics={specificsConversion[a.specifics]}
          task={a.task}
          goal={a.goal}
          to={`/controller/achievements/${a.achievement_id}`}
        />
      </React.Fragment>
    );
  });

  const getAchievement = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/achievement`, {
        headers: { Authorization: user.token },
        params: {
          searchFilter,
          goalRangeFilter,
          sortFilter,
          dateRangeFilter,
        },
      });

      if (data) {
        setAchievements(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, setAchievements, searchFilter, goalRangeFilter, sortFilter, dateRangeFilter]);

  React.useEffect(() => {
    if (user) {
      getAchievement();
    }
  }, [user, getAchievement]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Achievements & Tasks" />

      <div
        className="w-full     cstm-flex-col gap-2
        cstm-w-limit"
      >
        <AchievementsFilter
          handleSearchFilter={handleSearchFilter}
          handleDateRangeFilter={handleDateRangeFilter}
          handleGoalRangeFilter={handleGoalRangeFilter}
          handleSortFilter={handleSortFilter}
          searchFilter={searchFilter}
          goalRangeFilter={goalRangeFilter}
          sortFilter={sortFilter}
          dateRangeFilter={dateRangeFilter}
        />

        <Link href="/controller/achievements/add" className="cstm-bg-hover mr-auto p-2 w-fit">
          <IoAddOutline className="text-prmColor cursor-pointer scale-150" />
        </Link>

        <div className="w-full cstm-flex-col gap-5 t:items-start t:cstm-flex-row">
          {achievementCards}
        </div>
      </div>
    </div>
  );
};

export default ClientAchievements;

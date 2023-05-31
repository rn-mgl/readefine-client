"use client";
import React from "react";
import AdminPageHeader from "../../../src/admin/global/PageHeader";
import DashboardCardImage6 from "../../../public/DashboardCardImage6.svg";
import AchievementsFilter from "@/src/src/admin/achievements/AchievementsFilter";
import AchievementsCards from "@/src/src/admin/achievements/AchievementsCards";
import { inputDate } from "@/src/src/functions/localDate";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import axios from "axios";
import { typeConversion } from "@/src/src/functions/typeConversion";

const AdminAchievements = () => {
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

  const achievementsCards = achievements.map((achievement) => {
    return (
      <React.Fragment key={achievement.achievement_id}>
        <AchievementsCards
          image={DashboardCardImage6}
          title={achievement.achievement_name}
          type={typeConversion[achievement.achievement_type]}
          goal={achievement.goal}
          to={`/controller/achievements/${achievement.achievement_id}`}
        />
      </React.Fragment>
    );
  });

  const getAchievement = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_achievement`, {
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
        className="w-full     
                  l-s:w-[70%] l-s:ml-auto
                  l-l:w-[80%]"
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
        <div
          className="cstm-flex-col gap-5 justify-start w-full transition-all 
                  t:cstm-flex-row t:flex-wrap"
        >
          {achievementsCards}
        </div>
      </div>
    </div>
  );
};

export default AdminAchievements;

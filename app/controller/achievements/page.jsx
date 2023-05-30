"use client";
import React from "react";
import AdminPageHeader from "../../../src/admin/global/PageHeader";
import DashboardCardImage6 from "../../../public/DashboardCardImage6.svg";
import AchievementsFilter from "@/src/components/src/admin/achievements/AchievementsFilter";
import AchievementsCards from "@/src/components/src/admin/achievements/AchievementsCards";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/components/context";
import axios from "axios";

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
  const [dateRangeFilter, setDateRangeFilter] = React.useState({ from: "", to: new Date() });
  const { data: session } = useSession({ required: true });

  const user = session?.user?.name;
  const { url } = useGlobalContext();
  const router = useRouter();

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
          type={achievement.achievement_type}
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
        className="w-full     
                  l-s:w-[70%] l-s:ml-auto
                  l-l:w-[80%]"
      >
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

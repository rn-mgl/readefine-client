"use client";
import React, { Suspense } from "react";
import AchievementsFilter from "@/src/src/components/achievements/AchievementsFilter";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import axios from "axios";
import AchievementPanel from "@/src/src/client/achievements/AchievementPanel";
import Message from "@/src/src/components/global/Message";

import { inputDate } from "@/src/src/functions/localDate";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";

const ClientAchievements = () => {
  const [achievements, setAchievements] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState({
    toSearch: "achievement_name",
    searchKey: "",
  });
  const [goalRangeFilter, setGoalRangeFilter] = React.useState({ from: 0, to: 1250 });
  const [message, setMessage] = React.useState({ msg: "", active: false });
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

  const achievementPanels = achievements.map((a) => {
    return (
      <React.Fragment key={a.achievement_id}>
        <AchievementPanel
          title={a.achievement_name}
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
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, setAchievements, searchFilter, goalRangeFilter, sortFilter, dateRangeFilter]);

  React.useEffect(() => {
    if (user) {
      getAchievement();
    }
  }, [user, getAchievement]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <ClientPageHeader mainHeader="Readefine" subHeader="Achievements" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      <div className="w-full cstm-flex-col gap-2 cstm-w-limit">
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

        <div className="w-full overflow-y-auto cstm-scrollbar cstm-flex-col p-2 gap-5 justify-start t:items-start t:cstm-flex-row t:p-5 bg-white rounded-md min-h-[75vh]">
          <Suspense fallback={<p>Loading...</p>}> {achievementPanels}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default ClientAchievements;

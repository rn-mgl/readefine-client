"use client";
import React, { Suspense } from "react";
import AchievementsFilter from "@/src/src/client/achievements/AchievementsFilter";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import axios from "axios";
import AchievementPanel from "@/src/src/client/achievements/AchievementPanel";
import Message from "@/src/src/components/global/Message";
import Image from "next/image";

import noReward from "../../../public/profile/NoReward.svg";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { typeConversion } from "@/src/src/functions/typeConversion";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

const ClientAchievements = () => {
  const [achievements, setAchievements] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

  const [typeFilter, setTypeFilter] = React.useState("");
  const [goalRangeFilter, setGoalRangeFilter] = React.useState({ from: 0, to: 1250 });
  const [searchFilter, setSearchFilter] = React.useState({
    toSearch: "achievement_name",
    searchKey: "",
  });
  const [sortFilter, setSortFilter] = React.useState({
    toSort: "achievement_name",
    sortMode: "ASC",
  });

  const { data: session } = useSession({ required: true });
  const user = session?.user?.name;
  const { url } = useGlobalContext();
  const router = useRouter();

  // handle onchange search filter
  const handleSearchFilter = ({ name, value }) => {
    setSearchFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle onchange on range filter
  const handleGoalRangeFilter = ({ name, value }) => {
    setGoalRangeFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle onchange on sort filter
  const handleSortFilter = ({ name, value }) => {
    setSortFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle onchange on type filter
  const handleTypeFilter = ({ value }) => {
    setTypeFilter(value);
  };

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

      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, searchFilter, goalRangeFilter, sortFilter, typeFilter, setAchievements]);

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
    <div className="p-5 bg-accntColor w-full min-h-screen h-full cstm-flex-col gap-5 justify-start overflow-hidden">
      <ClientPageHeader mainHeader="Readefine" subHeader="Achievements" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

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

      <div className="w-full cstm-flex-col gap-5 cstm-w-limit relative ">
        {achievements.length ? (
          <div
            className="w-full overflow-y-auto cstm-scrollbar cstm-flex-col gap-5 justify-start 
                      t:items-start p-5 bg-white rounded-2xl relative"
          >
            {achievementPanels}
          </div>
        ) : (
          <div className="cstm-flex-col absolute top-2/4 translate-y-2/4 left-2/4 -translate-x-2/4 w-full">
            <Image src={noReward} alt="empty" priority width={220} draggable={false} />
            <p className="text-xs opacity-80">No Achievements Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientAchievements;

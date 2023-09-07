"use client";
import React from "react";
import AdminPageHeader from "../../../src/admin/global/PageHeader";
import AchievementsFilter from "@/src/src/admin/achievements/AchievementsFilter";
import axios from "axios";
import Link from "next/link";
import AchievementsCards from "@/src/src/admin/achievements/AchievementsCards";
import Message from "@/src/src/components/global/Message";
import Image from "next/image";

import noReward from "../../../public/profile/NoReward.svg";

import { IoAddOutline } from "react-icons/io5";
import { typeConversion } from "@/src/src/functions/typeConversion";
import { inputDate } from "@/src/src/functions/localDate";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { cipher } from "@/src/src/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

const AdminAchievements = () => {
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
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "",
    to: inputDate(new Date().toLocaleDateString()),
  });

  const { data: session } = useSession({ required: true });
  const user = session?.user?.name;
  const { url } = useGlobalContext();
  const router = useRouter();

  // handle onchange on search filter
  const handleSearchFilter = ({ name, value }) => {
    setSearchFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle onchange on date range filter
  const handleDateRangeFilter = ({ name, value }) => {
    setDateRangeFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle onchange on goal range filter
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
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user?.token, searchFilter, goalRangeFilter, sortFilter, dateRangeFilter, typeFilter]);

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
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Achievements & Tasks" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <div className="w-full cstm-flex-col gap-5 cstm-w-limit">
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

        <div className="w-full cstm-flex-col flex-wrap gap-5 relative t:items-start t:cstm-flex-row">
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

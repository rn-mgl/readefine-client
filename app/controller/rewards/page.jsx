"use client";
import React from "react";
import AdminPageHeader from "../../../src/admin/global/PageHeader";
import RewardsFilter from "@/src/src/admin/rewards/RewardsFilter";
import RewardsCards from "@/src/src/admin/rewards/RewardsCards";
import Link from "next/link";
import axios from "axios";
import Message from "@/src/src/components/global/Message";

import { IoAddOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { inputDate } from "@/src/src/functions/localDate";
import { cipher } from "@/src/src/functions/security";

const AdminRewards = () => {
  const [rewards, setRewards] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "error" });

  const [sortFilter, setSortFilter] = React.useState({ toSort: "reward_name", sortMode: "ASC" });
  const [typeFilter, setTypeFilter] = React.useState("");
  const [searchFilter, setSearchFilter] = React.useState("");
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "",
    to: inputDate(new Date().toLocaleDateString()),
  });

  const { data: session } = useSession({ required: true });
  const user = session?.user?.name;
  const { url } = useGlobalContext();

  // handle onchange on search filter
  const handleSearchFilter = ({ value }) => {
    setSearchFilter(value);
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

  // get rewards
  const getRewards = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_reward`, {
        params: { searchFilter, sortFilter, dateRangeFilter, typeFilter },
        headers: { Authorization: user.token },
      });

      if (data) {
        setRewards(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setRewards, searchFilter, sortFilter, dateRangeFilter, typeFilter]);

  // map rewards
  const rewardsCards = rewards.map((reward) => {
    const cipheredRewardId = cipher(reward.reward_id);
    return (
      <React.Fragment key={reward.reward_id}>
        <RewardsCards
          image={reward.reward}
          title={reward.reward_name}
          type={reward.reward_type}
          to={`/controller/rewards/${cipheredRewardId}`}
        />
      </React.Fragment>
    );
  });

  React.useEffect(() => {
    if (user) {
      getRewards();
    }
  }, [user, getRewards]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Rewards" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <div className="w-full cstm-w-limit cstm-flex-col gap-2">
        <RewardsFilter
          searchFilter={searchFilter}
          sortFilter={sortFilter}
          dateRangeFilter={dateRangeFilter}
          typeFilter={typeFilter}
          handleSearchFilter={handleSearchFilter}
          handleDateRangeFilter={handleDateRangeFilter}
          handleSortFilter={handleSortFilter}
          handleTypeFilter={handleTypeFilter}
        />

        <Link href="/controller/rewards/add" className="cstm-bg-hover mr-auto p-2 w-fit">
          <IoAddOutline className="text-prmColor cursor-pointer scale-150" />
        </Link>

        <div
          className="cstm-flex-col gap-5 justify-start w-full transition-all 
                  t:cstm-flex-row t:flex-wrap"
        >
          {rewardsCards}
        </div>
      </div>
    </div>
  );
};

export default AdminRewards;

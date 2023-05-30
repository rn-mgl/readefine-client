"use client";
import React from "react";
import AdminPageHeader from "../../../src/admin/global/PageHeader";
import RewardsFilter from "@/src/src/admin/rewards/RewardsFilter";
import RewardsCards from "@/src/src/admin/rewards/RewardsCards";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/components/context";

import axios from "axios";
import { typeConversion } from "@/src/src/functions/typeConversion";

const AdminRewards = () => {
  const [rewards, setRewards] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState({
    toSearch: "reward_name",
    searchKey: "",
  });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "reward_name", sortMode: "ASC" });
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "19990101T123000.000Z",
    to: new Date(),
  });
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

  const handleSortFilter = ({ name, value }) => {
    setSortFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const rewardsCards = rewards.map((reward) => {
    return (
      <React.Fragment key={reward.reward_id}>
        <RewardsCards
          image={reward.reward}
          title={reward.reward_name}
          type={typeConversion[reward.reward_type]}
          to={`/controller/rewards/${reward.reward_id}`}
        />
      </React.Fragment>
    );
  });

  const getRewards = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_reward`, {
        params: { searchFilter, sortFilter, dateRangeFilter },
        headers: { Authorization: user.token },
      });

      if (data) {
        setRewards(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, setRewards, searchFilter, sortFilter, dateRangeFilter]);

  React.useEffect(() => {
    if (user) {
      getRewards();
    }
  }, [user, getRewards]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Rewards" />

      <div
        className="w-full     
                  l-s:w-[70%] l-s:ml-auto
                  l-l:w-[80%]"
      >
        <RewardsFilter
          handleSearchFilter={handleSearchFilter}
          handleDateRangeFilter={handleDateRangeFilter}
          handleSortFilter={handleSortFilter}
          searchFilter={searchFilter}
          sortFilter={sortFilter}
          dateRangeFilter={dateRangeFilter}
        />
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

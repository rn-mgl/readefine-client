"use client";
import React, { Suspense } from "react";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import RewardsCards from "@/src/src/components/rewards/RewardsCards";
import axios from "axios";
import RewardsFilter from "@/src/src/client/rewards/RewardsFilter";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { inputDate } from "@/src/src/functions/localDate";
import { typeConversion } from "@/src/src/functions/typeConversion";

const ClientRewards = () => {
  const [rewards, setRewards] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState({
    toSearch: "reward_name",
    searchKey: "",
  });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "reward_name", sortMode: "ASC" });
  const [showFilter, setShowFilter] = React.useState({ toShow: "" });
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

  const handleSortFilter = ({ name, value }) => {
    setSortFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleShowFilter = ({ name, value }) => {
    setShowFilter((prev) => {
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
      const { data } = await axios.get(`${url}/reward`, {
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
      <ClientPageHeader mainHeader="Readefine" subHeader="Rewards" />

      <div className="w-full cstm-w-limit cstm-flex-col gap-2">
        <RewardsFilter
          handleSearchFilter={handleSearchFilter}
          handleDateRangeFilter={handleDateRangeFilter}
          handleSortFilter={handleSortFilter}
          searchFilter={searchFilter}
          sortFilter={sortFilter}
          dateRangeFilter={dateRangeFilter}
          handleShowFilter={handleShowFilter}
        />

        <div
          className="cstm-flex-col gap-5 justify-start w-full transition-all 
                  t:cstm-flex-row t:flex-wrap"
        >
          <Suspense fallback={<p>Loading...</p>}> {rewardsCards}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default ClientRewards;

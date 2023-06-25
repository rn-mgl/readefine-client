"use client";
import React, { Suspense } from "react";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import RewardsCards from "@/src/src/client/rewards/RewardsCards";
import axios from "axios";
import RewardsFilter from "@/src/src/client/rewards/RewardsFilter";
import Message from "@/src/src/components/global/Message";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { inputDate } from "@/src/src/functions/localDate";

const ClientRewards = () => {
  const [rewards, setRewards] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState({
    toSearch: "reward_name",
    searchKey: "",
  });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "reward_name", sortMode: "ASC" });
  const [message, setMessage] = React.useState({ msg: "", active: false });
  const [showFilter, setShowFilter] = React.useState({ toShow: "received" });
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
          type={reward.reward_type}
          isReceived={reward.is_received}
          to={`/controller/rewards/${reward.reward_id}`}
        />
      </React.Fragment>
    );
  });

  const getRewards = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/reward`, {
        params: { searchFilter, sortFilter, showFilter },
        headers: { Authorization: user.token },
      });

      if (data) {
        setRewards(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, setRewards, searchFilter, sortFilter, showFilter]);

  React.useEffect(() => {
    if (user) {
      getRewards();
    }
  }, [user, getRewards]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <ClientPageHeader mainHeader="Readefine" subHeader="Rewards" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      <div className="w-full cstm-w-limit cstm-flex-col gap-2">
        <RewardsFilter
          handleSearchFilter={handleSearchFilter}
          handleSortFilter={handleSortFilter}
          searchFilter={searchFilter}
          sortFilter={sortFilter}
          showFilter={showFilter}
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

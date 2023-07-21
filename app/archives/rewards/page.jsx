"use client";
import React, { Suspense } from "react";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import RewardsCards from "@/src/src/client/rewards/RewardsCards";
import axios from "axios";
import RewardsFilter from "@/src/src/client/rewards/RewardsFilter";
import Message from "@/src/src/components/global/Message";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { cipher } from "@/src/src/functions/security";

const ClientRewards = () => {
  const [rewards, setRewards] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false });

  const [sortFilter, setSortFilter] = React.useState({ toSort: "reward_name", sortMode: "ASC" });
  const [showFilter, setShowFilter] = React.useState({ toShow: "received" });
  const [searchFilter, setSearchFilter] = React.useState({
    toSearch: "reward_name",
    searchKey: "",
  });

  const { data: session } = useSession({ required: true });
  const user = session?.user?.name;
  const { url } = useGlobalContext();

  // handle onchange on search filter
  const handleSearchFilter = ({ name, value }) => {
    setSearchFilter((prev) => {
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

  // handle onchange on what to show filter
  const handleShowFilter = ({ name, value }) => {
    setShowFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // get rewards
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

  // map rewards
  const rewardsCards = rewards.map((reward) => {
    const cipheredId = cipher(reward.reward_id);

    return (
      <React.Fragment key={reward.reward_id}>
        <RewardsCards
          image={reward.reward}
          title={reward.reward_name}
          type={reward.reward_type}
          isReceived={showFilter.toShow === "all" ? reward.is_received : true}
          to={`/archives/rewards/${cipheredId}`}
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
      <ClientPageHeader mainHeader="Readefine" subHeader="Rewards" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <div className="w-full cstm-w-limit cstm-flex-col gap-2">
        <RewardsFilter
          searchFilter={searchFilter}
          sortFilter={sortFilter}
          showFilter={showFilter}
          handleShowFilter={handleShowFilter}
          handleSearchFilter={handleSearchFilter}
          handleSortFilter={handleSortFilter}
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

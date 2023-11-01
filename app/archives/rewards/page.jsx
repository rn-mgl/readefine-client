"use client";
import React from "react";
import ClientPageHeader from "@/client/global/PageHeader";
import RewardsCards from "@/client/rewards/RewardsCards";
import axios from "axios";
import RewardsFilter from "@/client/rewards/RewardsFilter";
import Message from "@/components/global/Message";
import Image from "next/image";

import noReward from "@/public/profile/NoReward.svg";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/base/context";
import { cipher } from "@/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useMessage } from "@/hooks/useMessage";
import { useRewardFilters } from "@/hooks/useRewardFilters";

const ClientRewards = () => {
  const [rewards, setRewards] = React.useState([]);

  const { message, setMessageStatus } = useMessage();
  const {
    sortFilter,
    typeFilter,
    searchFilter,
    showFilter,
    handleSearchFilter,
    handleSortFilter,
    handleTypeFilter,
    handleShowFilter,
  } = useRewardFilters();

  const { data: session } = useSession({ required: true });
  const user = session?.user?.name;
  const { url } = useGlobalContext();
  const router = useRouter();

  // get rewards
  const getRewards = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/reward`, {
        params: { searchFilter, sortFilter, showFilter, typeFilter },
        headers: { Authorization: user?.token },
      });

      if (data) {
        setRewards(data);
      }
    } catch (error) {
      console.log(error);

      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, searchFilter, sortFilter, showFilter, typeFilter, setMessageStatus]);

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

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[1]);

      if (isExpired) {
        router.push("/login");
      }
    }
  }, [user, router]);

  return (
    <div className="p-4 bg-accntColor w-full min-h-screen cstm-flex-col gap-4 justify-start">
      <ClientPageHeader mainHeader="Readefine" subHeader="Rewards" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <div className="w-full  cstm-flex-col gap-4 relative">
        <RewardsFilter
          searchFilter={searchFilter}
          sortFilter={sortFilter}
          showFilter={showFilter}
          typeFilter={typeFilter}
          handleTypeFilter={handleTypeFilter}
          handleShowFilter={handleShowFilter}
          handleSearchFilter={handleSearchFilter}
          handleSortFilter={handleSortFilter}
        />

        <div
          className="cstm-flex-col gap-4 justify-start w-full transition-all
                  t:cstm-flex-row t:flex-wrap"
        >
          {rewards.length ? (
            rewardsCards
          ) : (
            <div className="cstm-flex-col absolute top-2/4 translate-y-2/4 left-2/4 -translate-x-2/4 w-full">
              <Image src={noReward} alt="empty" priority width={220} draggable={false} />
              <p className="text-xs opacity-80">No Rewards Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientRewards;

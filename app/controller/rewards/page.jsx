"use client";
import React from "react";
import AdminPageHeader from "@/admin/global/PageHeader";
import RewardsFilter from "@/admin/rewards/RewardsFilter";
import RewardsCards from "@/admin/rewards/RewardsCards";
import Link from "next/link";
import axios from "axios";
import Message from "@/components/global/Message";
import Image from "next/image";

import noReward from "@/public/profile/NoReward.svg";

import { IoAddOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";

import { cipher } from "@/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useMessage } from "@/hooks/useMessage";
import { useRewardFilters } from "@/hooks/useRewardFilters";
import useAdminActivities from "@/src/hooks/useAdminActivities";

const AdminRewards = () => {
  const [rewards, setRewards] = React.useState([]);

  const { message, setMessageStatus } = useMessage();
  const {
    sortFilter,
    typeFilter,
    searchFilter,
    dateRangeFilter,
    handleSearchFilter,
    handleDateRangeFilter,
    handleSortFilter,
    handleTypeFilter,
  } = useRewardFilters();

  const { createAdminActivity } = useAdminActivities();

  const { data: session } = useSession({ required: true });
  const user = session?.user?.name;
  const url = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  // get rewards
  const getRewards = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_reward`, {
        params: { searchFilter, sortFilter, dateRangeFilter, typeFilter },
        headers: { Authorization: user?.token },
      });

      if (data) {
        setRewards(data);
      }
    } catch (error) {
      console.log(error);

      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [
    url,
    user?.token,
    searchFilter,
    sortFilter,
    dateRangeFilter,
    typeFilter,
    setMessageStatus,
  ]);

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
          createAdminActivity={async () =>
            await createAdminActivity("reward", reward?.reward_name, "R")
          }
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
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="p-4 bg-accntColor w-full min-h-screen cstm-flex-col gap-4 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Rewards" />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <div className="w-full  cstm-flex-col gap-4">
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

        <Link
          href="/controller/rewards/add"
          className="p-2 w-fit cstm-flex-row px-4  gap-1 mr-auto hover:shadow-md
                  bg-prmColor rounded-md text-accntColor text-sm"
        >
          <IoAddOutline className="cursor-pointer text-xl" />
          <p>Add Reward</p>
        </Link>

        <div
          className="cstm-flex-col gap-4 justify-start w-full transition-all relative
                  t:cstm-flex-row t:flex-wrap"
        >
          {rewards.length ? (
            rewardsCards
          ) : (
            <div className="cstm-flex-col absolute top-2/4 translate-y-2/4 left-2/4 -translate-x-2/4 w-full">
              <Image
                src={noReward}
                alt="empty"
                priority
                width={220}
                draggable={false}
              />
              <p className="text-xs opacity-80">No Rewards Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRewards;

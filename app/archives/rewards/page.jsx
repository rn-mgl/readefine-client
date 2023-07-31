"use client";
import React from "react";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import RewardsCards from "@/src/src/client/rewards/RewardsCards";
import axios from "axios";
import RewardsFilter from "@/src/src/client/rewards/RewardsFilter";
import Message from "@/src/src/components/global/Message";
import Image from "next/image";

import noReward from "../../../public/profile/NoReward.svg";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { cipher } from "@/src/src/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

const ClientRewards = () => {
  const [rewards, setRewards] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

  const [sortFilter, setSortFilter] = React.useState({ toSort: "reward_name", sortMode: "ASC" });
  const [showFilter, setShowFilter] = React.useState({ toShow: "received" });
  const [searchFilter, setSearchFilter] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");

  const { data: session } = useSession({ required: true });
  const user = session?.user?.name;
  const { url } = useGlobalContext();
  const router = useRouter();

  // handle onchange on search filter
  const handleSearchFilter = ({ value }) => {
    setSearchFilter(value);
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

  // handle onchange on type filter
  const handleTypeFilter = ({ value }) => {
    setTypeFilter(value);
  };

  // get rewards
  const getRewards = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/reward`, {
        params: { searchFilter, sortFilter, showFilter, typeFilter },
        headers: { Authorization: user.token },
      });

      if (data) {
        setRewards(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setRewards, searchFilter, sortFilter, showFilter, typeFilter]);

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
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <ClientPageHeader mainHeader="Readefine" subHeader="Rewards" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <div className="w-full cstm-w-limit cstm-flex-col gap-2 relative">
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
          className="cstm-flex-col gap-5 justify-start w-full transition-all
                  t:cstm-flex-row t:flex-wrap"
        >
          {rewards.length ? (
            rewardsCards
          ) : (
            <div className="cstm-flex-col absolute top-2/4 translate-y-2/4 left-2/4 -translate-x-2/4 w-full">
              <Image src={noReward} alt="empty" loading="lazy" width={220} draggable={false} />
              <p className="text-xs opacity-80">No Rewards Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientRewards;

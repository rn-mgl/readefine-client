import React from "react";
import RewardsFilter from "./RewardsFilter";
import axios from "axios";
import FindRewardCards from "./FindRewardCards";

import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { typeConversion } from "../../functions/typeConversion";
import { inputDate } from "../../functions/localDate";
import Message from "../../components/global/Message";
import { useMessage } from "../../hooks/useMessage";

const FindRewards = (props) => {
  const [rewards, setRewards] = React.useState([]);

  const [searchFilter, setSearchFilter] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");
  const [sortFilter, setSortFilter] = React.useState({ toSort: "reward_name", sortMode: "ASC" });
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "",
    to: inputDate(new Date().toLocaleDateString()),
  });

  const { message, setMessageStatus } = useMessage();

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

  // handle onchange on type filter
  const handleTypeFilter = ({ value }) => {
    setTypeFilter(value);
  };

  const rewardsCards = rewards.map((reward) => {
    return (
      <React.Fragment key={reward.reward_id}>
        <FindRewardCards
          image={reward.reward}
          title={reward.reward_name}
          type={typeConversion[reward.reward_type]}
          selectReward={() => props.selectReward(reward.reward_name, reward.reward_id)}
          handleCanSelectReward={props.handleCanSelectReward}
        />
      </React.Fragment>
    );
  });

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
  }, [url, user?.token, setRewards, searchFilter, sortFilter, dateRangeFilter, typeFilter, setMessageStatus]);

  React.useEffect(() => {
    if (user) {
      getRewards();
    }
  }, [user, getRewards]);

  return (
    <div
      className="p-5 h-full overflow-y-auto cstm-scrollbar-2 backdrop-blur-md fixed top-0 
                  left-0 w-full min-h-screen cstm-flex-col gap-5 justify-start  z-20"
    >
      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <button onClick={props.handleCanSelectReward} className="ml-auto cstm-flex-col w-fit z-20 cstm-bg-hover">
        <IoClose className="text-prmColor scale-150 cursor-pointer" />
      </button>

      <div className="w-full cstm-flex-col gap-5 cstm-w-limit">
        <RewardsFilter
          typeFilter={typeFilter}
          searchFilter={searchFilter}
          sortFilter={sortFilter}
          dateRangeFilter={dateRangeFilter}
          handleSearchFilter={handleSearchFilter}
          handleDateRangeFilter={handleDateRangeFilter}
          handleSortFilter={handleSortFilter}
          handleTypeFilter={handleTypeFilter}
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

export default FindRewards;

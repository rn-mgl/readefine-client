"use client";
import React from "react";
import AdminPageHeader from "../../../src/admin/global/PageHeader";
import StoriesCards from "@/src/src/admin/stories/StoriesCards";
import DashboardCardImage3 from "../../../public/dashboard/DashboardCardImage3.svg";
import StoriesFilter from "@/src/src/admin/stories/StoriesFilter";
import axios from "axios";
import Link from "next/link";
import Message from "@/src/src/components/global/Message";

import { IoAddOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { inputDate } from "@/src/src/functions/localDate";
import { useGlobalContext } from "@/src/context";
import { cipher } from "@/src/src/functions/security";

const AdminStories = () => {
  const [stories, setStories] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState({ toSearch: "title", searchKey: "" });
  const [lexileRangeFilter, setLexileRangeFilter] = React.useState({ from: 0, to: 1250 });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "title", sortMode: "ASC" });
  const [message, setMessage] = React.useState({ msg: "", active: false });
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "",
    to: inputDate(new Date().toLocaleDateString()),
  });
  const { data: session } = useSession();

  const { url } = useGlobalContext();

  const user = session?.user?.name;

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

  const handleLexileRangeFilter = ({ name, value }) => {
    setLexileRangeFilter((prev) => {
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

  const getAllStories = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_story/`, {
        headers: { Authorization: user.token },
        params: {
          searchFilter,
          lexileRangeFilter,
          sortFilter,
          dateRangeFilter,
        },
      });

      if (data) {
        setStories(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, setStories, searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter]);

  const storiesCards = stories.map((story) => {
    const cipheredStoryId = cipher(story.story_id);
    const testId = story?.test_id ? story?.test_id : story.story_id; // temporarily use story_id if no test to cater the condition in suddenly checking test with no content
    const cipheredTestId = cipher(testId);
    const testLink = story?.has_test
      ? `/controller/tests/${cipheredTestId}`
      : `/controller/tests/add/${cipheredTestId}`;

    return (
      <React.Fragment key={story.story_id}>
        <StoriesCards
          image={story.book_cover ? story.book_cover : DashboardCardImage3}
          title={story.title}
          author={story.author}
          lexile={story.lexile}
          genre={story.genre}
          visit={`/controller/stories/${cipheredStoryId}`}
          test={testLink}
        />
      </React.Fragment>
    );
  });

  React.useEffect(() => {
    if (user) {
      getAllStories();
    }
  }, [getAllStories, user]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Stories" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      <div className="w-full cstm-w-limit cstm-flex-col gap-2">
        <StoriesFilter
          handleSearchFilter={handleSearchFilter}
          handleDateRangeFilter={handleDateRangeFilter}
          handleLexileRangeFilter={handleLexileRangeFilter}
          handleSortFilter={handleSortFilter}
          searchFilter={searchFilter}
          lexileRangeFilter={lexileRangeFilter}
          sortFilter={sortFilter}
          dateRangeFilter={dateRangeFilter}
        />
        <Link href="/controller/stories/add" className="cstm-bg-hover mr-auto p-2 w-fit">
          <IoAddOutline className="text-prmColor cursor-pointer scale-150" />
        </Link>
        <div
          className="cstm-flex-col gap-5 justify-start w-full transition-all 
                  t:cstm-flex-row t:flex-wrap"
        >
          {storiesCards}
        </div>
      </div>
    </div>
  );
};

export default AdminStories;

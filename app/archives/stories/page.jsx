"use client";

import axios from "axios";
import StoriesFilter from "@/src/src/client/stories/StoriesFilter";
import StoriesCards from "@/src/src/components/stories/StoriesCards";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import Message from "@/src/src/components/global/Message";

import { useGlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";
import { inputDate } from "@/src/src/functions/localDate";
import React, { Suspense } from "react";

const ClientStories = () => {
  const [stories, setStories] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState({ toSearch: "title", searchKey: "" });
  const [lexileRangeFilter, setLexileRangeFilter] = React.useState({ from: 0, to: 1250 });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "title", sortMode: "ASC" });
  const [message, setMessage] = React.useState({ msg: "", active: false });
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "",
    to: inputDate(new Date().toLocaleDateString()),
  });

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

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const getStories = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/story`, {
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
  }, [url, user, setStories, searchFilter, sortFilter, dateRangeFilter, lexileRangeFilter]);

  const storiesCards = stories.map((story) => {
    const testId = story?.test_id ? story?.test_id : story.story_id;
    return (
      <React.Fragment key={story.story_id}>
        <StoriesCards
          image={story.book_cover ? story.book_cover : DashboardCardImage3}
          title={story.title}
          author={story.author}
          lexile={story.lexile}
          genre={story.genre}
          visit={`/archives/stories/${story.story_id}`}
          test={`/archives/tests/${testId}`}
        />
      </React.Fragment>
    );
  });

  React.useEffect(() => {
    if (user?.lexile) {
      setLexileRangeFilter({ from: user?.lexile - 50, to: user?.lexile + 100 });
    }
  }, [user?.lexile, setLexileRangeFilter]);

  React.useEffect(() => {
    if (user) {
      getStories();
    }
  }, [user, getStories]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <ClientPageHeader mainHeader="Readefine" subHeader="Stories" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      <div className="w-full cstm-w-limit cstm-flex-col gap-5">
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
        <div
          className="cstm-flex-col gap-5 justify-start w-full transition-all 
                  t:cstm-flex-row t:flex-wrap"
        >
          <Suspense fallback={<p>Loading...</p>}> {storiesCards}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default ClientStories;

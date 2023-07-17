"use client";

import axios from "axios";
import StoriesFilter from "@/src/src/client/stories/StoriesFilter";
import StoriesCards from "@/src/src/client/stories/StoriesCards";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import Message from "@/src/src/components/global/Message";
import React, { Suspense } from "react";
import LowLexileTestMessage from "@/src/src/client/tests/LowLexileTestMessage";

import { useGlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";
import { inputDate } from "@/src/src/functions/localDate";
import { cipher } from "@/src/src/functions/security";

const ClientStories = () => {
  const [stories, setStories] = React.useState([]);
  const [userLexile, setUserLexile] = React.useState(-1);
  const [showLexileMessage, setShowLexileMessage] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState(-1);
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

  const handleShowLexileMessage = () => {
    setShowLexileMessage((prev) => !prev);
  };

  const handleSelectedBook = (id) => {
    setSelectedBook(id);
  };

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const storiesCards = stories.map((story) => {
    const cipheredStoryId = cipher(story.story_id);
    const testId = story?.test_id ? story?.test_id : story.story_id;
    const cipheredTestId = cipher(testId);
    return (
      <React.Fragment key={story.story_id}>
        <StoriesCards
          image={story.book_cover ? story.book_cover : DashboardCardImage3}
          isRead={story.is_read}
          isTaken={story.is_taken}
          isLower={userLexile.lexile - 100 > story.lexile}
          title={story.title}
          author={story.author}
          lexile={story.lexile}
          genre={story.genre}
          testId={story.test_id}
          read={`/archives/stories/${cipheredStoryId}`}
          test={`/archives/tests/${cipheredTestId}`}
          showLexileMessage={showLexileMessage}
          handleShowLexileMessage={handleShowLexileMessage}
          handleSelectedBook={handleSelectedBook}
        />
      </React.Fragment>
    );
  });

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

  const getUserLexile = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/user_lexile`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        setUserLexile(data);
        setLexileRangeFilter({ from: data.lexile - 100, to: data.lexile + 50 });
      }
    } catch (error) {
      console.log(error);
    }
  }, [setUserLexile, url, user]);

  React.useEffect(() => {
    if (user) {
      getStories();
    }
  }, [user, getStories]);

  React.useEffect(() => {
    if (user) {
      getUserLexile();
    }
  }, [user, getUserLexile]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <ClientPageHeader mainHeader="Readefine" subHeader="Stories" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {showLexileMessage ? (
        <LowLexileTestMessage
          userLexile={userLexile.lexile}
          testLink={`/archives/tests/${selectedBook}`}
          handleShowLexileMessage={handleShowLexileMessage}
        />
      ) : null}
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

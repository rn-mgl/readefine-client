"use client";

import axios from "axios";
import StoriesFilter from "@/src/src/client/stories/StoriesFilter";
import StoriesCards from "@/src/src/client/stories/StoriesCards";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import Message from "@/src/src/components/global/Message";
import React from "react";
import LowLexileTestMessage from "@/src/src/client/tests/LowLexileTestMessage";
import Image from "next/image";

import noReads from "../../../public/profile/NoReads.svg";

import { useGlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";
import { cipher } from "@/src/src/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import { useLoading } from "@/src/src/hooks/useLoading";
import FetchingMessage from "@/src/src/components/global/FetchingMessage";

const ClientStories = () => {
  const [stories, setStories] = React.useState([]);
  const [userLexile, setUserLexile] = React.useState(-1);
  const [showLexileMessage, setShowLexileMessage] = React.useState(false);

  const [selectedBook, setSelectedBook] = React.useState(-1);

  const [searchFilter, setSearchFilter] = React.useState({ toSearch: "title", searchKey: "" });
  const [lexileRangeFilter, setLexileRangeFilter] = React.useState({ from: 0, to: 1250 });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "title", sortMode: "ASC" });

  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

  const { loading, setLoadingState } = useLoading(true);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

  // handle onchange on search filter
  const handleSearchFilter = ({ name, value }) => {
    setSearchFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle onchange on lexile range filter
  const handleLexileRangeFilter = ({ name, value }) => {
    setLexileRangeFilter((prev) => {
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

  // show message that the test to be taken has low lexile level for the user
  const handleShowLexileMessage = () => {
    setShowLexileMessage((prev) => !prev);
  };

  // keep track of the book selected to manage low lexile message
  const handleSelectedBook = (id) => {
    setSelectedBook(id);
  };

  // get stories
  const getStories = React.useCallback(async () => {
    setLoadingState(true);
    try {
      const { data } = await axios.get(`${url}/story`, {
        headers: { Authorization: user.token },
        params: {
          searchFilter,
          lexileRangeFilter,
          sortFilter,
        },
      });
      if (data) {
        setStories(data);
        setLoadingState(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setStories, setLoadingState, searchFilter, sortFilter, lexileRangeFilter]);

  // get user lexile
  const getUserLexile = React.useCallback(async () => {
    setLoadingState(true);
    try {
      const { data } = await axios.get(`${url}/user_lexile`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        setUserLexile(data);
        setLexileRangeFilter({ from: data.lexile - 100, to: data.lexile + 50 });
        setLoadingState(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [setUserLexile, setLoadingState, url, user]);

  // map stories
  const storiesCards = stories.map((story) => {
    const cipheredStoryId = cipher(story.story_id);
    const testId = story?.test_id ? story?.test_id : story.story_id;
    const cipheredTestId = cipher(testId);
    return (
      <React.Fragment key={story.story_id}>
        <StoriesCards
          image={story.book_cover}
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
      <ClientPageHeader mainHeader="Readefine" subHeader="Stories" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {showLexileMessage ? (
        <LowLexileTestMessage
          userLexile={userLexile.lexile}
          testLink={`/archives/tests/${cipher(selectedBook)}`}
          handleShowLexileMessage={handleShowLexileMessage}
        />
      ) : null}

      <div className="w-full cstm-w-limit cstm-flex-col gap-5 ">
        <StoriesFilter
          handleSearchFilter={handleSearchFilter}
          handleLexileRangeFilter={handleLexileRangeFilter}
          handleSortFilter={handleSortFilter}
          searchFilter={searchFilter}
          lexileRangeFilter={lexileRangeFilter}
          sortFilter={sortFilter}
        />

        <div
          className="cstm-flex-col gap-5 justify-start w-full transition-all relative
                  t:cstm-flex-row t:flex-wrap"
        >
          {stories.length ? (
            storiesCards
          ) : loading ? (
            <FetchingMessage />
          ) : (
            <div className="cstm-flex-col absolute top-2/4 translate-y-2/4 left-2/4 -translate-x-2/4 w-full">
              <Image src={noReads} alt="empty" priority width={220} draggable={false} />
              <p className="text-xs opacity-80">No Stories Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientStories;

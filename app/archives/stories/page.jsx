"use client";

import axios from "axios";
import StoriesFilter from "@/client/stories/StoriesFilter";
import StoriesCards from "@/client/stories/StoriesCards";
import ClientPageHeader from "@/client/global/PageHeader";
import Message from "@/components/global/Message";
import React from "react";
import LowLexileTestMessage from "@/client/tests/LowLexileTestMessage";
import Image from "next/image";

import noReads from "@/public/profile/NoReads.svg";

import { useGlobalContext } from "@/base/context";
import { useSession } from "next-auth/react";
import { cipher } from "@/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useMessage } from "@/hooks/useMessage";
import { useUserLexile } from "@/hooks/useUserLexile";
import { useStoryFilters } from "@/hooks/useStoryFilters";

const ClientStories = () => {
  const [stories, setStories] = React.useState([]);
  const [showLexileMessage, setShowLexileMessage] = React.useState(false);

  const [selectedBook, setSelectedBook] = React.useState(-1);

  const { message, setMessageStatus } = useMessage();
  const { userLexile } = useUserLexile();
  const { searchFilter, sortFilter, handleSearchFilter, handleSortFilter } = useStoryFilters();

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

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
    try {
      const { data } = await axios.get(`${url}/story`, {
        headers: { Authorization: user?.token },
        params: {
          searchFilter,
          userLexile,
          sortFilter,
        },
      });
      if (data) {
        setStories(data);
      }
    } catch (error) {
      console.log(error);

      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, searchFilter, sortFilter, userLexile, setMessageStatus]);

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
          isLower={userLexile - 100 > story.lexile}
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
    if (user && userLexile) {
      getStories();
    }
  }, [user, userLexile, getStories]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[1]);

      if (isExpired) {
        router.push("/login");
      }
    }
  }, [user, router]);

  return (
    <div className="p-4 w-full min-h-screen cstm-flex-col gap-4 justify-start">
      <ClientPageHeader mainHeader="Readefine" subHeader="Stories" />
      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      {showLexileMessage ? (
        <LowLexileTestMessage
          userLexile={userLexile}
          testLink={`/archives/tests/${cipher(selectedBook)}`}
          handleShowLexileMessage={handleShowLexileMessage}
        />
      ) : null}

      <div className="w-full h-full cstm-flex-col gap-4 justify-start">
        <StoriesFilter
          handleSearchFilter={handleSearchFilter}
          handleSortFilter={handleSortFilter}
          searchFilter={searchFilter}
          sortFilter={sortFilter}
        />

        <div
          className="cstm-flex-col gap-4 justify-start w-full transition-all relative
                  t:cstm-flex-row t:flex-wrap"
        >
          {stories.length ? (
            storiesCards
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

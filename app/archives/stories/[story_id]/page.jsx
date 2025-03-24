"use client";
import React from "react";
import StorySinglePage from "@/components/stories/StorySinglePage";
import axios from "axios";
import Customizations from "@/components/stories/Customizations";
import ClientPageHeader from "@/client/global/PageHeader";
import Message from "@/components/global/Message";
import ReceiveAchievement from "@/client/achievements/ReceiveAchievement";
import StoryDoublePage from "@/components/stories/StoryDoublePage";
import StoryActions from "@/client/stories/StoryActions";
import PageNavigation from "@/components/stories/PageNavigation";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useStoryPageControls } from "@/hooks/useStoryPageControls";
import { useReceiveAchievement } from "@/hooks/useReceiveAchievement";
import { useMessage } from "@/hooks/useMessage";
import { useAudioControls } from "@/hooks/useAudioControls";

const SingleStory = ({ params }) => {
  const {
    story,
    pages,
    activePage,
    fontSize,
    viewType,
    customizationsVisible,
    handleIncrement,
    handleDecrement,
    handleFontSize,
    handleActivePage,
    handleCustomizationsVisible,
    handleViewType,
    setNewStory,
    setNewPages,
  } = useStoryPageControls();

  const { accomplishedAchievement, claimNewAchievement, resetAchievement } =
    useReceiveAchievement();

  const { message, setMessageStatus } = useMessage();

  const {
    isMuted,
    isPlaying,
    audioRef,
    handleMuteVolume,
    handleVolumeChange,
    handleToggleAudio,
  } = useAudioControls();

  const { data: session } = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL;
  const user = session?.user?.name;
  const decodedStoryId = params?.story_id;
  const router = useRouter();

  // text to speech content
  const leftUtterance = pages[activePage - 1]?.content;
  const rightUtterance = pages[activePage]?.content;

  // get pages
  const getPages = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/story_content`, {
        params: { storyId: decodedStoryId },
        headers: { Authorization: user?.token },
      });
      if (data) {
        setNewPages(data);
      }
    } catch (error) {
      console.log(error);

      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, setNewPages, decodedStoryId, setMessageStatus]);

  // get story
  const getStory = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/story/${decodedStoryId}`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        setNewStory(data);
      }
    } catch (error) {
      console.log(error);

      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, setNewStory, decodedStoryId, setMessageStatus]);

  // read story
  const readStory = React.useCallback(async () => {
    try {
      const { data } = await axios.post(
        `${url}/read_story`,
        { storyId: decodedStoryId },
        { headers: { Authorization: user?.token } }
      );

      // only add achievement points if the book is just now read
      if (data.insertId) {
        // update read achievement points and return if achievement is met
        const { data: achievementData } = await axios.patch(
          `${url}/user_achievement`,
          {
            type: "read_story",
            toAdd: 1,
          },
          { headers: { Authorization: user?.token } }
        );

        // if there are achievements
        if (achievementData.length) {
          claimNewAchievement(achievementData);
        }
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [decodedStoryId, url, user?.token, claimNewAchievement, setMessageStatus]);

  // map pages
  const storyPages = pages?.map((page, index, arr) => {
    return (
      <div
        className="absolute left-2/4 -translate-x-2/4 w-full z-10 justify-start "
        key={page.content_id}
      >
        {viewType === "single" ? (
          <StorySinglePage
            title={story?.title}
            activePage={activePage}
            page={page}
            index={index + 1}
            fontSize={fontSize}
          />
        ) : (
          <StoryDoublePage
            title={story?.title}
            activePage={activePage}
            leftPage={page}
            rightPage={arr[index + 1]}
            index={index + 1}
            fontSize={fontSize}
          />
        )}
      </div>
    );
  });

  React.useEffect(() => {
    if (user) {
      getStory();
    }
  }, [getStory, user]);

  React.useEffect(() => {
    if (user) {
      getPages();
    }
  }, [getPages, user]);

  React.useEffect(() => {
    if (pages.length && activePage >= pages.length - 1) {
      readStory();
    }
  }, [activePage, pages.length, readStory]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[1]);

      if (isExpired) {
        router.push("/login");
      }
    }
  }, [user, router]);

  React.useEffect(() => {
    const cancelSSU = () => window.speechSynthesis.cancel();

    window.addEventListener("unload", cancelSSU());

    return () => {
      window.removeEventListener("unload", cancelSSU());
    };
  }, []);

  return (
    <div className="p-4 cstm-flex-col w-full min-h-screen h-screen justify-start gap-4">
      <ClientPageHeader subHeader="Stories" mainHeader={story.title} />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      {accomplishedAchievement.accomplished ? (
        <ReceiveAchievement
          achievements={accomplishedAchievement.achievements}
          resetAchievement={resetAchievement}
        />
      ) : null}

      {/* user actions */}
      <StoryActions
        to="/archives/stories"
        story={story}
        isMuted={isMuted}
        isPlaying={isPlaying}
        handleCustomizationsVisible={handleCustomizationsVisible}
        handleMuteVolume={handleMuteVolume}
        handleVolumeChange={handleVolumeChange}
        handleToggleAudio={handleToggleAudio}
      />

      {/* can see customizations */}
      {customizationsVisible ? (
        <Customizations
          utterance={
            viewType === "single"
              ? leftUtterance
              : rightUtterance
              ? leftUtterance + " " + rightUtterance
              : leftUtterance
          }
          fontSize={fontSize}
          viewType={viewType}
          handleViewType={handleViewType}
          handleFontSize={handleFontSize}
          handleIncrement={handleIncrement}
        />
      ) : null}

      {/* pages */}
      <div
        className="h-full w-full gap-4 bg-white rounded-2xl p-4 relative overflow-x-hidden 
                  overflow-y-auto transition-all  cstm-scrollbar"
      >
        <div className="w-full relative overflow-x-hidden h-full cstm-scrollbar">
          {storyPages}
        </div>
      </div>

      {/* left right button */}
      <PageNavigation
        activePage={activePage}
        pages={pages}
        viewType={viewType}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handleActivePage={handleActivePage}
      />

      {story?.audio ? (
        <audio loop ref={audioRef}>
          <source src={story?.audio} />
        </audio>
      ) : null}
    </div>
  );
};

export default SingleStory;

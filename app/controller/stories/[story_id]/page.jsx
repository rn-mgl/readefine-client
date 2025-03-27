"use client";
import React from "react";
import StoryDoublePage from "@/components/stories/StoryDoublePage";
import AdminPageHeader from "@/admin/global/PageHeader";
import StorySinglePage from "@/components/stories/StorySinglePage";
import axios from "axios";
import Customizations from "@/components/stories/Customizations";
import Message from "@/components/global/Message";
import StoryActions from "@/admin/stories/StoryActions";
import PageNavigation from "@/components/stories/PageNavigation";
import DeleteData from "@/admin/global/DeleteData";

import { useSession } from "next-auth/react";

import { useParams, useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useStoryPageControls } from "@/hooks/useStoryPageControls";
import { useMessage } from "@/hooks/useMessage";
import { useAudioControls } from "@/hooks/useAudioControls";

const SingleStory = () => {
  const [canDeleteStory, setCanDeleteStory] = React.useState(false);

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
  const params = useParams();
  const storyId = params?.story_id;
  const user = session?.user;
  const router = useRouter(null);

  // text to speech content
  const leftUtterance = pages[activePage - 1]?.content;
  const rightUtterance = pages[activePage]?.content;

  // toggle can delete story
  const handleCanDeleteStory = () => {
    setCanDeleteStory((prev) => !prev);
  };

  // get pages
  const getPages = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_story_content`, {
        params: { storyId: storyId },
        headers: { Authorization: user?.token },
      });
      if (data) {
        setNewPages(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, setNewPages, storyId, setMessageStatus]);

  // get story
  const getStory = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_story/${storyId}`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        setNewStory(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, setNewStory, storyId, setMessageStatus]);

  // map story pages
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
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
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
    <div className="p-4 cstm-flex-col bg-accntColor w-full min-h-screen h-screen justify-start gap-4">
      <AdminPageHeader subHeader="Stories" mainHeader={story.title} />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      {canDeleteStory ? (
        <DeleteData
          apiRoute={`${url}/admin_story/${storyId}`}
          returnRoute="/controller/stories"
          confirmation={story?.title}
          handleCanDeleteData={handleCanDeleteStory}
          resourceType="story"
        />
      ) : null}

      {/* admin actions */}
      <StoryActions
        to="/controller/stories"
        storyId={params?.story_id}
        story={story}
        handleCanDeleteStory={handleCanDeleteStory}
        handleCustomizationsVisible={handleCustomizationsVisible}
        isMuted={isMuted}
        isPlaying={isPlaying}
        handleMuteVolume={handleMuteVolume}
        handleVolumeChange={handleVolumeChange}
        handleToggleAudio={handleToggleAudio}
      />

      {/* filter aka customizations  */}
      {customizationsVisible ? (
        <Customizations
          // check if both pages for utterances exist, else only left
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
        className="h-full w-full gap-4  bg-white rounded-2xl p-4 relative overflow-x-hidden 
            overflow-y-auto  transition-all  cstm-scrollbar"
      >
        <div className="w-full relative overflow-x-hidden h-full cstm-scrollbar">
          {storyPages}
        </div>
      </div>

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

"use client";
import React from "react";
import StoryDoublePage from "@/src/src/components/stories/StoryDoublePage";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import StorySinglePage from "@/src/src/components/stories/StorySinglePage";
import axios from "axios";
import Customizations from "@/src/src/components/stories/Customizations";
import Message from "@/src/src/components/global/Message";
import StoryActions from "@/src/src/admin/stories/StoryActions";
import PageNavigation from "@/src/src/components/stories/PageNavigation";
import DeleteData from "@/src/src/admin/global/DeleteData";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";

import { decipher } from "@/src/src/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import { useStoryPageControls } from "@/src/src/hooks/useStoryPageControls";
import { useLoading } from "@/src/src/hooks/useLoading";
import FetchingMessage from "@/src/src/components/global/FetchingMessage";

const SingleStory = ({ params }) => {
  const [message, setMessage] = React.useState({
    msg: "",
    active: false,
    type: "info",
  });

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

  const { loading, setLoadingState } = useLoading(true);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const decodedStoryId = decipher(params?.story_id);
  const user = session?.user?.name;
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
    setLoadingState(true);
    try {
      const { data } = await axios.get(`${url}/admin_story_content`, {
        params: { storyId: decodedStoryId },
        headers: { Authorization: user.token },
      });
      if (data) {
        setNewPages(data);
        setLoadingState(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessage({
        active: true,
        msg: error?.response?.data?.msg,
        type: "error",
      });
    }
  }, [url, user, setNewPages, setLoadingState, decodedStoryId]);

  // get story
  const getStory = React.useCallback(async () => {
    setLoadingState(true);
    try {
      const { data } = await axios.get(`${url}/admin_story/${decodedStoryId}`, {
        headers: { Authorization: user.token },
      });
      if (data) {
        setNewStory(data);
        setLoadingState(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessage({
        active: true,
        msg: error?.response?.data?.msg,
        type: "error",
      });
    }
  }, [url, user, setNewStory, setLoadingState, decodedStoryId]);

  // map story pages
  const storyPages = pages?.map((page, index, arr) => {
    return (
      <div className="absolute left-2/4 -translate-x-2/4 w-full z-10 justify-start " key={page.content_id}>
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
    const cancelSSU = window.speechSynthesis.cancel();

    window.addEventListener("beforeunload", cancelSSU);

    return () => {
      window.removeEventListener("beforeunload", cancelSSU);
    };
  }, []);

  return (
    <div className="p-5 cstm-flex-col bg-accntColor w-full min-h-screen h-screen justify-start gap-5">
      <AdminPageHeader subHeader="Stories" mainHeader={story.title} />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {canDeleteStory ? (
        <DeleteData
          apiRoute={`${url}/admin_story/${decodedStoryId}`}
          returnRoute="/controller/stories"
          confirmation={story?.title}
          handleCanDeleteData={handleCanDeleteStory}
        />
      ) : null}

      {/* admin actions */}
      <StoryActions
        to="/controller/stories"
        storyId={params?.story_id}
        story={story}
        handleCanDeleteStory={handleCanDeleteStory}
        handleCustomizationsVisible={handleCustomizationsVisible}
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
        />
      ) : null}

      {/* pages */}
      <div
        className="h-full w-full gap-5  bg-white rounded-2xl p-5 relative overflow-x-hidden 
            overflow-y-auto cstm-w-limit transition-all  cstm-scrollbar"
      >
        <div className="w-full relative overflow-x-hidden h-full cstm-scrollbar">
          {pages.length ? storyPages : loading ? <FetchingMessage /> : null}
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
    </div>
  );
};

export default SingleStory;

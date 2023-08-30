"use client";
import React from "react";
import StoryDoublePage from "@/src/src/components/stories/StoryDoublePage";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import StorySinglePage from "@/src/src/components/stories/StorySinglePage";
import axios from "axios";
import DeleteStory from "@/src/src/admin/stories/DeleteStory";
import Customizations from "@/src/src/components/stories/Customizations";
import Message from "@/src/src/components/global/Message";
import StoryActions from "@/src/src/admin/stories/StoryActions";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";

import { decipher } from "@/src/src/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import PageNavigation from "@/src/src/components/stories/PageNavigation";

const SingleStory = ({ params }) => {
  const [story, setStory] = React.useState({});
  const [pages, setPages] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

  const [activePage, setActivePage] = React.useState(1);
  const [fontSize, setFontSize] = React.useState(16);

  const [viewType, setViewType] = React.useState("single");
  const [customizationsVisible, setCustomizationsVisible] = React.useState(true);

  const [canDeleteStory, setCanDeleteStory] = React.useState(false);

  const [isMuted, setIsMuted] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef();

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const decodedStoryId = decipher(params?.story_id);
  const user = session?.user?.name;
  const router = useRouter(null);

  // text to speech content
  const leftUtterance = pages[activePage - 1]?.content;
  const rightUtterance = pages[activePage]?.content;

  // handle to next page
  const handleIncrement = () => {
    const increment = viewType === "single" ? 1 : 2;
    setActivePage((prev) => (prev + increment > pages.length ? pages.length : prev + increment));
  };

  // handle tp prev page
  const handleDecrement = () => {
    const decrement = viewType === "single" ? 1 : 2;
    setActivePage((prev) => (prev - decrement < 1 ? 1 : prev - decrement));
  };

  // toggle can delete story
  const handleCanDeleteStory = () => {
    setCanDeleteStory((prev) => !prev);
  };

  // handle change font style
  const handleFontSize = ({ value }) => {
    setFontSize(() => (value < 16 ? 16 : value > 100 ? 100 : parseInt(value)));
  };

  // toggle can see filter aka customizations
  const handleCustomizationsVisible = () => {
    setCustomizationsVisible((prev) => !prev);
  };

  // handle the active page
  const handleActivePage = ({ value }) => {
    const newPage = parseInt(value);
    setActivePage(newPage < 1 ? 1 : newPage > pages.length ? pages.length : newPage);
  };

  // change view type, single or double
  const handleViewType = (type) => {
    setViewType(type);
  };

  // get pages
  const getPages = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_story_content`, {
        params: { storyId: decodedStoryId },
        headers: { Authorization: user.token },
      });
      if (data) {
        setPages(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setPages, decodedStoryId]);

  // get story
  const getStory = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_story/${decodedStoryId}`, {
        headers: { Authorization: user.token },
      });
      if (data) {
        setStory(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setStory, decodedStoryId]);

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
        <DeleteStory
          confirmation={story?.title}
          handleCanDeleteStory={handleCanDeleteStory}
          storyId={story?.story_id}
        />
      ) : null}

      {/* admin actions */}
      <StoryActions
        storyId={params?.story_id}
        to="/controller/stories"
        story={story}
        isMuted={isMuted}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsMuted={setIsMuted}
        handleCanDeleteStory={handleCanDeleteStory}
        setIsPlaying={setIsPlaying}
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
          customizationsVisible={customizationsVisible}
          viewType={viewType}
          handleFontSize={handleFontSize}
          handleCustomizationsVisible={handleCustomizationsVisible}
          handleViewType={handleViewType}
        />
      ) : null}

      {/* pages */}
      <div
        className="h-full w-full gap-5  bg-white rounded-2xl p-5 relative overflow-x-hidden 
            overflow-y-auto cstm-w-limit transition-all  cstm-scrollbar"
      >
        <div className="w-full relative overflow-x-hidden h-full cstm-scrollbar">{storyPages}</div>
      </div>

      <PageNavigation
        activePage={activePage}
        pages={pages}
        handleDecrement={handleDecrement}
        handleActivePage={handleActivePage}
        handleIncrement={handleIncrement}
      />

      {story?.audio ? (
        <audio loop autoPlay ref={audioRef}>
          <source src={story?.audio} />
        </audio>
      ) : null}
    </div>
  );
};

export default SingleStory;

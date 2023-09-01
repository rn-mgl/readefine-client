"use client";
import React from "react";
import StorySinglePage from "@/src/src/components/stories/StorySinglePage";
import axios from "axios";
import Customizations from "@/src/src/components/stories/Customizations";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import Message from "@/src/src/components/global/Message";
import ReceiveAchievement from "@/src/src/client/achievements/ReceiveAchievement";
import StoryDoublePage from "@/src/src/components/stories/StoryDoublePage";
import StoryActions from "@/src/src/client/stories/StoryActions";
import PageNavigation from "@/src/src/components/stories/PageNavigation";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { decipher } from "@/src/src/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import { handleAccomplishedAchievement } from "@/src/src/functions/achievementFns";
import { handleCustomizationsVisible } from "@/src/src/functions/storyFns";

const SingleStory = ({ params }) => {
  const [story, setStory] = React.useState({});
  const [pages, setPages] = React.useState([]);
  const [message, setMessage] = React.useState({
    msg: "",
    active: false,
    type: "info",
  });

  const [activePage, setActivePage] = React.useState(1);

  const [customizationsVisible, setCustomizationsVisible] = React.useState(true);
  const [fontSize, setFontSize] = React.useState(16);
  const [viewType, setViewType] = React.useState("single");

  const [accomplishedAchievement, setAccomplishedAchievement] = React.useState({
    accomplished: false,
    achievements: [],
  });

  const [isMuted, setIsMuted] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef();

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decodedStoryId = decipher(params?.story_id);
  const router = useRouter();

  // text to speech content
  const leftUtterance = pages[activePage - 1]?.content;
  const rightUtterance = pages[activePage]?.content;

  // get pages
  const getPages = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/story_content`, {
        params: { storyId: decodedStoryId },
        headers: { Authorization: user.token },
      });
      if (data) {
        setPages(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({
        active: true,
        msg: error?.response?.data?.msg,
        type: "error",
      });
    }
  }, [url, user, setPages, decodedStoryId]);

  // get story
  const getStory = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/story/${decodedStoryId}`, {
        headers: { Authorization: user.token },
      });
      if (data) {
        setStory(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({
        active: true,
        msg: error?.response?.data?.msg,
        type: "error",
      });
    }
  }, [url, user, setStory, decodedStoryId]);

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
          setAccomplishedAchievement({
            accomplished: true,
            achievements: achievementData,
          });
        }
      }
    } catch (error) {
      console.log(error);
      setMessage({
        active: true,
        msg: error?.response?.data?.msg,
        type: "error",
      });
    }
  }, [decodedStoryId, url, user?.token]);

  // map pages
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
    const cancelSSU = window.speechSynthesis.cancel();

    window.addEventListener("beforeunload", cancelSSU);

    return () => {
      window.removeEventListener("beforeunload", cancelSSU);
    };
  }, []);

  return (
    <div className="p-5 cstm-flex-col bg-accntColor w-full min-h-screen h-screen justify-start gap-5">
      <ClientPageHeader subHeader="Stories" mainHeader={story.title} />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {accomplishedAchievement.accomplished ? (
        <ReceiveAchievement
          achievements={accomplishedAchievement.achievements}
          handleAccomplishedAchievement={() => handleAccomplishedAchievement(setAccomplishedAchievement)}
        />
      ) : null}

      {/* user actions */}
      <StoryActions
        to="/archives/stories"
        story={story}
        isMuted={isMuted}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsMuted={setIsMuted}
        setIsPlaying={setIsPlaying}
        handleCustomizationsVisible={() => handleCustomizationsVisible(setCustomizationsVisible)}
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
          setFontSize={setFontSize}
          setViewType={setViewType}
        />
      ) : null}

      {/* pages */}
      <div
        className="h-full w-full gap-5 bg-white rounded-2xl p-5 relative overflow-x-hidden 
                  overflow-y-auto cstm-w-limit transition-all  cstm-scrollbar"
      >
        <div className="w-full relative overflow-x-hidden h-full cstm-scrollbar">{storyPages}</div>
      </div>

      {/* left right button */}
      <PageNavigation activePage={activePage} pages={pages} viewType={viewType} setActivePage={setActivePage} />

      {story?.audio ? (
        <audio loop autoPlay ref={audioRef}>
          <source src={story.audio} />
        </audio>
      ) : null}
    </div>
  );
};

export default SingleStory;

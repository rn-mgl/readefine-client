"use client";
import React from "react";
import StorySinglePage from "@/src/src/components/stories/StorySinglePage";
import axios from "axios";
import Link from "next/link";
import Customizations from "@/src/src/components/stories/Customizations";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import Message from "@/src/src/components/global/Message";
import ReceiveAchievement from "@/src/src/client/achievements/ReceiveAchievement";
import ActionLabel from "@/src/src/components/global/ActionLabel";
import StoryDoublePage from "@/src/src/components/stories/StoryDoublePage";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { BsArrowLeft, BsFilter } from "react-icons/bs";
import { decipher } from "@/src/src/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

const SingleStory = ({ params }) => {
  const [story, setStory] = React.useState({});
  const [pages, setPages] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

  const [activePage, setActivePage] = React.useState(1);

  const [customizationsVisible, setCustomizationsVisible] = React.useState(true);
  const [fontSize, setFontSize] = React.useState(16);
  const [viewType, setViewType] = React.useState("single");

  const [accomplishedAchievement, setAccomplishedAchievement] = React.useState({
    accomplished: false,
    achievements: [],
  });

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decodedStoryId = decipher(params?.story_id);
  const router = useRouter();

  // handle next page
  const handleIncrement = () => {
    const increment = viewType === "single" ? 1 : 2;
    setActivePage((prev) => (prev + increment > pages.length ? pages.length : prev + increment));
  };

  // handle prev page
  const handleDecrement = () => {
    const decrement = viewType === "single" ? 1 : 2;
    setActivePage((prev) => (prev - decrement < 1 ? 1 : prev - decrement));
  };

  // handle font size onchange
  const handleFontSize = ({ value }) => {
    setFontSize(() => (value < 16 ? 16 : value > 100 ? 100 : parseInt(value)));
  };

  // track current page
  const handleActivePage = ({ value }) => {
    const newPage = parseInt(value);
    setActivePage(newPage < 1 ? 1 : newPage > pages.length ? pages.length : newPage);
  };

  // toggle can see filter or customizations
  const handleCustomizationsVisible = () => {
    setCustomizationsVisible((prev) => !prev);
  };

  // handle view type if single or double per page
  const handleViewType = (type) => {
    setViewType(type);
  };

  // reset achievement stats to close pop up reward window
  const handleAccomplishedAchievement = () => {
    setAccomplishedAchievement({
      accomplished: false,
      data: {},
    });
  };

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
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
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
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
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
            specifics: "book_count",
            toAdd: 1,
          },
          { headers: { Authorization: user?.token } }
        );

        // if there are achievements
        if (achievementData.length) {
          setAccomplishedAchievement({ accomplished: true, achievements: achievementData });
        }
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [decodedStoryId, url, user?.token]);

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
    const isExpired = isTokenExpired(user?.token.split(" ")[1]);

    if (isExpired) {
      router.push("/login");
    }
  }, [user?.token, router]);

  return (
    <div className="p-5 cstm-flex-col bg-accntColor w-full min-h-screen h-screen justify-start gap-2">
      <ClientPageHeader subHeader="Stories" mainHeader={story.title} />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {accomplishedAchievement.accomplished ? (
        <ReceiveAchievement
          achievements={accomplishedAchievement.achievements}
          handleAccomplishedAchievement={handleAccomplishedAchievement}
        />
      ) : null}

      {/* user actions */}
      <div className="cstm-flex-row w-full cstm-w-limit">
        <div className="w-full  cstm-flex-row mr-auto">
          <Link href="/archives/stories" className="w-fit cstm-bg-hover mr-auto">
            <BsArrowLeft className=" text-prmColor" />
          </Link>
        </div>

        <button onClick={handleCustomizationsVisible} className="cstm-bg-hover relative group">
          <ActionLabel label="Filter" />
          <BsFilter className="text-prmColor scale-150" />
        </button>
      </div>

      {/* can see customizations */}
      {customizationsVisible ? (
        <Customizations
          utterance={pages[activePage - 1]?.content}
          fontSize={fontSize}
          viewType={viewType}
          handleFontSize={handleFontSize}
          handleCustomizationsVisible={handleCustomizationsVisible}
          handleViewType={handleViewType}
        />
      ) : null}

      {/* pages */}
      <div
        className="h-[83%] t:h-[80%] w-full gap-5  bg-white rounded-2xl p-5 relative overflow-x-hidden 
                  overflow-y-auto cstm-w-limit transition-all  cstm-scrollbar"
      >
        <div className="w-full relative overflow-x-hidden h-full cstm-scrollbar">{storyPages}</div>
      </div>

      {/* left right button */}
      <div
        className="fixed bottom-0 left-2/4 -translate-x-2/4 backdrop-blur-md cstm-flex-row h-[5%] t:h-[6%]
                    p-2 px-5 z-20 w-full cstm-w-limit l-s:right-0 l-s:-translate-x-0"
      >
        <button onClick={handleDecrement} className="cstm-bg-hover">
          <BiChevronLeft className="scale-150 text-black  cursor-pointer t:scale-[2]" />
        </button>

        <input
          onChange={(e) => handleActivePage(e.target)}
          type="number"
          value={activePage}
          min={1}
          max={pages.length}
          className="text-sm mx-auto text-center w-16 rounded-md px-2 py-1 focus:outline-prmColor"
        />

        <button
          onClick={() => {
            handleIncrement();
            activePage >= pages.length - 1 && readStory();
          }}
          className="cstm-bg-hover"
        >
          <BiChevronRight className="scale-150 text-black  cursor-pointer t:scale-[2]" />
        </button>
      </div>
    </div>
  );
};

export default SingleStory;

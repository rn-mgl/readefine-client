"use client";
import React, { useRef } from "react";
import ActionLabel from "@/src/src/components/global/ActionLabel";
import StoryDoublePage from "@/src/src/components/stories/StoryDoublePage";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import StorySinglePage from "@/src/src/components/stories/StorySinglePage";
import axios from "axios";
import Link from "next/link";
import DeleteStory from "@/src/src/admin/stories/DeleteStory";
import Customizations from "@/src/src/components/stories/Customizations";
import Message from "@/src/src/components/global/Message";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { BsArrowLeft, BsFilter } from "react-icons/bs";

import { decipher } from "@/src/src/functions/security";

const SingleStory = ({ params }) => {
  const [story, setStory] = React.useState({});
  const [pages, setPages] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

  const [activePage, setActivePage] = React.useState(1);
  const [fontSize, setFontSize] = React.useState(16);

  const [viewType, setViewType] = React.useState("single");
  const [customizationsVisible, setCustomizationsVisible] = React.useState(true);

  const [canDeleteStory, setCanDeleteStory] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const decodedStoryId = decipher(params?.story_id);
  const user = session?.user?.name;

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
      <div className="w-full cstm-w-limit cstm-flex-row">
        <Link href="/controller/stories" className="w-fit cstm-bg-hover mr-auto">
          <BsArrowLeft className=" text-prmColor" />
        </Link>

        <Link href={`/controller/stories/edit/${params?.story_id}`} className="cstm-bg-hover">
          <AiFillEdit className=" text-prmColor cursor-pointer" />
        </Link>

        <button onClick={handleCanDeleteStory} className="cstm-bg-hover">
          <AiFillDelete className="text-prmColor cursor-pointer" />
        </button>

        <button onClick={handleCustomizationsVisible} className="cstm-bg-hover relative group">
          <ActionLabel label="Filter" />
          <BsFilter className="text-prmColor scale-150" />
        </button>
      </div>

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
        className="h-[80%] w-full gap-5  bg-white rounded-2xl p-5 relative overflow-x-hidden 
            overflow-y-auto cstm-w-limit transition-all  cstm-scrollbar"
      >
        <div className="w-full relative overflow-x-hidden h-full cstm-scrollbar">{storyPages}</div>
      </div>

      <div
        className="fixed bottom-0 left-2/4 -translate-x-2/4 backdrop-blur-md cstm-flex-row h-[5%] t:h-[6%]
                    p-2 px-5 z-20 w-full cstm-w-limit l-s:right-0 l-s:-translate-x-0"
      >
        <button disabled={activePage === 1} className="cstm-bg-hover disabled:opacity-50">
          <BiChevronLeft
            className={`scale-150 text-black  cursor-pointer t:scale-[2]`}
            onClick={handleDecrement}
            onKeyDown={(e) => handleDecrement(e)}
          />
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
          disabled={activePage === pages.length}
          className="cstm-bg-hover disabled:opacity-50"
        >
          <BiChevronRight
            className={`scale-150 text-black  cursor-pointer t:scale-[2]`}
            onClick={handleIncrement}
            onKeyDown={(e) => handleIncrement(e)}
          />
        </button>
      </div>
    </div>
  );
};

export default SingleStory;

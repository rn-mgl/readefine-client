"use client";
import React from "react";
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
import ActionLabel from "@/src/src/components/global/ActionLabel";
import StoryDoublePage from "@/src/src/components/stories/StoryDoublePage";

const SingleStory = ({ params }) => {
  const [story, setStory] = React.useState({});
  const [pages, setPages] = React.useState([]);
  const [activePage, setActivePage] = React.useState(1);
  const [fontSize, setFontSize] = React.useState(16);
  const [viewType, setViewType] = React.useState("single");
  const [customizationsVisible, setCustomizationsVisible] = React.useState(false);
  const [canDeleteStory, setCanDeleteStory] = React.useState(false);
  const [message, setMessage] = React.useState({ msg: "", active: false });

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const leftUtterance = pages[activePage - 1]?.content;
  const rightUtterance = pages[activePage]?.content;

  const handleIncrement = () => {
    const increment = viewType === "single" ? 1 : 2;
    setActivePage((prev) => (prev + increment > pages.length ? pages.length : prev + increment));
  };

  const handleDecrement = () => {
    const decrement = viewType === "single" ? 1 : 2;
    setActivePage((prev) => (prev - decrement < 1 ? 1 : prev - decrement));
  };

  const handleCanDeleteStory = () => {
    setCanDeleteStory((prev) => !prev);
  };

  const handleFontSize = ({ value }) => {
    setFontSize(() => (value < 16 ? 16 : value > 100 ? 100 : parseInt(value)));
  };

  const handleCustomizationsVisible = () => {
    setCustomizationsVisible((prev) => !prev);
  };

  const handleViewType = (type) => {
    setViewType(type);
  };

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

  const getPages = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_story_content`, {
        params: { story_id: params.story_id },
        headers: { Authorization: user.token },
      });
      if (data) {
        setPages(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, setPages, params]);

  const getStory = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_story/${params.story_id}`, {
        headers: { Authorization: user.token },
      });
      if (data) {
        setStory(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, setStory, params]);

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
    <div className="p-5 cstm-flex-col bg-accntColor w-full min-h-screen justify-start gap-2">
      <AdminPageHeader subHeader="Stories" mainHeader={story.title} />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {canDeleteStory ? (
        <DeleteStory
          confirmation={story?.title}
          handleCanDeleteStory={handleCanDeleteStory}
          storyId={story?.story_id}
        />
      ) : null}

      <div className="w-full cstm-w-limit cstm-flex-row">
        <Link href="/controller/stories" className="w-fit cstm-bg-hover mr-auto">
          <BsArrowLeft className=" text-prmColor" />
        </Link>

        <Link href={`/controller/stories/edit/${params.story_id}`} className="cstm-bg-hover">
          <AiFillEdit className=" text-prmColor cursor-pointer" />
        </Link>

        <div className="cstm-bg-hover">
          <AiFillDelete className="text-prmColor cursor-pointer" onClick={handleCanDeleteStory} />
        </div>
      </div>

      <button
        onClick={handleCustomizationsVisible}
        className="cstm-bg-hover relative group ml-auto"
      >
        <ActionLabel label="Filter" />
        <BsFilter className="text-prmColor scale-150" />
      </button>

      {customizationsVisible ? null : (
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
      )}

      <div className="w-full gap-5 h-[65vh] bg-white rounded-2xl p-5 relative overflow-x-hidden overflow-y-auto cstm-w-limit  cstm-scrollbar">
        <div className="cstm-scrollbar w-full relative overflow-x-hidden overflow-y-auto h-full">
          {storyPages}
        </div>

        <div className="fixed bottom-0 left-2/4 -translate-x-2/4 backdrop-blur-md cstm-flex-row p-2 px-5 z-20 w-full cstm-w-limit l-s:right-0 l-s:-translate-x-0">
          <button disabled={activePage === 1} className="cstm-bg-hover disabled:opacity-50">
            <BiChevronLeft
              className={`scale-150 text-black  cursor-pointer t:scale-[2]`}
              onClick={handleDecrement}
              onKeyDown={(e) => handleDecrement(e)}
            />
          </button>

          <p className="text-sm mx-auto">{activePage}</p>

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
    </div>
  );
};

export default SingleStory;

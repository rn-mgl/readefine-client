"use client";
import React from "react";

import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import StoryPage from "@/src/src/components/stories/StoryPage";
import axios from "axios";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import DeleteStory from "@/src/src/admin/stories/DeleteStory";

const SingleStory = ({ params }) => {
  const [story, setStory] = React.useState({});
  const [pages, setPages] = React.useState([]);
  const [activePage, setActivePage] = React.useState(1);
  const [canDeleteStory, setCanDeleteStory] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const handleIncrement = () => {
    setActivePage((prev) => (prev + 1 > pages.length ? 0 : prev + 1));
  };

  const handleDecrement = () => {
    setActivePage((prev) => (prev - 1 < 0 ? pages.length : prev - 1));
  };

  const handleCanDeleteStory = () => {
    setCanDeleteStory((prev) => !prev);
  };

  const storyPages = pages?.map((page, index) => {
    return (
      <div
        className="absolute left-2/4 -translate-x-2/4 w-full z-10 justify-start "
        key={page.content_id}
      >
        <StoryPage
          title={story?.title}
          activePage={activePage}
          page={page}
          index={index + 1}
          maxPage={pages.length}
        />
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

      <div className="w-full gap-5 max-h-screen h-[80vh] bg-white rounded-2xl p-5 relative overflow-x-hidden overflow-y-auto cstm-w-limit">
        <div
          className="cstm-bg-hover absolute bottom-3 
                      l-s:bottom-2/4 l-s:-translate-y-2/4 z-20"
        >
          <BiChevronLeft
            className="scale-150 text-black  cursor-pointer t:scale-[2]"
            onClick={handleDecrement}
            onKeyDown={(e) => handleDecrement(e)}
          />
        </div>

        {storyPages}

        <div
          className="cstm-bg-hover absolute bottom-3 right-5
                      l-s:bottom-2/4 l-s:-translate-y-2/4 z-20"
        >
          <BiChevronRight
            className="scale-150 text-black  cursor-pointer t:scale-[2]"
            onClick={handleIncrement}
            onKeyDown={(e) => handleIncrement(e)}
          />
        </div>

        <p className="absolute bottom-4 left-2/4 -translate-x-2/4 text-sm">{activePage}</p>
      </div>
    </div>
  );
};

export default SingleStory;

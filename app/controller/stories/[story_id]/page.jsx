"use client";
import React from "react";

import AdminPageHeader from "@/src/components/src/admin/global/PageHeader";
import StoryPage from "@/src/components/src/components/stories/StoryPage";
import axios from "axios";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/components/context";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import DeleteStory from "@/src/components/src/admin/stories/DeleteStory";

const SingleStory = ({ params }) => {
  const [story, setStory] = React.useState({});
  const [pages, setPages] = React.useState([]);
  const [activePage, setActivePage] = React.useState(0);
  const [canDeleteStory, setCanDeleteStory] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const handleIncrement = (e) => {
    setActivePage((prev) => (prev + 1 > pages.length - 1 ? 0 : prev + 1));
  };

  const handleDecrement = (e) => {
    setActivePage((prev) => (prev - 1 < 0 ? pages.length - 1 : prev - 1));
  };

  const handleCanDeleteStory = () => {
    setCanDeleteStory((prev) => !prev);
  };

  const storyPages = pages.map((page, index) => {
    return (
      <div
        className="absolute left-2/4 -translate-x-2/4 w-full z-10 justify-start "
        key={page.content_id}
      >
        <StoryPage activePage={activePage} page={page} index={index} maxPage={pages.length} />
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
    <div className="p-5 cstm-flex-col bg-accntColor w-full min-h-screen justify-start gap-5">
      <AdminPageHeader subHeader="Stories" mainHeader={story.title} />

      {canDeleteStory ? (
        <DeleteStory
          confirmation={story?.title}
          handleCanDeleteStory={handleCanDeleteStory}
          story_id={story?.story_id}
        />
      ) : null}

      <div
        className="w-full l-s:w-[70%] l-s:ml-auto cstm-flex-row
                    l-l:w-[80%]"
      >
        <Link
          href="/controller/stories"
          className="w-fit hover:bg-black hover:bg-opacity-10 p-2 rounded-full mr-auto"
        >
          <BsArrowLeft className=" text-prmColor" />
        </Link>

        <Link
          href={`/controller/stories/edit/${params.story_id}`}
          className="hover:bg-black hover:bg-opacity-10 p-2 rounded-full"
        >
          <AiFillEdit className=" text-prmColor" />
        </Link>

        <div className="hover:bg-black hover:bg-opacity-10 p-2 rounded-full">
          <AiFillDelete className=" text-prmColor" onClick={handleCanDeleteStory} />
        </div>
      </div>

      <div
        className="w-full gap-5 min-h-screen bg-white rounded-2xl h-full p-2 relative overflow-x-hidden overflow-y-auto
                    l-s:w-[70%] l-s:ml-auto
                    l-l:w-[80%]"
      >
        {storyPages}
      </div>

      <div
        className="cstm-flex-row gap-5 mt-auto  
                    l-s:w-[70%] l-s:ml-auto
                    l-l:w-[80%]"
      >
        <BiChevronLeft
          className="scale-150 cursor-pointer"
          onClick={handleDecrement}
          onKeyDown={(e) => handleDecrement(e)}
        />
        <p className="mt-auto">{activePage + 1}</p>
        <BiChevronRight
          className="scale-150 cursor-pointer"
          onClick={handleIncrement}
          onKeyDown={(e) => handleIncrement(e)}
        />
      </div>
    </div>
  );
};

export default SingleStory;

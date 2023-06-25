"use client";
import React from "react";
import StoryPage from "@/src/src/components/stories/StoryPage";
import axios from "axios";
import Link from "next/link";
import Customizations from "@/src/src/components/stories/Customizations";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import Message from "@/src/src/components/global/Message";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { BsArrowLeft } from "react-icons/bs";

const SingleStory = ({ params }) => {
  const [story, setStory] = React.useState({});
  const [pages, setPages] = React.useState([]);
  const [activePage, setActivePage] = React.useState(1);
  const [fontSize, setFontSize] = React.useState(16);
  const [message, setMessage] = React.useState({ msg: "", active: false });

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const storyId = params?.story_id;

  const handleIncrement = () => {
    setActivePage((prev) => (prev + 1 > pages.length ? pages.length : prev + 1));
  };

  const handleDecrement = () => {
    setActivePage((prev) => (prev - 1 < 1 ? 1 : prev - 1));
  };

  const handleFontSize = ({ value }) => {
    setFontSize(() => (value < 16 ? 16 : value > 100 ? 100 : parseInt(value)));
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
          fontSize={fontSize}
        />
      </div>
    );
  });

  const getPages = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/story_content`, {
        params: { storyId },
        headers: { Authorization: user.token },
      });
      if (data) {
        setPages(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, setPages, storyId]);

  const getStory = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/story/${storyId}`, {
        headers: { Authorization: user.token },
      });
      if (data) {
        setStory(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, setStory, storyId]);

  const readStory = async () => {
    try {
      const { data } = await axios.post(
        `${url}/read_story`,
        { storyId },
        { headers: { Authorization: user?.token } }
      );
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  };

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
      <ClientPageHeader subHeader="Stories" mainHeader={story.title} />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      <div className="w-full cstm-w-limit cstm-flex-row">
        <Link href="/archives/stories" className="w-fit cstm-bg-hover mr-auto">
          <BsArrowLeft className=" text-prmColor" />
        </Link>
      </div>
      <Customizations fontSize={fontSize} handleFontSize={handleFontSize} />
      <div className="w-full  gap-5 h-[55vh] t:h-[60vh] bg-white rounded-2xl p-5  cstm-w-limit">
        <div className="cstm-scrollbar w-full relative overflow-x-hidden overflow-y-auto h-full">
          {storyPages}
        </div>

        <div className="fixed bottom-0 left-2/4 -translate-x-2/4 backdrop-blur-md cstm-flex-row p-2 px-5 z-20 w-full cstm-w-limit l-s:right-0 l-s:-translate-x-0">
          <div className="cstm-bg-hover">
            <BiChevronLeft
              className="scale-150 text-black  cursor-pointer t:scale-[2]"
              onClick={handleDecrement}
            />
          </div>

          <p className="text-sm mx-auto">{activePage}</p>

          <div className="cstm-bg-hover">
            <BiChevronRight
              className="scale-150 text-black  cursor-pointer t:scale-[2]"
              onClick={() => {
                handleIncrement();
                activePage === pages.length - 1 && readStory();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStory;

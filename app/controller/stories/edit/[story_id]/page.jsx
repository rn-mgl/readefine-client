"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import axios from "axios";
import FilePreview from "@/src/src/components/global/FilePreview";
import Message from "@/src/src/components/global/Message";
import * as fileFns from "../../../../../src/functions/fileFns";
import EditStoryPage from "@/src/src/admin/stories/EditStoryPage";
import EditStoryFilter from "@/src/src/admin/stories/EditStoryFilter";
import Link from "next/link";

import { IoAddOutline } from "react-icons/io5";
import { BsArrowLeft } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";
import { decipher } from "@/src/src/functions/security";

const EditStory = ({ params }) => {
  const [story, setStory] = React.useState({});
  const [pages, setPages] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false });

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decodedStoryId = decipher(params?.story_id);
  const router = useRouter();

  const handlePage = (page, { name, value }) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.page === page) {
          return {
            ...p,
            [name]: value,
          };
        }
        return p;
      })
    );
  };

  const handleStory = ({ name, value }) => {
    setStory((prev) => {
      return {
        ...prev,
        book_cover: name === "file" ? null : prev.book_cover,
        [name]: value,
      };
    });
  };

  const addPage = () => {
    setPages((prev) => {
      const newPage = {
        pageNumber: pages.length + 1,
        pageHeader: "",
        pageContent: "",
        file: { src: null, name: null },
        rawFile: null,
      };
      return [...prev, newPage];
    });
  };

  const clearBookCover = () => {
    setStory((prev) => {
      return {
        ...prev,
        book_cover: null,
      };
    });
  };

  const allPages = pages.map((page) => {
    return (
      <React.Fragment key={page.page}>
        <EditStoryPage
          page={page}
          handlePage={handlePage}
          setPages={setPages}
          maxPages={pages.length}
        />
      </React.Fragment>
    );
  });

  const editBook = async (e) => {
    e.preventDefault();

    let bookCover = null;

    if (story.rawFile) {
      bookCover = await fileFns.uploadFile(
        `${url}/readefine_admin_file`,
        story.rawFile,
        user.token,
        axios
      );
      story.file = { src: bookCover, name: "" };
    }

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      let pageImage = null;
      if (page.rawFile) {
        pageImage = await fileFns.uploadFile(
          `${url}/readefine_admin_file`,
          page.rawFile,
          user.token,
          axios
        );
        page.file = { src: pageImage, name: "" };
      }
    }

    try {
      const { data } = await axios.patch(
        `${url}/admin_story/${decodedStoryId}`,
        { pages, story },
        { headers: { Authorization: user.token } }
      );

      if (data) {
        router.push("/controller/stories");
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  };

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
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, setPages, decodedStoryId]);

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
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, setStory, decodedStoryId]);

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
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-2 justify-start">
      <AdminPageHeader subHeader="Stories" mainHeader="Edit Story" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      <form
        className="w-full cstm-flex-col gap-2 cstm-w-limit border-collapse"
        onSubmit={(e) => editBook(e)}
      >
        <Link type="button" href="/controller/stories" className="w-fit cstm-bg-hover mr-auto">
          <BsArrowLeft className=" text-prmColor" />
        </Link>
        <EditStoryFilter
          addPage={addPage}
          handleStory={handleStory}
          story={story}
          setStory={setStory}
          selectedFileViewer={fileFns.selectedFileViewer}
        />
        {story.book_cover || story.file?.src ? (
          <FilePreview
            src={story.book_cover ? story.book_cover : story.file?.src}
            name={story.file?.name}
            clearFiles={() => {
              clearBookCover();
              fileFns.clearFiles(setStory);
            }}
            purpose="Book Cover"
          />
        ) : null}

        {allPages}

        <div className="cstm-flex-row w-full ">
          <button onClick={addPage} className="cstm-bg-hover mr-auto">
            <IoAddOutline className="cursor-pointer text-prmColor scale-150" />
          </button>
          <button
            type="submit"
            className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-scndColor text-prmColor rounded-full p-2 px-4
                t:text-base"
          >
            Edit Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStory;

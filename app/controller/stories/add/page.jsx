"use client";
import React from "react";
import AddStoryFilter from "@/src/src/admin/stories/AddStoryFilter";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import AddStoryPage from "@/src/src/admin/stories/AddStoryPage";
import axios from "axios";
import FilePreview from "@/src/src/components/global/FilePreview";
import Message from "@/src/src/components/global/Message";
import * as fileFns from "../../../../src/functions/fileFns";

import { IoAddOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";
import Loading from "@/src/src/components/global/Loading";

const AddStory = () => {
  const [pages, setPages] = React.useState([
    {
      pageNumber: 1,
      pageHeader: "",
      pageContent: "",
      file: { src: null, name: null },
      rawFile: null,
    },
  ]);
  const [storyFilter, setStoryFilter] = React.useState({
    title: "",
    author: "",
    genre: "",
    lexile: "",
    file: { src: null, name: null },
    rawFile: null,
  });
  const [message, setMessage] = React.useState({ msg: "", active: false });
  const [loading, setLoading] = React.useState(false);

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

  // handle on change story data
  const handleStoryFilter = ({ name, value }) => {
    setStoryFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle page on change functions
  const handlePage = (page, { name, value }) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.pageNumber === page) {
          return {
            ...p,
            [name]: value,
          };
        }
        return p;
      })
    );
  };

  // handle add page
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

  // handle delete page
  const deletePage = (index) => {
    const newPages = [...pages];

    newPages.splice(index, 1);

    for (let i = index; i < newPages.length; i++) {
      newPages[i].pageNumber = i + 1;
    }

    setPages(newPages);
  };

  // publish book
  const publishBook = async (e) => {
    e.preventDefault();

    setLoading(true);

    // book image
    let bookCover = null;

    // check if has book cover image
    if (storyFilter.rawFile) {
      bookCover = await fileFns.uploadFile(
        `${url}/readefine_admin_file`,
        storyFilter.rawFile,
        user.token,
        axios
      );
      storyFilter.file = { src: bookCover, name: "" };
    }

    // check for images in each pages and upload
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
      const { data } = await axios.post(
        `${url}/admin_story`,
        { pages, storyFilter },
        { headers: { Authorization: user.token } }
      );

      // if uploaded, go to stories page
      if (data) {
        router.push("/controller/stories");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  };

  // map pages
  const allPages = pages.map((page, i) => {
    return (
      <React.Fragment key={page.pageNumber}>
        <AddStoryPage
          page={page}
          maxPages={pages.length}
          deletePage={() => deletePage(i)}
          handlePage={handlePage}
          setPages={setPages}
        />
      </React.Fragment>
    );
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Stories" mainHeader="Add Story" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <form
        action=""
        className="w-full cstm-flex-col gap-2 cstm-w-limit border-collapse"
        onSubmit={(e) => publishBook(e)}
      >
        <AddStoryFilter
          addPage={addPage}
          handleStoryFilter={handleStoryFilter}
          storyFilter={storyFilter}
          setStoryFilter={setStoryFilter}
          selectedFileViewer={fileFns.selectedFileViewer}
        />

        {storyFilter.file.src ? (
          <FilePreview
            src={storyFilter.file.src}
            name={storyFilter.file.name}
            clearFiles={() => fileFns.clearFiles(setStoryFilter)}
            purpose="Book Cover"
          />
        ) : null}

        {allPages}

        <div className="cstm-flex-row w-full ">
          <button type="button" onClick={addPage} className="cstm-bg-hover mr-auto">
            <IoAddOutline className="cursor-pointer text-prmColor scale-150" />
          </button>

          <button
            type="submit"
            className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 px-4 t:px-10"
          >
            Publish Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStory;

"use client";
import React from "react";
import AddStoryFilter from "@/src/src/admin/stories/AddStoryFilter";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import AddStoryPage from "@/src/src/admin/stories/AddStoryPage";
import axios from "axios";
import FilePreview from "@/src/src/components/global/FilePreview";
import { IoAddOutline } from "react-icons/io5";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";

import * as fileFns from "../../../../src/functions/fileFns";

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
  const { data: session } = useSession({ required: true });

  const user = session?.user?.name;
  const router = useRouter();
  const { url } = useGlobalContext();

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

  const handleStoryFilter = ({ name, value }) => {
    setStoryFilter((prev) => {
      return {
        ...prev,
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

  const publishBook = async (e) => {
    e.preventDefault();

    let bookCover = null;

    if (storyFilter.rawFile) {
      bookCover = await fileFns.uploadFile(url, storyFilter.rawFile, user.token, axios);
      storyFilter.file = { src: bookCover, name: "" };
    }

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      let pageImage = null;
      if (page.rawFile) {
        pageImage = await fileFns.uploadFile(url, page.rawFile, user.token, axios);
        page.file = { src: pageImage, name: "" };
      }
    }

    try {
      const { data } = await axios.post(
        `${url}/admin_story`,
        { pages, storyFilter },
        { headers: { Authorization: user.token } }
      );

      if (data) {
        router.push("/controller/stories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const allPages = pages.map((page) => {
    return (
      <React.Fragment key={page.pageNumber}>
        <AddStoryPage
          page={page}
          handlePage={handlePage}
          setPages={setPages}
          maxPages={pages.length}
        />
      </React.Fragment>
    );
  });

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Stories" mainHeader="Add Story" />

      <form
        action=""
        className="w-full cstm-flex-col gap-2 l-s:w-[70%] l-s:ml-auto border-collapse
                l-l:w-[80%]"
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
          <div className="hover:bg-black hover:bg-opacity-10 transition-all rounded-full p-2 mr-auto">
            <IoAddOutline onClick={addPage} className="cursor-pointer text-prmColor scale-150" />
          </div>
          <button
            type="submit"
            className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 px-4
                t:text-base"
          >
            Publish Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStory;

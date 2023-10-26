"use client";
import React from "react";
import AddStoryFilter from "@/admin/stories/AddStoryFilter";
import AdminPageHeader from "@/admin/global/PageHeader";
import AddStoryPage from "@/admin/stories/AddStoryPage";
import axios from "axios";
import FilePreview from "@/components/global/FilePreview";
import Message from "@/components/global/Message";
import Loading from "@/components/global/Loading";

import { IoAddOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/base/context";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import AudioPreview from "@/components/global/AudioPreview";
import { useFileControls } from "@/hooks/useFileControls";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import useAdminActivities from "@/src/hooks/useAdminActivities";

const AddStory = () => {
  const [pages, setPages] = React.useState([
    {
      pageNumber: 1,
      pageHeader: "",
      pageContent: "",
      pageImage: { src: null, name: null },
      rawPageImage: null,
    },
  ]);
  const [storyFilter, setStoryFilter] = React.useState({
    title: "",
    author: "",
    genre: "",
    lexile: "",
  });

  const {
    imageFile,
    rawImage,
    audioFile,
    rawAudio,
    selectedImageViewer,
    selectedAudioViewer,
    removeSelectedImage,
    removeSelectedAudio,
    uploadFile,
    hasRawAudio,
    hasRawImage,
  } = useFileControls();

  const { createAdminActivity } = useAdminActivities();

  const { message, setMessageStatus } = useMessage();

  const { loading, setLoadingState } = useLoading(false);

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
        pageImage: { src: null, name: null },
        rawPageImage: null,
      };
      return [...prev, newPage];
    });
  };

  // handle delete page
  const deletePage = (pageNumber) => {
    const updatedPages = pages.filter((page) => page.pageNumber !== pageNumber);

    // use pageNumber - 1 because 0 indexed based on array and pageNumber is 1 indexed
    for (let i = pageNumber - 1; i < updatedPages.length; i++) {
      const currPage = updatedPages[i];
      currPage.pageNumber = i + 1;
    }

    setPages(updatedPages);
  };

  // publish book
  const publishBook = async (e) => {
    e.preventDefault();
    setLoadingState(true);

    // book image
    let bookCover = null;

    if (hasRawImage()) {
      bookCover = await uploadFile("readefine_admin_file", rawImage.current?.files);
    } else {
      setLoadingState(false);
      setMessageStatus(true, "You did not add a book cover.", "error");
      return;
    }

    storyFilter.bookCover = bookCover;

    // book audio
    let bookAudio = null;

    if (hasRawAudio()) {
      bookAudio = await uploadFile("readefine_admin_file", rawAudio.current?.files);
    }

    storyFilter.bookAudio = bookAudio;

    // check for images in each pages and upload
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      let pageImage = null;

      if (page.rawPageImage) {
        pageImage = await uploadFile("readefine_admin_file", page.rawPageImage);
      }
      page.pageImage = pageImage;
    }

    try {
      const { data } = await axios.post(
        `${url}/admin_story`,
        { pages, storyFilter },
        { headers: { Authorization: user.token } }
      );

      // if uploaded, go to stories page
      if (data) {
        const adminActivity = await createAdminActivity("story", storyFilter.title, "C");

        if (adminActivity) {
          router.push("/controller/stories");
        }
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  // map pages
  const allPages = pages.map((page, i) => {
    return (
      <React.Fragment key={page.pageNumber}>
        <AddStoryPage
          index={i}
          page={page}
          maxPages={pages.length}
          deletePage={() => deletePage(page.pageNumber)}
          handlePage={handlePage}
          setPages={setPages}
          setMessageStatus={setMessageStatus}
        />
      </React.Fragment>
    );
  });

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="p-4 bg-accntColor w-full min-h-screen cstm-flex-col gap-4 justify-start">
      {loading ? <Loading /> : null}

      <AdminPageHeader subHeader="Stories" mainHeader="Add Story" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <form
        action=""
        className="w-full cstm-flex-col gap-4 cstm-w-limit border-collapse"
        onSubmit={(e) => publishBook(e)}
      >
        <AddStoryFilter
          storyFilter={storyFilter}
          rawAudio={rawAudio}
          rawImage={rawImage}
          addPage={addPage}
          handleStoryFilter={handleStoryFilter}
          selectedImageViewer={selectedImageViewer}
          selectedAudioViewer={selectedAudioViewer}
          setMessageStatus={setMessageStatus}
        />

        <div className="cstm-flex-col gap-4 w-full t:w-96 l-l:w-[30rem]">
          {audioFile.src ? (
            <AudioPreview
              src={audioFile.src}
              name={audioFile.name}
              clearAudio={removeSelectedAudio}
              purpose="Book Audio"
            />
          ) : null}

          {imageFile.src ? (
            <FilePreview
              src={imageFile.src}
              name={imageFile.name}
              clearFiles={removeSelectedImage}
              purpose="Book Cover"
            />
          ) : null}
        </div>

        {allPages}

        <div className="cstm-flex-row w-full ">
          <button type="button" onClick={addPage} className="cstm-bg-hover mr-auto">
            <IoAddOutline className="cursor-pointer text-prmColor scale-150" />
          </button>

          <button
            type="submit"
            className="w-fit text-center  ml-auto text-sm font-normal 
                      bg-prmColor text-accntColor rounded-full p-2 px-4 t:px-10"
          >
            Publish Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStory;

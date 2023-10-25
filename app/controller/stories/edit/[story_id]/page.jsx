"use client";
import React from "react";
import AdminPageHeader from "@/admin/global/PageHeader";
import axios from "axios";
import FilePreview from "@/components/global/FilePreview";
import Message from "@/components/global/Message";
import EditStoryPage from "@/admin/stories/EditStoryPage";
import EditStoryFilter from "@/admin/stories/EditStoryFilter";
import Link from "next/link";
import Loading from "@/components/global/Loading";

import AudioPreview from "@/components/global/AudioPreview";

import { IoAddOutline, IoClose } from "react-icons/io5";
import { BsArrowLeft } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/base/context";
import { useRouter } from "next/navigation";
import { decipher } from "@/functions/security";
import { isTokenExpired } from "@/functions/jwtFns";
import { useFileControls } from "@/hooks/useFileControls";
import Image from "next/image";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";

const EditStory = ({ params }) => {
  const [story, setStory] = React.useState({});
  const [pages, setPages] = React.useState([]);
  const [toDelete, setToDelete] = React.useState([]);

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

  const { message, setMessageStatus } = useMessage();

  const { loading, setLoadingState } = useLoading(false);

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decodedStoryId = decipher(params?.story_id);
  const router = useRouter();

  // handle onchange function on pages
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

  // handle story data
  const handleStory = ({ name, value }) => {
    setStory((prev) => {
      return {
        ...prev,
        book_cover: name === "file" ? null : prev.book_cover,
        [name]: value,
      };
    });
  };

  // add page function
  const addPage = () => {
    setPages((prev) => {
      const newPage = {
        page: pages.length + 1,
        header: "",
        content: "",
        story_id: story.story_id,
        pageImage: { src: null, name: null },
        rawPageImage: null,
      };
      return [...prev, newPage];
    });
  };

  // handle delete page
  const deletePage = (contentId, pageNumber) => {
    const updatedPages = pages.filter((page) => page.page !== pageNumber);
    const updatedToDelete = [...toDelete];

    for (let i = pageNumber - 1; i < updatedPages.length; i++) {
      const currPage = updatedPages[i];
      currPage.page = i + 1;
    }

    if (contentId && !updatedToDelete.includes(contentId)) {
      updatedToDelete.push(contentId);
    }

    setToDelete(updatedToDelete);
    setPages(updatedPages);
  };

  // remove book cover
  const clearBookCover = () => {
    setStory((prev) => {
      return {
        ...prev,
        book_cover: null,
      };
    });
  };

  // remove book audio
  const clearBookAudio = () => {
    setStory((prev) => {
      return {
        ...prev,
        audio: null,
      };
    });
  };

  // edit book
  const editBook = async (e) => {
    e.preventDefault();

    setLoadingState(true);

    const uploadErrors = [];

    // check for book cover
    let bookCover = story.book_cover;

    if (hasRawImage()) {
      try {
        bookCover = await uploadFile("readefine_admin_file", rawImage.current?.files);
      } catch (error) {
        uploadErrors.push(error);
      }
    }

    if (!bookCover) {
      setLoadingState(false);
      setMessageStatus(true, "You did not put a book cover.", "error");
      return;
    }

    story.bookCover = bookCover;

    // check for book audio
    let bookAudio = story.audio;

    if (hasRawAudio()) {
      try {
        bookAudio = await uploadFile("readefine_admin_file", rawAudio.current?.files);
      } catch (error) {
        uploadErrors.push(error);
      }
    }

    story.bookAudio = bookAudio;

    // check for each pages for images
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      let pageImage = page.image;

      if (page.rawPageImage) {
        try {
          pageImage = await uploadFile("readefine_admin_file", page.rawPageImage);
        } catch (error) {
          uploadErrors.push(error);
        }
      }
      page.pageImage = pageImage;
    }

    const numberOfErrors = uploadErrors.length;

    if (numberOfErrors > 0) {
      for (const error of uploadErrors) {
        console.log(error);
      }
      setLoadingState(false);
      setMessageStatus(
        true,
        `${numberOfErrors} ${
          numberOfErrors > 1 ? "errors" : "error"
        } occurred in file upload. Please check file size or file type.`,
        "error"
      );
      return;
    }

    try {
      const { data } = await axios.patch(
        `${url}/admin_story/${decodedStoryId}`,
        { pages, story, toDelete },
        { headers: { Authorization: user.token } }
      );

      // if edited, move to stories page
      if (data) {
        router.push("/controller/stories");
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  // get pages
  const getPages = React.useCallback(async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/admin_story_content`, {
          params: { storyId: decodedStoryId },
          headers: { Authorization: user?.token },
        });
        if (data) {
          setPages(data);
        }
      } catch (error) {
        console.log(error);
        setMessageStatus(true, error?.response?.data?.msg, "error");
      }
    }
  }, [url, user?.token, decodedStoryId, setMessageStatus]);
  // get story
  const getStory = React.useCallback(async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/admin_story/${decodedStoryId}`, {
          headers: { Authorization: user?.token },
        });
        if (data) {
          setStory(data);
        }
      } catch (error) {
        console.log(error);
        setMessageStatus(true, error?.response?.data?.msg, "error");
      }
    }
  }, [url, user?.token, decodedStoryId, setMessageStatus]);

  // map pages
  const allPages = pages.map((page, i) => {
    return (
      <React.Fragment key={page.page}>
        <EditStoryPage
          page={page}
          index={i}
          maxPages={pages.length}
          handlePage={handlePage}
          setPages={setPages}
          deletePage={() => deletePage(page.content_id, page.page)}
          setMessageStatus={setMessageStatus}
        />
      </React.Fragment>
    );
  });

  React.useEffect(() => {
    getStory();
  }, [getStory]);

  React.useEffect(() => {
    getPages();
  }, [getPages]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-4 justify-start">
      {loading ? <Loading /> : null}

      <AdminPageHeader subHeader="Stories" mainHeader="Edit Story" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <form className="w-full cstm-flex-col gap-4 cstm-w-limit border-collapse" onSubmit={(e) => editBook(e)}>
        <Link type="button" href="/controller/stories" className="w-fit cstm-bg-hover mr-auto">
          <BsArrowLeft className=" text-prmColor" />
        </Link>

        <EditStoryFilter
          story={story}
          rawAudio={rawAudio}
          rawImage={rawImage}
          addPage={addPage}
          handleStory={handleStory}
          selectedImageViewer={selectedImageViewer}
          selectedAudioViewer={selectedAudioViewer}
          setMessageStatus={setMessageStatus}
        />

        <div className="cstm-flex-col gap-4 w-full t:w-80 l-l:w-[30rem]">
          {audioFile.src ? (
            <AudioPreview
              src={audioFile.src}
              name={audioFile.name}
              clearAudio={removeSelectedAudio}
              purpose="Book Audio"
            />
          ) : story?.audio ? (
            <AudioPreview src={story?.audio} clearAudio={clearBookAudio} purpose="Current Book Audio" />
          ) : null}

          {imageFile.src ? (
            <FilePreview
              src={imageFile.src}
              name={imageFile.name}
              clearFiles={removeSelectedImage}
              purpose="Book Cover"
            />
          ) : story?.book_cover ? (
            <div className="w-full cstm-flex-col rounded-2xl p-2 gap-2">
              <Image
                src={story?.book_cover}
                alt="viewer"
                width={350}
                height={350}
                className="w-full rounded-2xl"
                draggable={false}
                priority
              />

              <div className="w-full cstm-flex-row gap-4">
                <p className="text-sm overflow-x-auto w-full mr-auto p-2 whitespace-nowrap scrollbar-none font-bold">
                  Current Book Cover
                </p>

                <button type="button" onClick={clearBookCover} className="cstm-bg-hover ">
                  <IoClose className="text-prmColor scale-125 cursor-pointer " />
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {allPages}

        <div className="cstm-flex-row w-full ">
          <button type="button" onClick={addPage} className="cstm-bg-hover mr-auto">
            <IoAddOutline className="cursor-pointer text-prmColor scale-150" />
          </button>

          <button
            type="submit"
            className="w-fit text-center  ml-auto text-sm font-normal bg-scndColor text-prmColor rounded-full p-2 px-4 t:px-10"
          >
            Edit Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStory;

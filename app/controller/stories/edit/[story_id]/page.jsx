"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import axios from "axios";
import FilePreview from "@/src/src/components/global/FilePreview";
import Message from "@/src/src/components/global/Message";
import EditStoryPage from "@/src/src/admin/stories/EditStoryPage";
import EditStoryFilter from "@/src/src/admin/stories/EditStoryFilter";
import Link from "next/link";
import Loading from "@/src/src/components/global/Loading";

import AudioPreview from "@/src/src/components/global/AudioPreview";

import { IoAddOutline, IoClose } from "react-icons/io5";
import { BsArrowLeft } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";
import { decipher } from "@/src/src/functions/security";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import { useFileControls } from "@/src/src/hooks/useFileControls";
import Image from "next/image";

const EditStory = ({ params }) => {
  const [story, setStory] = React.useState({});
  const [pages, setPages] = React.useState([]);
  const [toDelete, setToDelete] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });
  const [loading, setLoading] = React.useState(false);

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
        file: { src: null, name: null },
        rawFile: null,
      };
      return [...prev, newPage];
    });
  };

  // handle delete page
  const deletePage = (contentId, index) => {
    const updatePages = [...pages];
    const updateToDelete = [...toDelete];

    updatePages.splice(index, 1);

    for (let i = index; i < updatePages.length; i++) {
      updatePages[i].page = i + 1;
    }

    if (contentId && !updateToDelete.includes(contentId)) {
      updateToDelete.push(contentId);
    }

    setToDelete(updateToDelete);
    setPages(updatePages);
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

    setLoading(true);

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
      setLoading(false);
      setMessage({ active: true, msg: "You did not put a book cover.", type: "error" });
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
      setLoading(false);
      setMessage({
        active: true,
        msg: `${numberOfErrors} ${
          numberOfErrors > 1 ? "errors" : "error"
        } occurred in file upload. Please check file size or file type.`,
        type: "error",
      });
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
      setLoading(false);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
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
        setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
      }
    }
  }, [url, user?.token, decodedStoryId]);

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
        setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
      }
    }
  }, [url, user?.token, decodedStoryId]);

  // map pages
  const allPages = pages.map((page, i) => {
    return (
      <React.Fragment key={page.page}>
        <EditStoryPage
          page={page}
          maxPages={pages.length}
          handlePage={handlePage}
          setPages={setPages}
          deletePage={() => deletePage(page.content_id, i)}
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Stories" mainHeader="Edit Story" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <form className="w-full cstm-flex-col gap-5 cstm-w-limit border-collapse" onSubmit={(e) => editBook(e)}>
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
        />

        <div className="cstm-flex-col gap-5 w-full t:w-80 l-l:w-[30rem]">
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

              <div className="w-full cstm-flex-row gap-5">
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
            className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-scndColor text-prmColor rounded-full p-2 px-4 t:px-10"
          >
            Edit Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStory;

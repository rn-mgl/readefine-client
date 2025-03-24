"use client";
import AdminPageHeader from "@/admin/global/PageHeader";
import EditStoryFilter from "@/admin/stories/EditStoryFilter";
import EditStoryPage from "@/admin/stories/EditStoryPage";
import Loading from "@/components/global/Loading";
import Message from "@/components/global/Message";
import axios from "axios";
import Link from "next/link";
import React from "react";

import { isTokenExpired } from "@/functions/jwtFns";

import { useFileControls } from "@/hooks/useFileControls";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import EditStoryCard from "@/src/admin/stories/EditStoryCard";
import StoryRequirementIndicator from "@/src/admin/stories/StoryRequirementIndicator";
import useAdminActivities from "@/src/hooks/useAdminActivities";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { IoAddOutline, IoClose } from "react-icons/io5";

const EditStory = ({ params }) => {
  const [story, setStory] = React.useState({});
  const [pages, setPages] = React.useState([]);
  const [toDelete, setToDelete] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(0);
  const [slidePage, setSlidePage] = React.useState(0);

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
  const url = process.env.NEXT_PUBLIC_API_URL;
  const user = session?.user?.name;
  const decodedStoryId = params?.story_id;
  const router = useRouter();
  const pagePerSlide = 9;

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

  // handle selected card
  const handleSelectedCard = (page) => {
    setSelectedCard((prev) => (prev === page ? 0 : page));
  };

  // handle slide page
  const handleSlidePage = (page) => {
    setSlidePage(page);
  };

  // handle next slide page
  const handleNextSlidePage = () => {
    const lastPage = Math.floor(pages.length / pagePerSlide);
    setSlidePage((prev) => (prev + 1 > lastPage ? lastPage : prev + 1));
  };

  // handle prev slide page
  const handlePrevSlidePage = () => {
    setSlidePage((prev) => (prev - 1 < 0 ? 0 : prev - 1));
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
  const handleAddPage = () => {
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
  const handleDeletePage = (contentId, pageNumber) => {
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
        bookCover = await uploadFile(
          "readefine_admin_file",
          rawImage.current?.files
        );
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
        bookAudio = await uploadFile(
          "readefine_admin_file",
          rawAudio.current?.files
        );
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
          pageImage = await uploadFile(
            "readefine_admin_file",
            page.rawPageImage
          );
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
        const activityData = await createAdminActivity(
          "story",
          story?.title,
          "U"
        );

        if (activityData) {
          router.push("/controller/stories");
        }
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
        const { data } = await axios.get(
          `${url}/admin_story/${decodedStoryId}`,
          {
            headers: { Authorization: user?.token },
          }
        );
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
  const mappedPages = pages
    .slice(slidePage * pagePerSlide, slidePage * pagePerSlide + pagePerSlide)
    .map((page, i) => {
      const pageImage = page.pageImage?.name
        ? page.pageImage?.name
        : page.image
        ? "has page image"
        : null;
      return (
        <React.Fragment key={page.page}>
          <EditStoryCard
            pageNumber={page.page}
            pageHeader={page.header}
            pageContent={page.content}
            pageFileName={pageImage}
            handleDeletePage={() =>
              handleDeletePage(page.content_id, page.page)
            }
            handleSelectedCard={() => handleSelectedCard(page.page)}
          />
        </React.Fragment>
      );
    });

  const mappedSlidePages = new Array(Math.ceil(pages.length / pagePerSlide))
    .fill(0)
    .map((page, index) => {
      return (
        <button
          type="button"
          onClick={() => handleSlidePage(index)}
          className={` p-2 rounded-md w-10 border-2
                    min-w-[2.5rem] text-xs font-medium 
                    ${
                      slidePage === index
                        ? "bg-prmColor text-white"
                        : "bg-white"
                    } `}
          key={index}
        >
          {index}
        </button>
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
    <div className="p-4 bg-accntColor w-full min-h-screen cstm-flex-col gap-4 justify-start">
      {loading ? <Loading /> : null}

      <AdminPageHeader subHeader="Stories" mainHeader="Edit Story" />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      {selectedCard ? (
        <EditStoryPage
          selectedCard={selectedCard}
          pages={pages}
          handlePage={handlePage}
          setPages={setPages}
          handleSelectedCard={handleSelectedCard}
          handleDeletePage={handleDeletePage}
          setMessageStatus={setMessageStatus}
        />
      ) : null}

      <form
        className="w-full cstm-flex-col gap-4  border-collapse"
        onSubmit={(e) => editBook(e)}
      >
        <Link
          type="button"
          href="/controller/stories"
          className="w-fit cstm-bg-hover mr-auto"
        >
          <BsArrowLeft className=" text-prmColor" />
        </Link>

        <EditStoryFilter
          story={story}
          rawAudio={rawAudio}
          rawImage={rawImage}
          handleAddPage={handleAddPage}
          handleStory={handleStory}
          selectedImageViewer={selectedImageViewer}
          selectedAudioViewer={selectedAudioViewer}
          setMessageStatus={setMessageStatus}
        />

        <div
          className={`grid grid-cols-1 gap-4 max-w-screen-lg w-full ${
            (audioFile.src || story?.audio) &&
            (imageFile.src || story?.book_cover) &&
            "t:grid-cols-2"
          }`}
        >
          {imageFile.src ? (
            <div className="w-full bg-white cstm-flex-row rounded-lg p-2 gap-2 ">
              <Image
                src={imageFile.src}
                alt="preview"
                className="h-full rounded-md"
                priority
                width={80}
                height={80}
              />

              <p
                className="text-xs overflow-x-auto w-full mr-auto 
                           p-2 truncate"
              >
                {imageFile.name}
              </p>

              <button
                type="button"
                onClick={removeSelectedImage}
                className="cstm-bg-hover "
              >
                <IoClose className="text-prmColor text-xl cursor-pointer " />
              </button>
            </div>
          ) : story?.book_cover ? (
            <div className="w-full bg-white cstm-flex-row rounded-lg p-2 gap-2 ">
              <Image
                src={story?.book_cover}
                alt="preview"
                className="h-full rounded-md"
                priority
                width={80}
                height={80}
              />

              <p
                className="text-xs overflow-x-auto w-full mr-auto 
                        p-2 truncate"
              >
                Current Book Cover
              </p>

              <button
                type="button"
                onClick={clearBookCover}
                className="cstm-bg-hover "
              >
                <IoClose className="text-prmColor text-xl cursor-pointer " />
              </button>
            </div>
          ) : null}

          {audioFile.src ? (
            <div className="w-full h-full cstm-flex-row p-2 gap-2 bg-white rounded-lg">
              <div className="w-full cstm-flex-col gap-2 items-start">
                <audio controls className="w-full mx-auto">
                  <source src={audioFile.src} />
                </audio>

                <p className="text-xs w-[30ch] truncate">{audioFile.name}</p>
              </div>

              <button
                type="button"
                onClick={removeSelectedAudio}
                className="cstm-bg-hover"
              >
                <IoClose className="text-prmColor text-xl cursor-pointer " />
              </button>
            </div>
          ) : story?.audio ? (
            <div className="w-full h-full cstm-flex-row p-2 gap-2 bg-white rounded-lg">
              <div className="w-full cstm-flex-col gap-2 items-start">
                <audio controls className="w-full mx-auto">
                  <source src={story?.audio} />
                </audio>

                <p className="text-xs truncate">Current Book Audio</p>
              </div>

              <button
                type="button"
                onClick={clearBookAudio}
                className="cstm-bg-hover"
              >
                <IoClose className="text-prmColor text-xl cursor-pointer " />
              </button>
            </div>
          ) : null}
        </div>

        <StoryRequirementIndicator
          cover={imageFile.src || story?.book_cover}
          title={story.title}
          author={story.author}
          genre={story.genre}
          lexile={story.lexile}
        />

        <div
          className="w-full cstm-flex-row gap-2 overflow-x-auto p-2
                    min-h-[3.5rem] justify-start t:justify-center"
        >
          <button
            type="button"
            className="hover:shadow-none"
            onClick={handlePrevSlidePage}
          >
            <BiChevronLeft />
          </button>

          {mappedSlidePages}

          <button
            type="button"
            className="hover:shadow-none"
            onClick={handleNextSlidePage}
          >
            <BiChevronRight />
          </button>
        </div>

        <div
          className="w-full h-full grid grid-cols-1 gap-4 
                    t:grid-cols-2 p-4 rounded-2xl l-l:grid-cols-3 mb-auto bg-white"
        >
          {mappedPages}
        </div>

        <div className="cstm-flex-row w-full ">
          <button
            type="button"
            onClick={handleAddPage}
            className="mr-auto cstm-flex-row gap-1 text-prmColor 
                  hover:underline hover:underline-offset-2 text-sm hover:shadow-none"
          >
            <IoAddOutline className="cursor-pointer text-xl" />
            <p>Add Page</p>
          </button>

          <button
            type="submit"
            className="w-fit text-center  ml-auto text-sm font-semibold
                    bg-scndColor text-prmColor rounded-full p-2 px-4 t:px-10"
          >
            Edit Story
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStory;

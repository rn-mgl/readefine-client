"use client";
import AdminPageHeader from "@/admin/global/PageHeader";
import AddStoryFilter from "@/admin/stories/AddStoryFilter";
import AddStoryPage from "@/admin/stories/AddStoryPage";
import Loading from "@/components/global/Loading";
import Message from "@/components/global/Message";
import axios from "axios";
import React from "react";

import { useGlobalContext } from "@/base/context";
import { isTokenExpired } from "@/functions/jwtFns";
import { useFileControls } from "@/hooks/useFileControls";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import AddStoryCard from "@/src/admin/stories/AddStoryCard";
import StoryRequirementIndicator from "@/src/admin/stories/StoryRequirementIndicator";
import useAdminActivities from "@/src/hooks/useAdminActivities";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { IoAddOutline, IoClose } from "react-icons/io5";

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
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();
  const pagePerSlide = 9;

  // handle on change story data
  const handleStoryFilter = ({ name, value }) => {
    setStoryFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle selected card
  const handleSelectedCard = (pageNumber) => {
    setSelectedCard((prev) => (prev === pageNumber ? 0 : pageNumber));
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
  const handleAddPage = () => {
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
  const handleDeletePage = (pageNumber) => {
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
  const mappedPages = pages.slice(slidePage * pagePerSlide, slidePage * pagePerSlide + pagePerSlide).map((page, i) => {
    return (
      <React.Fragment key={page.pageNumber}>
        <AddStoryCard
          pageNumber={page.pageNumber}
          pageHeader={page.pageHeader}
          pageContent={page.pageContent}
          pageFileName={page.pageImage.name}
          handleDeletePage={() => handleDeletePage(page.pageNumber)}
          handleSelectedCard={() => handleSelectedCard(page.pageNumber)}
        />
      </React.Fragment>
    );
  });

  const mappedSlidePages = new Array(Math.ceil(pages.length / pagePerSlide)).fill(0).map((page, index) => {
    return (
      <button
        type="button"
        onClick={() => handleSlidePage(index)}
        className={` p-2 rounded-md w-10 border-2
                    min-w-[2.5rem] text-xs font-medium 
                    ${slidePage === index ? "bg-prmColor text-white" : "bg-white"} `}
        key={index}
      >
        {index}
      </button>
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

      {selectedCard ? (
        <AddStoryPage
          page={pages[selectedCard - 1]}
          maxPages={pages.length}
          selectedCard={selectedCard}
          handleDeletePage={handleDeletePage}
          handlePage={handlePage}
          setPages={setPages}
          setMessageStatus={setMessageStatus}
          handleSelectedCard={handleSelectedCard}
        />
      ) : null}

      <div className="w-full cstm-flex-row cstm-w-limit">
        <Link href="/controller/stories" className="w-fit cstm-bg-hover mr-auto">
          <BsArrowLeft className=" text-prmColor" />
        </Link>
      </div>

      <form
        className="w-full cstm-flex-col gap-4 cstm-w-limit border-collapse 
                h-full overflow-y-auto justify-start cstm-scrollbar"
        onSubmit={(e) => publishBook(e)}
      >
        <AddStoryFilter
          storyFilter={storyFilter}
          rawAudio={rawAudio}
          rawImage={rawImage}
          handleStoryFilter={handleStoryFilter}
          selectedImageViewer={selectedImageViewer}
          selectedAudioViewer={selectedAudioViewer}
          setMessageStatus={setMessageStatus}
        />

        <div
          className={`grid grid-cols-1 gap-4 max-w-screen-lg w-full ${
            audioFile.src && imageFile.src && "t:grid-cols-2"
          }`}
        >
          {imageFile.src ? (
            <div className="w-full bg-white cstm-flex-row rounded-lg p-2 gap-2 ">
              <Image src={imageFile.src} alt="preview" className="h-full rounded-md" priority width={80} height={80} />

              <p
                className="text-xs overflow-x-auto w-full mr-auto 
                          p-2 truncate"
              >
                {imageFile.name}
              </p>

              <button type="button" onClick={removeSelectedImage} className="cstm-bg-hover ">
                <IoClose className="text-prmColor scale-125 cursor-pointer " />
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

              <button type="button" onClick={removeSelectedAudio} className="cstm-bg-hover">
                <IoClose className="text-prmColor scale-125 cursor-pointer " />
              </button>
            </div>
          ) : null}
        </div>

        <StoryRequirementIndicator
          cover={hasRawImage()}
          title={storyFilter.title}
          author={storyFilter.author}
          genre={storyFilter.genre}
          lexile={storyFilter.lexile}
        />

        <div className="w-full cstm-flex-row gap-2 overflow-x-auto p-2">
          <button type="button" className="hover:shadow-none" onClick={handlePrevSlidePage}>
            <BiChevronLeft />
          </button>

          {mappedSlidePages}

          <button type="button" className="hover:shadow-none" onClick={handleNextSlidePage}>
            <BiChevronRight />
          </button>
        </div>

        <div
          className="w-full h-full grid grid-cols-1 gap-4 
                    t:grid-cols-2 p-4 rounded-2xl l-l:grid-cols-3 mb-auto bg-white"
        >
          {mappedPages}
        </div>

        <div className="cstm-flex-row w-full p-2">
          <button
            type="button"
            onClick={handleAddPage}
            className="mr-auto cstm-flex-row gap-1 text-prmColor 
                  hover:underline hover:underline-offset-2 text-sm hover:shadow-none"
          >
            <IoAddOutline className="cursor-pointer scale-125" />
            <p>Add Page</p>
          </button>

          <button
            type="submit"
            className="w-fit text-center  ml-auto text-sm font-semibold
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

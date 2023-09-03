"use client";
import React from "react";
import AddStoryFilter from "@/src/src/admin/stories/AddStoryFilter";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import AddStoryPage from "@/src/src/admin/stories/AddStoryPage";
import axios from "axios";
import FilePreview from "@/src/src/components/global/FilePreview";
import Message from "@/src/src/components/global/Message";
import Loading from "@/src/src/components/global/Loading";

import { IoAddOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import AudioPreview from "@/src/src/components/global/AudioPreview";
import { useFileControls } from "@/src/src/hooks/useFileControls";

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
  const deletePage = (index) => {
    const updatedPages = [...pages];

    updatedPages.splice(index, 1);

    for (let i = index; i < updatedPages.length; i++) {
      updatedPages[i].pageNumber = i + 1;
    }

    setPages(updatedPages);
  };

  // publish book
  const publishBook = async (e) => {
    e.preventDefault();

    setLoading(true);

    // book image
    let bookCover = null;

    if (hasRawImage()) {
      bookCover = await uploadFile("readefine_admin_file", rawImage.current?.files);
    } else {
      setLoading(false);
      setMessage({ active: true, msg: "You did not add a book cover.", type: "error" });
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
        router.push("/controller/stories");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
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
      <AdminPageHeader subHeader="Stories" mainHeader="Add Story" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <form
        action=""
        className="w-full cstm-flex-col gap-5 cstm-w-limit border-collapse"
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
        />

        <div className="cstm-flex-col gap-5 w-full t:w-96 l-l:w-[30rem]">
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

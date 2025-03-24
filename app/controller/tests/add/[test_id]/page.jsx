"use client";
import AdminPageHeader from "@/admin/global/PageHeader";
import AddTestPage from "@/admin/tests/AddTestPage";
import Loading from "@/components/global/Loading";
import Message from "@/components/global/Message";
import axios from "axios";
import React from "react";

import { isTokenExpired } from "@/functions/jwtFns";

import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import AddTestCard from "@/src/admin/tests/AddTestCard";
import useAdminActivities from "@/src/hooks/useAdminActivities";
import { useStoryPageControls } from "@/src/hooks/useStoryPageControls";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

const AddTest = () => {
  const [pages, setPages] = React.useState([
    {
      testNumber: 1,
      testQuestion: "",
      choice1: "choice 1",
      choice2: "choice 2",
      choice3: "choice 3",
      choice4: "choice 4",
      answer1: "",
    },

    {
      testNumber: 2,
      testQuestion: "",
      choice1: "choice 1",
      choice2: "choice 2",
      choice3: "choice 3",
      choice4: "choice 4",
      answer2: "",
    },

    {
      testNumber: 3,
      testQuestion: "",
      choice1: "choice 1",
      choice2: "choice 2",
      choice3: "choice 3",
      choice4: "choice 4",
      answer3: "",
    },

    {
      testNumber: 4,
      testQuestion: "",
      choice1: "choice 1",
      choice2: "choice 2",
      choice3: "choice 3",
      choice4: "choice 4",
      answer4: "",
    },

    {
      testNumber: 5,
      testQuestion: "",
      choice1: "choice 1",
      choice2: "choice 2",
      choice3: "choice 3",
      choice4: "choice 4",
      answer5: "",
    },

    {
      testNumber: 6,
      testQuestion: "",
      choice1: "choice 1",
      choice2: "choice 2",
      choice3: "choice 3",
      choice4: "choice 4",
      answer6: "",
    },

    {
      testNumber: 7,
      testQuestion: "",
      choice1: "choice 1",
      choice2: "choice 2",
      choice3: "choice 3",
      choice4: "choice 4",
      answer7: "",
    },

    {
      testNumber: 8,
      testQuestion: "",
      choice1: "choice 1",
      choice2: "choice 2",
      choice3: "choice 3",
      choice4: "choice 4",
      answer8: "",
    },

    {
      testNumber: 9,
      testQuestion: "",
      choice1: "choice 1",
      choice2: "choice 2",
      choice3: "choice 3",
      choice4: "choice 4",
      answer9: "",
    },

    {
      testNumber: 10,
      testQuestion: "",
      choice1: "choice 1",
      choice2: "choice 2",
      choice3: "choice 3",
      choice4: "choice 4",
      answer10: "",
    },
  ]);
  const [selectedCard, setSelectedCard] = React.useState(0);

  const { story, setNewStory } = useStoryPageControls();

  const { loading, setLoadingState } = useLoading(false);
  const { message, setMessageStatus } = useMessage();
  const { createAdminActivity } = useAdminActivities();

  const { data: session } = useSession({ required: true });
  const url = process.env.NEXT_PUBLIC_API_URL;
  const params = useParams();
  const storyId = params?.test_id;
  const router = useRouter();
  const user = session?.user?.name;

  // handle onchange on page
  const handlePages = (number, { name, value }) => {
    setPages((prev) =>
      prev.map((t) => {
        if (t.testNumber === number) {
          return {
            ...t,
            [name]: value,
          };
        }
        return t;
      })
    );
  };

  const handleSelectedCard = (testNumber) => {
    setSelectedCard((prev) => (prev === testNumber ? 0 : testNumber));
  };

  // create test
  const createTest = async (e) => {
    e.preventDefault();

    setLoadingState(true);

    // check if there are 10 questions
    if (pages.length < 10) {
      setLoadingState(false);
      setMessageStatus(true, "Enter 10 questions before posting.", "error");
      return;
    }

    for (let i = 0; i < 10; i++) {
      const answerKey = `answer${i + 1}`;
      const page = pages[i];
      const currAnswer = page[answerKey];

      if (
        !currAnswer ||
        (currAnswer !== page["choice1"] &&
          currAnswer !== page["choice2"] &&
          currAnswer !== page["choice3"] &&
          currAnswer !== page["choice4"])
      ) {
        setLoadingState(false);
        setMessageStatus(
          true,
          `You do not have an answer in number ${i + 1}.`,
          "error"
        );
        return;
      }

      if (!page.testQuestion) {
        setLoadingState(false);
        setMessageStatus(
          true,
          `You do not have a question in number ${i + 1}.`,
          "error"
        );
        return;
      }
    }

    try {
      const { data } = await axios.post(
        `${url}/admin_test`,
        { storyId: storyId, pages },
        { headers: { Authorization: user.token } }
      );

      // move to main test page after making test
      if (data) {
        const adminActivity = await createAdminActivity(
          "test",
          story.title,
          "C"
        );

        if (adminActivity) {
          router.push("/controller/tests");
        }
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  // get story
  const getStory = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_story/${storyId}`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        setNewStory(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, setNewStory, storyId, setMessageStatus]);

  // map test pages
  const testCards = pages?.map((page) => {
    const answer = `answer${page.testNumber}`;
    return (
      <React.Fragment key={page.testNumber}>
        <AddTestCard
          answer={page[answer]}
          testNumber={page.testNumber}
          question={page.testQuestion}
          handleSelectedCard={() => handleSelectedCard(page.testNumber)}
        />
      </React.Fragment>
    );
  });

  React.useEffect(() => {
    if (user) {
      getStory();
    }
  }, [getStory, user]);

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
    <div className="p-4 bg-accntColor w-full cstm-flex-col min-h-screen h-screen gap-4 justify-start">
      <AdminPageHeader subHeader="Tests" mainHeader="Add Test" />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      {selectedCard ? (
        <AddTestPage
          testNumber={selectedCard}
          page={pages[selectedCard - 1]}
          handlePages={handlePages}
          handleSelectedCard={() => handleSelectedCard(selectedCard)}
        />
      ) : null}

      <div className="w-full cstm-flex-row ">
        <Link href="/controller/tests" className="w-fit cstm-bg-hover mr-auto">
          <BsArrowLeft className=" text-prmColor" />
        </Link>
      </div>

      <form
        onSubmit={(e) => createTest(e)}
        className="w-full cstm-flex-col  gap-4 bg-white justify-start
                  p-4 rounded-2xl h-full overflow-y-auto cstm-scrollbar-2"
      >
        <div className="w-full mb-auto gap-4 grid grid-cols-1 t:grid-cols-2 l-l:grid-cols-3">
          {testCards}
        </div>

        <button
          type="submit"
          className="w-fit text-center  ml-auto text-sm font-semibold 
                    bg-prmColor text-accntColor rounded-full p-2 px-4 t:px-10"
        >
          Create Test
        </button>
      </form>
    </div>
  );
};

export default AddTest;

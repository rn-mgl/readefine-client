"use client";
import React from "react";
import AdminPageHeader from "@/admin/global/PageHeader";
import AddTestPage from "@/admin/tests/AddTestPage";
import ActionLabel from "@/components/global/ActionLabel";
import axios from "axios";
import Message from "@/components/global/Message";
import Loading from "@/components/global/Loading";

import { IoAddOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/base/context";
import { decipher } from "@/functions/security";
import { isTokenExpired } from "@/functions/jwtFns";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";

const AddTest = ({ params }) => {
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
  ]);

  const { loading, setLoadingState } = useLoading(false);
  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const decodedTestId = decipher(params?.test_id);
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

  // add page function
  const addPage = () => {
    const pageLen = pages ? pages.length + 1 : 1;
    const answer = `answer${pageLen}`;

    if (pageLen > 10) {
      setMessageStatus(true, "You can only put 10 questions.", "warning");
      return;
    }

    setPages((prev) => {
      const newPage = {
        testNumber: pageLen,
        testQuestion: "",
        choice1: "choice 1",
        choice2: "choice 2",
        choice3: "choice 3",
        choice4: "choice 4",
        [answer]: null,
      };

      // if alread has page
      if (prev) {
        return [...prev, newPage];
      }

      // if there are no pages
      else {
        return [newPage];
      }
    });
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
        setMessageStatus(true, `You do not have an answer in number ${i + 1}.`, "error");
        return;
      }

      if (!page.testQuestion) {
        setLoadingState(false);
        setMessageStatus(true, `You do not have a question in number ${i + 1}.`, "error");
        return;
      }
    }

    try {
      const { data } = await axios.post(
        `${url}/admin_test`,
        { storyId: decodedTestId, pages },
        { headers: { Authorization: user.token } }
      );

      // move to main test page after making test
      if (data) {
        router.push("/controller/tests");
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  // map test pages
  const testPages = pages?.map((page) => {
    return (
      <React.Fragment key={page.testNumber}>
        <AddTestPage
          testNumber={page.testNumber}
          page={page}
          handlePages={handlePages}
          deletePage={() => deletePage(page.testNumber)}
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
      <AdminPageHeader subHeader="Tests" mainHeader="Add Test" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <form onSubmit={(e) => createTest(e)} className="w-full cstm-flex-col cstm-w-limit border-collapse gap-5">
        {testPages}

        <div className="cstm-flex-row w-full">
          {pages.length < 10 ? (
            <button type="button" onClick={addPage} className="cstm-bg-hover mr-auto relative group">
              <ActionLabel label="Add Page" />

              <IoAddOutline className="cursor-pointer text-prmColor scale-150" />
            </button>
          ) : null}

          <button
            type="submit"
            className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 px-4 t:px-10"
          >
            Create Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTest;

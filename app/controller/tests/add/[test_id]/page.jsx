"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import AddTestPage from "@/src/src/admin/tests/AddTestPage";
import ActionLabel from "@/src/src/components/global/ActionLabel";
import axios from "axios";
import Message from "@/src/src/components/global/Message";

import { IoAddOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { decipher } from "@/src/src/functions/security";
import Loading from "@/src/src/components/global/Loading";

const AddTest = ({ params }) => {
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });
  const [loading, setLoading] = React.useState(false);
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
      setMessage({ active: true, msg: "You can only put 10 questions.", type: "warning" });
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

    setLoading(true);

    // check if there are 10 questions
    if (pages.length < 10) {
      setLoading(false);
      setMessage({ active: true, msg: "Enter 10 questions before posting.", type: "error" });
      return;
    }

    pages.forEach((page, i) => {
      const answerKey = `answer${i + 1}`;

      if (!page[answerKey]) {
        setLoading(false);
        setMessage({
          active: true,
          msg: `You do not have an answer in number ${i + 1}.`,
          type: "error",
        });
        return;
      }

      if (!page.testQuestion) {
        setLoading(false);
        setMessage({
          active: true,
          msg: `You do not have a question in number ${i + 1}.`,
          type: "error",
        });
        return;
      }
    });

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
      setLoading(false);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Tests" mainHeader="Add Test" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <form
        onSubmit={(e) => createTest(e)}
        className="w-full cstm-flex-col cstm-w-limit border-collapse gap-5"
      >
        {testPages}

        <div className="cstm-flex-row w-full">
          {pages.length < 10 ? (
            <button
              type="button"
              onClick={addPage}
              className="cstm-bg-hover mr-auto relative group"
            >
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

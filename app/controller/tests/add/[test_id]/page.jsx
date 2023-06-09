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

const AddTest = ({ params }) => {
  const { data: session } = useSession({ required: true });
  const [message, setMessage] = React.useState({ msg: "", active: false });
  const [pages, setPages] = React.useState([
    {
      testNumber: 1,
      testQuestion: "",
      choice1: "choice 1",
      choice2: "choice 2",
      choice3: "choice 3",
      choice4: "choice 4",
      answer1: null,
    },
  ]);

  const router = useRouter();
  const { test_id } = params;
  const { url } = useGlobalContext();
  const user = session?.user?.name;

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

  const addPage = () => {
    const pageLen = pages ? pages.length + 1 : 1;
    const answer = `answer${pageLen}`;
    if (pageLen > 10) return;
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
      if (prev) {
        return [...prev, newPage];
      } else {
        return [newPage];
      }
    });
  };

  const createTest = async (e) => {
    e.preventDefault();

    if (pages.length < 10) return;

    try {
      const { data } = await axios.post(
        `${url}/admin_test`,
        { story_id: test_id, pages },
        { headers: { Authorization: user.token } }
      );

      if (data) {
        router.push("/controller/tests");
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  };

  const testPages = pages?.map((page) => {
    return (
      <React.Fragment key={page.testNumber}>
        <AddTestPage
          handlePages={handlePages}
          testNumber={page.testNumber}
          page={page}
          deletePage={() => deletePage(page.testNumber)}
        />
      </React.Fragment>
    );
  });

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
          <div className="cstm-bg-hover mr-auto relative group">
            <ActionLabel label="Add Page" />
            <IoAddOutline onClick={addPage} className="cursor-pointer text-prmColor scale-150" />
          </div>
          <button
            type="submit"
            className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 px-4"
          >
            Create Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTest;

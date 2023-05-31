"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import AddTestPage from "@/src/src/admin/tests/AddTestPage";

import { IoAddOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import ActionLabel from "@/src/src/components/global/ActionLabel";
import axios from "axios";

const AddTest = ({ params }) => {
  const { data: session } = useSession({ required: true });
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
    console.log(name, value);
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
    const answer = `answer${pages.length + 1}`;
    setPages((prev) => {
      const newPage = {
        testNumber: pages.length + 1,
        testQuestion: "",
        choice1: "choice 1",
        choice2: "choice 2",
        choice3: "choice 3",
        choice4: "choice 4",
        [answer]: null,
      };

      return [...prev, newPage];
    });
  };

  const createTest = async (e) => {
    e.preventDefault();
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
    }
  };

  const testPages = pages.map((page) => {
    return (
      <React.Fragment key={page.testNumber}>
        <AddTestPage handlePages={handlePages} testNumber={page.testNumber} page={page} />
      </React.Fragment>
    );
  });

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Tests" mainHeader="Add Test" />

      <form
        onSubmit={(e) => createTest(e)}
        className="w-full cstm-flex-col l-s:w-[70%] l-s:ml-auto border-collapse gap-5
                l-l:w-[80%]"
      >
        {testPages}

        <div className="cstm-flex-row w-full">
          <div className="hover:bg-black hover:bg-opacity-10 transition-all rounded-full p-2 mr-auto relative group">
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

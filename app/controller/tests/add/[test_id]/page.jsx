"use client";
import React from "react";
import AdminPageHeader from "@/src/components/src/admin/global/PageHeader";
import AddTestFilter from "@/src/components/src/admin/tests/AddTestFilter";
import AddTestPage from "@/src/components/src/admin/tests/AddTestPage";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AddTest = () => {
  const { data: session } = useSession({ required: true });
  const [pages, setPages] = React.useState([
    {
      testNumber: 1,
      testQuestion: "",
      choice1: "",
      choice2: "",
      choice3: "",
      choice4: "",
      answer: "",
    },
  ]);

  const addPage = () => {
    setPages((prev) => {
      const newPage = {
        testNumber: pages.length + 1,
        testQuestion: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: "",
      };

      return [...prev, newPage];
    });
  };

  const router = useRouter();

  const testPages = pages.map((page) => {
    return (
      <React.Fragment key={page.testNumber}>
        <AddTestPage testNumber={page.testNumber} />
      </React.Fragment>
    );
  });

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Tests" mainHeader="Add Test" />

      <AddTestFilter addPage={addPage} />
      <form
        action=""
        className="w-full cstm-flex-col l-s:w-[70%] l-s:ml-auto border-collapse gap-5
                l-l:w-[80%]"
      >
        {testPages}
      </form>

      <button
        className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 px-4
                t:text-base"
      >
        Publish Book
      </button>
    </div>
  );
};

export default AddTest;

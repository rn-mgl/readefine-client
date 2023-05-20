"use client";
import AddStoryFilter from "@/src/components/src/admin/stories/AddStoryFilter";
import React from "react";
import AdminPageHeader from "@/src/components/src/admin/global/PageHeader";

import AddStoryPage from "@/src/components/src/admin/stories/AddStoryPage";

const AddStory = () => {
  const [pages, setPages] = React.useState([{ pageNumber: 1, pageHeader: "", pageContent: "" }]);

  const addPage = () => {
    setPages((prev) => {
      const newPage = { pageNumber: pages.length + 1, pageHeader: "", pageContent: "" };

      return [...prev, newPage];
    });
  };

  const allPages = pages.map((page) => {
    return (
      <React.Fragment key={page.pageNumber}>
        <AddStoryPage page={page.pageNumber} maxPage={pages.length} />
      </React.Fragment>
    );
  });

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Stories" mainHeader="Add Story" />
      <AddStoryFilter addPage={addPage} />
      <form
        action=""
        className="w-full cstm-flex-col gap-2 l-s:w-[70%] l-s:ml-auto border-collapse
                l-l:w-[80%]"
      >
        {allPages}
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

export default AddStory;

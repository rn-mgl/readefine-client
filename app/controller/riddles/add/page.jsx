import AddStoryFilter from "@/src/components/src/admin/stories/AddStoryFilter";
import React from "react";
import AdminPageHeader from "@/src/components/src/admin/global/PageHeader";
import { BiImage } from "react-icons/bi";

const AddRiddle = () => {
  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Riddles" mainHeader="Add Riddle" />

      <form
        action=""
        className="w-full cstm-flex-col l-s:w-[70%] l-s:ml-auto border-collapse
                l-l:w-[80%]"
      >
        <div
          className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-screen justify-start items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar
                "
        >
          <div className="cstm-flex-row w-full">
            <textarea
              name=""
              id=""
              cols="30"
              rows="1"
              className="resize-none p-2 focus:outline-none font-bold text-prmColor mr-auto"
              defaultValue="Answer"
            ></textarea>
          </div>

          <div className="cstm-separator" />
          <div className="w-full h-full cstm-flex-col">
            <textarea
              name=""
              id=""
              cols="30"
              rows="1"
              className="resize-none p-2 focus:outline-none w-full h-full mr-auto"
              defaultValue="riddle"
            ></textarea>
            <p className="ml-auto">words: 123</p>
          </div>
        </div>
        <div className="pt-4 cstm-flex-row w-full">
          <button
            className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 px-4
                t:text-base"
          >
            Publish Riddle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRiddle;

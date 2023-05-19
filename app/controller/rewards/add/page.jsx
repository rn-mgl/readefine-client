import React from "react";
import AdminPageHeader from "@/src/components/src/admin/global/PageHeader";
import { BiImage } from "react-icons/bi";
import AddRewardFilter from "@/src/components/src/admin/rewards/AddRewardFilter";

const AddReward = () => {
  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Rewards" mainHeader="Add Reward" />
      <AddRewardFilter />
      <form
        action=""
        className="w-full cstm-flex-col l-s:w-[70%] l-s:ml-auto border-collapse
                l-l:w-[80%]"
      >
        <div
          className="cstm-flex-col gap-5 w-full
                      l-s:cstm-flex-row"
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
                defaultValue="Page Header"
              ></textarea>

              <p className="whitespace-nowrap">Page: 1/1</p>
            </div>

            <div className="cstm-separator" />
            <div className="w-full h-full cstm-flex-col">
              <textarea
                name=""
                id=""
                cols="30"
                rows="1"
                className="resize-none p-2 focus:outline-none w-full h-full mr-auto"
                defaultValue="page content or image"
              ></textarea>
              <p className="ml-auto whitespace-nowrap">words: 123</p>
            </div>
          </div>

          <div
            className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-screen justify-start items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar
                "
          >
            <div className="w-full h-full cstm-flex-col bg-accntColor rounded-md"></div>
          </div>
        </div>

        <div className="pt-4 cstm-flex-row w-full">
          <label
            className="mr-auto hover:bg-black hover:bg-opacity-10 p-2 rounded-full cursor-pointer"
            htmlFor="file"
          >
            <input type="file" className="hidden peer" id="file" />
            <BiImage className="scale-150 text-prmColor peer-checked" />
          </label>

          <button
            className="w-fit text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 px-4
                t:text-base"
          >
            Publish Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReward;

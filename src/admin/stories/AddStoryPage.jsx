import React from "react";
import { BiImage } from "react-icons/bi";

const AddStoryPage = (props) => {
  return (
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

        <p>
          Page: {props.page}/{props.maxPage}
        </p>
      </div>

      <div className="cstm-separator" />
      <textarea
        name=""
        id=""
        cols="30"
        rows="1"
        className="resize-none p-2 focus:outline-none w-full h-full mr-auto"
        defaultValue="page content or image"
      ></textarea>

      <div className="w-full cstm-flex-row">
        <label
          className="mr-auto hover:bg-black hover:bg-opacity-10 p-2 rounded-full cursor-pointer"
          htmlFor="file"
        >
          <input type="file" className="hidden peer" id="file" />
          <BiImage className="scale-150 text-prmColor peer-checked" />
        </label>
        <p>words: 123</p>
      </div>
    </div>
  );
};

export default AddStoryPage;

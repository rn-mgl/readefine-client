import React from "react";
import { BiImage } from "react-icons/bi";
import FilePreview from "../../components/global/FilePreview";
import * as fileFns from "../../../src/functions/fileFns";
import { wordCount } from "../../functions/wordCount";

const EditStoryPage = (props) => {
  const words = wordCount(props.page?.content);
  const page = props.page.page;
  return (
    <div className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-screen justify-start items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar">
      <div className="cstm-flex-row w-full gap-5">
        <textarea
          name="header"
          id="header"
          cols="30"
          rows="1"
          placeholder="Page Header"
          onChange={(e) => props.handlePage(page, e.target)}
          className="resize-none p-2 focus:outline-none font-bold text-prmColor mr-auto truncate"
          value={props.page.header}
        ></textarea>

        <p className="whitespace-nowrap">
          {props.page.length > 1 ? "Pages" : "Page"}: {page}/{props.maxPages}
        </p>
      </div>

      <div className="cstm-separator" />
      <div className="cstm-flex-col w-full t:cstm-flex-row gap-5 h-full">
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="1"
          placeholder="Page Content"
          onChange={(e) => props.handlePage(page, e.target)}
          className="resize-none p-2 focus:outline-none w-full h-full mr-auto"
          value={props.page.content}
        ></textarea>

        {props.page?.image || props.page?.file?.src ? (
          <FilePreview
            purpose="Page Image"
            name={props.page.file?.name}
            src={props.page?.image ? props.page?.image : props.page?.file?.src}
            clearFiles={() => fileFns.clearPageUpload(page, props.setPages)}
          />
        ) : null}
      </div>

      <div className="w-full cstm-flex-row gap-5">
        <label
          className="mr-auto hover:bg-black hover:bg-opacity-10 p-2 rounded-full cursor-pointer"
          htmlFor={`filePage${page}`}
        >
          <input
            accept="image/*"
            type="file"
            className="hidden peer"
            formNoValidate
            name="file"
            id={`filePage${page}`}
            onChange={(e) => fileFns.selectedUploadFileViewer(page, e, props.setPages)}
            defaultValue=""
          />
          <BiImage className="scale-150 text-prmColor peer-checked" />
        </label>
        <p>
          {words > 1 ? "Words" : "Word"}: {words}
        </p>
      </div>
    </div>
  );
};

export default EditStoryPage;

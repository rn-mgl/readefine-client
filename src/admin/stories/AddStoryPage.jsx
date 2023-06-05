import React from "react";
import { BiImage } from "react-icons/bi";
import FilePreview from "../../components/global/FilePreview";
import * as fileFns from "../../../src/functions/fileFns";
import { wordCount } from "../../functions/wordCount";

const AddStoryPage = (props) => {
  const words = wordCount(props.page?.pageContent);
  return (
    <div className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-screen justify-start items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar">
      <div className="cstm-flex-row w-full gap-5">
        <textarea
          name="pageHeader"
          id="pageHeader"
          cols="30"
          rows="1"
          placeholder="Page Header"
          onChange={(e) => props.handlePage(props.page.pageNumber, e.target)}
          className="resize-none p-2 focus:outline-none font-bold text-prmColor mr-auto truncate"
          value={props.pageHeader}
        ></textarea>

        <p className="whitespace-nowrap">
          {props.page.length > 1 ? "Pages" : "Page"}: {props.page.pageNumber}/{props.maxPages}
        </p>
      </div>

      <div className="cstm-separator" />
      <div className="cstm-flex-col w-full t:cstm-flex-row gap-5 h-full">
        <textarea
          name="pageContent"
          id="pageContent"
          cols="30"
          rows="1"
          placeholder="Page Content"
          onChange={(e) => props.handlePage(props.page.pageNumber, e.target)}
          className="resize-none p-2 focus:outline-none w-full h-full mr-auto"
          value={props.pageContent}
        ></textarea>
        {props.page.file.src ? (
          <FilePreview
            purpose="Page Image"
            name={props.page.file.name}
            src={props.page.file.src}
            clearFiles={() => fileFns.clearPageFile(props.page.pageNumber, props.setPages)}
          />
        ) : null}
      </div>

      <div className="w-full cstm-flex-row gap-5">
        <label
          className="mr-auto cstm-bg-hover cursor-pointer"
          htmlFor={`filePage${props.page.pageNumber}`}
        >
          <input
            accept="image/*"
            type="file"
            className="hidden peer"
            formNoValidate
            name="file"
            id={`filePage${props.page.pageNumber}`}
            onChange={(e) =>
              fileFns.selectedPageFileViewer(props.page.pageNumber, e, props.setPages)
            }
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

export default AddStoryPage;

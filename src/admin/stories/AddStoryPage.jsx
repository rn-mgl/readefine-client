import React from "react";
import { wordCount } from "../../functions/wordCount";
import { AiFillDelete } from "react-icons/ai";
import { BiImage } from "react-icons/bi";
import FilePreview from "../../components/global/FilePreview";
import * as fileFns from "@/functions/fileFns";

const AddStoryPage = (props) => {
  const words = wordCount(props.page?.pageContent);
  const pageNumber = props.page.pageNumber;
  const index = props.index;

  return (
    <div
      className="p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-screen 
                  justify-start items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar"
    >
      <div className="cstm-flex-row w-full gap-5">
        <textarea
          name="pageHeader"
          id="pageHeader"
          cols="30"
          rows="1"
          placeholder="Page Header"
          onChange={(e) => props.handlePage(pageNumber, e.target)}
          className="resize-none w-full p-2 focus:outline-none font-bold text-prmColor mr-auto truncate"
          value={props.page.pageHeader}
        />

        <p className="whitespace-nowrap">
          {props.page.length > 1 ? "Pages" : "Page"}: {pageNumber}/{props.maxPages}
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
          onChange={(e) => props.handlePage(pageNumber, e.target)}
          className="resize-none p-2 focus:outline-none w-full h-full mr-auto"
          value={props.page.pageContent}
        />

        <div className="w-full">
          {props.page?.pageImage?.src ? (
            <FilePreview
              purpose="Page Image"
              name={props.page?.pageImage?.name}
              src={props.page?.pageImage?.src}
              clearFiles={() => fileFns.removeSelectedPageImage(pageNumber, props.setPages, `filePage${pageNumber}`)}
            />
          ) : null}
        </div>
      </div>

      <div className="w-full cstm-flex-row gap-2">
        <label className=" cstm-bg-hover cursor-pointer" htmlFor={`filePage${pageNumber}`}>
          <input
            accept="image/*"
            type="file"
            className="hidden peer"
            formNoValidate
            name="pageImage"
            id={`filePage${pageNumber}`}
            onChange={(e) => fileFns.selectedPageImageViewer(pageNumber, e, props.setPages, props.setMessageStatus)}
          />

          <BiImage className="scale-150 text-prmColor peer-checked" />
        </label>

        <p className="mr-auto">
          {words > 1 ? "Words" : "Word"}: {words}
        </p>

        <button onClick={props.deletePage} type="button" className="cstm-bg-hover">
          <AiFillDelete className="text-prmColor scale-150" />
        </button>
      </div>
    </div>
  );
};

export default AddStoryPage;

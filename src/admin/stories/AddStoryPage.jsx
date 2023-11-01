import React from "react";
import { wordCount } from "@/functions/wordCount";
import { AiFillDelete } from "react-icons/ai";
import { BiImage } from "react-icons/bi";
import FilePreview from "@/components/global/FilePreview";
import * as fileFns from "@/functions/fileFns";
import { IoClose } from "react-icons/io5";

const AddStoryPage = (props) => {
  const words = wordCount(props.page?.pageContent);
  const pageNumber = props.page.pageNumber;

  return (
    <div
      className=" w-full h-full cstm-flex-col gap-2 fixed animate-fadeIn
                top-0 left-0 bg-prmColor bg-opacity-10 backdrop-blur-md z-[60] p-4"
    >
      <div className="w-full h-full cstm-flex-col gap-2 ">
        <button onClick={() => props.handleSelectedCard(props.selectedCard)} className="cstm-bg-hover ml-auto">
          <IoClose className="text-prmColor text-xl" />
        </button>

        <div className="w-full h-full cstm-flex-col gap-2 bg-white p-4 rounded-2xl l-s:w-10/12">
          <div className="cstm-flex-row w-full gap-4">
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

            <p className="whitespace-nowrap text-sm">
              {props.page.length > 1 ? "Pages" : "Page"}: {pageNumber}/{props.maxPages}
            </p>
          </div>

          <div className="cstm-separator" />

          <div className="cstm-flex-col w-full t:cstm-flex-row gap-4 h-full">
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

            <div className="w-full t:w-4/12">
              {props.page?.pageImage?.src ? (
                <FilePreview
                  purpose="Page Image"
                  name={props.page?.pageImage?.name}
                  src={props.page?.pageImage?.src}
                  clearFiles={() =>
                    fileFns.removeSelectedPageImage(pageNumber, props.setPages, `filePage${pageNumber}`)
                  }
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

              <BiImage className="text-xl text-prmColor peer-checked" />
            </label>

            <p className="mr-auto">
              {words > 1 ? "Words" : "Word"}: {words}
            </p>

            <button
              onClick={() => {
                props.handleDeletePage(pageNumber);
                props.handleSelectedCard(props.selectedCard);
              }}
              type="button"
              className="cstm-bg-hover"
            >
              <AiFillDelete className="text-prmColor text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStoryPage;

import React from "react";
import { BiImage } from "react-icons/bi";
import FilePreview from "../../components/global/FilePreview";
import * as fileFns from "../../../src/functions/fileFns";
import { wordCount } from "../../functions/wordCount";
import { AiFillDelete } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

const EditStoryPage = (props) => {
  const words = wordCount(props.page?.content);
  const page = props.page.page;
  return (
    <div
      className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-screen justify-start 
                    items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar-2"
    >
      <div className="cstm-flex-row w-full gap-5">
        <textarea
          name="header"
          id="header"
          cols="30"
          rows="1"
          placeholder="Page Header"
          onChange={(e) => props.handlePage(page, e.target)}
          className="resize-none p-2 focus:outline-none font-bold text-prmColor mr-auto truncate w-full"
          value={props.page.header}
        />

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
        />

        {props.page?.pageImage?.src ? (
          <FilePreview
            purpose="Page Image"
            name={props.page?.pageImage?.name}
            src={props.page?.pageImage?.src}
            clearFiles={() => fileFns.removeSelectedPageImage(page, props.setPages)}
          />
        ) : props.page?.image ? (
          <div className="w-full cstm-flex-col rounded-2xl p-2 gap-2 t:w-80">
            <Image
              src={props.page?.image}
              alt="viewer"
              width={350}
              height={350}
              className="w-full rounded-2xl"
              draggable={false}
              priority
            />

            <div className="w-full cstm-flex-row gap-5">
              <p className="text-sm overflow-x-auto w-full mr-auto p-2 whitespace-nowrap scrollbar-none font-bold">
                Current Page Image
              </p>

              <button
                type="button"
                onClick={() => fileFns.removeUploadedPageImage(page, props.setPages)}
                className="cstm-bg-hover "
              >
                <IoClose className="text-prmColor scale-125 cursor-pointer " />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="w-full cstm-flex-row gap-5">
        <label className=" cstm-bg-hover cursor-pointer" htmlFor={`filePage${page}`}>
          <input
            accept="image/*"
            type="file"
            className="hidden peer"
            formNoValidate
            name="pageImage"
            id={`filePage${page}`}
            onChange={(e) => fileFns.updateUploadedPageImage(page, e, props.setPages)}
            defaultValue=""
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

export default EditStoryPage;

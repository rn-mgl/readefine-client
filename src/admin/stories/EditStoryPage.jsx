import React from "react";
import { BiImage } from "react-icons/bi";
import FilePreview from "@/components/global/FilePreview";
import * as fileFns from "@/functions/fileFns";
import { wordCount } from "@/functions/wordCount";
import { AiFillDelete } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

const EditStoryPage = (props) => {
  const maxPage = props.pages.length;
  const pageIndex = props.pages.findIndex((page) => page.page === props.selectedCard);
  const page = props.pages[pageIndex];
  const pageNumber = page.page;
  const words = wordCount(page?.content);

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
              name="header"
              id="header"
              cols="30"
              rows="1"
              placeholder="Page Header"
              onChange={(e) => props.handlePage(pageNumber, e.target)}
              className="resize-none p-2 focus:outline-none font-bold text-prmColor mr-auto truncate w-full"
              value={page.header}
            />

            <p className="whitespace-nowrap">
              {page.length > 1 ? "Pages" : "Page"}: {pageNumber}/{maxPage}
            </p>
          </div>

          <div className="cstm-separator" />

          <div className="cstm-flex-col w-full t:cstm-flex-row gap-4 h-full">
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="1"
              placeholder="Page Content"
              onChange={(e) => props.handlePage(pageNumber, e.target)}
              className="resize-none p-2 focus:outline-none w-full h-full mr-auto cstm-scrollbar-2"
              value={page.content}
            />

            {page?.pageImage?.src ? (
              <FilePreview
                purpose="Page Image"
                name={page?.pageImage?.name}
                src={page?.pageImage?.src}
                clearFiles={() => fileFns.removeUpdatedUploadedPageImage(pageNumber, props.setPages, `filePage${page}`)}
              />
            ) : page?.image ? (
              <div className="w-fit cstm-flex-col rounded-2xl p-2 gap-2">
                <Image
                  src={page?.image}
                  alt="viewer"
                  width={350}
                  height={350}
                  className="w-full rounded-2xl"
                  draggable={false}
                  priority
                />

                <div className="w-full cstm-flex-row gap-4">
                  <p className="text-sm overflow-x-auto w-full mr-auto p-2 whitespace-nowrap scrollbar-none font-bold">
                    Current Page Image
                  </p>

                  <button
                    type="button"
                    onClick={() => fileFns.removeUploadedPageImage(pageNumber, props.setPages)}
                    className="cstm-bg-hover "
                  >
                    <IoClose className="text-prmColor text-xl cursor-pointer " />
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="w-full cstm-flex-row gap-4">
            <label className=" cstm-bg-hover cursor-pointer" htmlFor={`filePage${pageNumber}`}>
              <input
                accept="image/*"
                type="file"
                className="hidden peer"
                formNoValidate
                name="pageImage"
                id={`filePage${pageNumber}`}
                onChange={(e) => fileFns.updateUploadedPageImage(pageNumber, e, props.setPages, props.setMessageStatus)}
              />
              <BiImage className="text-xl text-prmColor peer-checked" />
            </label>
            <p className="mr-auto">
              {words > 1 ? "Words" : "Word"}: {words}
            </p>

            <button
              onClick={() => {
                props.handleDeletePage(page.content_id, pageNumber);
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

export default EditStoryPage;

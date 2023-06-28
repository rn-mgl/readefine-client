import React from "react";
import FileViewer from "../global/FileViewer";

const StoryDoublePage = (props) => {
  const leftPage = props.leftPage;
  const rightPage = props.rightPage;
  const active = props.index === props.activePage;
  const leftContent = leftPage?.content;
  const hasLeftTitle = leftPage?.header;
  const rightContent = rightPage?.content;

  let position = "translate-x-full opacity-0";

  if (active) {
    position = "translate-x-0";
  }

  if (props.index === props.activePage - 2) {
    position = "-translate-x-full opacity-0";
  }

  return (
    <>
      <div
        className={`cstm-flex-col gap-5 p-5 t:p-10 transition-all absolute ${position} w-6/12 left-0`}
      >
        {leftPage ? (
          <>
            <p
              style={{ fontSize: `${props.fontSize}px`, lineHeight: `${props.fontSize + 8}px` }}
              className={`${
                hasLeftTitle ? "opacity-100" : "opacity-50"
              } text-black font-semibold text-center`}
            >
              {hasLeftTitle ? hasLeftTitle : props.title}
            </p>

            <FileViewer
              src={props.leftPage?.image}
              width={leftContent ? "w-full t:w-96" : "w-fit"}
            />

            {leftContent ? (
              <p
                style={{ fontSize: `${props.fontSize}px`, lineHeight: `${props.fontSize + 8}px` }}
                className="text-sm whitespace-pre-wrap w-full indent-10 text-justify"
              >
                {leftContent}
              </p>
            ) : null}
          </>
        ) : null}
      </div>
      <div
        className={`cstm-flex-col gap-5 p-5 t:p-10 transition-all absolute ${position} w-6/12 right-0`}
      >
        {rightPage ? (
          <>
            <p
              style={{ fontSize: `${props.fontSize}px`, lineHeight: `${props.fontSize + 8}px` }}
              className="text-black font-semibold text-center opacity-50"
            >
              {props.title}
            </p>

            <FileViewer
              src={props.rightPage?.image}
              width={rightContent ? "w-full t:w-96" : "w-fit"}
            />

            {rightContent ? (
              <p
                style={{ fontSize: `${props.fontSize}px`, lineHeight: `${props.fontSize + 8}px` }}
                className="text-sm whitespace-pre-wrap w-full indent-10 text-justify"
              >
                {rightContent}
              </p>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
};

export default StoryDoublePage;

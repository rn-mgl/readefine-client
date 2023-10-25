"use client";
import React from "react";
import Image from "next/image";

const StoryDoublePage = (props) => {
  const scrollRef = React.useRef(null);
  const leftPage = props.leftPage;
  const rightPage = props.rightPage;
  const active = props.index === props.activePage;
  const leftContent = leftPage?.content;
  const hasLeftTitle = leftPage?.header;
  const hasRightTitle = rightPage?.header;
  const rightContent = rightPage?.content;

  let position = "translate-x-full opacity-0 hidden";

  if (active) {
    position = "translate-x-0";
  }

  if (props.index === props.activePage - 2) {
    position = "-translate-x-full opacity-0 hidden";
  }

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [active]);

  return (
    <>
      <div className={`cstm-flex-col gap-4 p-5 t:p-10 transition-all absolute ${position} w-6/12 left-0`}>
        {leftPage ? (
          <>
            <p
              ref={scrollRef}
              style={{ fontSize: `${props.fontSize}px`, lineHeight: `${props.fontSize + 8}px` }}
              className={`${hasLeftTitle ? "opacity-100" : "opacity-50"} text-black font-semibold text-center`}
            >
              {hasLeftTitle ? hasLeftTitle : props.title}
            </p>

            {props.leftPage?.image ? (
              <Image
                src={props.leftPage?.image}
                alt="viewer"
                width={350}
                height={350}
                className="w-full rounded-2xl t:w-96"
                draggable={false}
                priority
              />
            ) : null}

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
      <div className={`cstm-flex-col gap-4 p-5 t:p-10 transition-all absolute ${position} w-6/12 right-0`}>
        {rightPage ? (
          <>
            <p
              ref={scrollRef}
              style={{ fontSize: `${props.fontSize}px`, lineHeight: `${props.fontSize + 8}px` }}
              className={`${hasRightTitle ? "opacity-100" : "opacity-50"} text-black font-semibold text-center`}
            >
              {hasRightTitle ? hasRightTitle : props.title}
            </p>

            {props.rightPage?.image ? (
              <Image
                src={props.rightPage?.image}
                alt="viewer"
                width={350}
                height={350}
                className="w-full rounded-2xl t:w-96"
                draggable={false}
                priority
              />
            ) : null}

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

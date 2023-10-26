"use client";
import React from "react";
import Image from "next/image";

const StorySinglePage = (props) => {
  const scrollRef = React.useRef(null);
  const active = props.index === props.activePage;
  const content = props.page?.content;
  const hasTitle = props.page?.header;

  let position = "translate-x-full opacity-0 hidden";

  if (active) {
    position = "translate-x-0";
  }

  if (props.index === props.activePage - 1) {
    position = "-translate-x-full opacity-0 hidden";
  }

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [active]);

  return (
    <div className={`cstm-flex-col gap-4 p-4 t:p-10 transition-all absolute ${position} w-full `}>
      <p
        style={{ fontSize: `${props.fontSize}px`, lineHeight: `${props.fontSize + 8}px` }}
        ref={scrollRef}
        className={`${hasTitle ? "opacity-100" : "opacity-50"} text-black font-semibold text-center`}
      >
        {props.page?.header ? props.page?.header : props.title}
      </p>

      {props.page?.image ? (
        <Image
          src={props.page?.image}
          alt="viewer"
          width={350}
          height={350}
          className="w-full rounded-2xl t:w-96"
          draggable={false}
          priority
        />
      ) : null}

      {content ? (
        <p
          style={{ fontSize: `${props.fontSize}px`, lineHeight: `${props.fontSize + 8}px` }}
          className="text-sm whitespace-pre-wrap w-full indent-10 text-justify "
        >
          {content}
        </p>
      ) : null}
    </div>
  );
};

export default StorySinglePage;

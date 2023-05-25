import React from "react";
import FileViewer from "../global/FileViewer";

const StoryPage = (props) => {
  const active = props.index === props.activePage;
  const content = props.page?.content;
  let position = "translate-x-full opacity-0";

  if (active) {
    position = "translate-x-0";
  }

  if (
    props.index === props.activePage - 1 ||
    (props.activePage === 0 && props.index === props.maxPage - 1)
  ) {
    position = "-translate-x-full opacity-0";
  }

  return (
    <div className={`w-full cstm-flex-col gap-5 p-2 transition-all absolute ${position}`}>
      <p className="text-prmColor font-bold">{props.page?.header}</p>
      <FileViewer src={props.page?.image} width={content ? "w-full t:w-96" : "w-full h-fit"} />
      {content ? <p className="text-sm whitespace-pre-wrap w-full indent-10">{content}</p> : null}
    </div>
  );
};

export default StoryPage;

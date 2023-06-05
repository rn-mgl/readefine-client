import React from "react";

import { BiImage } from "react-icons/bi";
import InputFilter from "../../components/filter/InputFilter";

const EditStoryFilter = (props) => {
  return (
    <div className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar">
      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-md outline-none border-neutral-200 border-2 text-sm">
          <p>Book Cover</p>
        </div>
        <label className="mr-auto  cstm-bg-hover cursor-pointer" htmlFor="fileCover">
          <input
            accept="image/*"
            type="file"
            className="hidden peer"
            name="file"
            id="fileCover"
            onChange={(e) => props.selectedFileViewer(e, props.setStory)}
            defaultValue=""
          />
          <BiImage className="scale-150 text-prmColor peer-checked" />
        </label>
      </div>

      <InputFilter
        label="Title"
        placeholder="Title"
        name="title"
        type="text"
        required={true}
        value={props.story.title}
        onChange={props.handleStory}
      />

      <InputFilter
        label="Author"
        placeholder="Author"
        name="author"
        type="text"
        required={true}
        value={props.story.author}
        onChange={props.handleStory}
      />

      <InputFilter
        label="Genre"
        placeholder="Genre"
        name="genre"
        type="text"
        required={true}
        value={props.story.genre}
        onChange={props.handleStory}
      />

      <InputFilter
        label="Lexile"
        placeholder="Lexile"
        name="lexile"
        type="number"
        required={true}
        value={props.story.lexile}
        onChange={props.handleStory}
      />
    </div>
  );
};

export default EditStoryFilter;

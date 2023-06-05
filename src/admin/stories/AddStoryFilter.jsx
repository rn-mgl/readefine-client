import React from "react";

import { BiImage } from "react-icons/bi";
import InputFilter from "../../components/filter/InputFilter";

const AddStoryFilter = (props) => {
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
            onChange={(e) => props.selectedFileViewer(e, props.setStoryFilter)}
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
        value={props.storyFilter.title}
        onChange={props.handleStoryFilter}
      />

      <InputFilter
        label="Author"
        placeholder="Author"
        name="author"
        type="text"
        required={true}
        value={props.storyFilter.author}
        onChange={props.handleStoryFilter}
      />

      <InputFilter
        label="Genre"
        placeholder="Genre"
        name="genre"
        type="text"
        required={true}
        value={props.storyFilter.genre}
        onChange={props.handleStoryFilter}
      />

      <InputFilter
        label="Lexile"
        placeholder="Lexile"
        name="lexile"
        type="number"
        required={true}
        value={props.storyFilter.lexile}
        onChange={props.handleStoryFilter}
      />
    </div>
  );
};

export default AddStoryFilter;

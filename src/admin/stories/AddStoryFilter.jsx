import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { BiImage } from "react-icons/bi";

const AddStoryFilter = (props) => {
  return (
    <div className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar">
      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-md outline-none border-neutral-200 border-2 text-sm">
          <p>Book Cover</p>
        </div>
        <label
          className="mr-auto  hover:bg-black hover:bg-opacity-10 p-2 rounded-full cursor-pointer"
          htmlFor="fileCover"
        >
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
      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>Title</p>
        </div>
        <input
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
          placeholder="Title"
          name="title"
          type="text"
          required={true}
          value={props.storyFilter.title}
          onChange={(e) => props.handleStoryFilter(e.target)}
        />
      </div>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>Author</p>
        </div>
        <input
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
          placeholder="Author's Name"
          name="author"
          type="text"
          required={true}
          value={props.storyFilter.author}
          onChange={(e) => props.handleStoryFilter(e.target)}
        />
      </div>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>Genre</p>
        </div>
        <input
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
          placeholder="Genre"
          name="genre"
          type="text"
          required={true}
          value={props.storyFilter.genre}
          onChange={(e) => props.handleStoryFilter(e.target)}
        />
      </div>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>Lexile</p>
        </div>
        <input
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none"
          placeholder="Lexile Level"
          name="lexile"
          type="number"
          required={true}
          value={props.storyFilter.lexile}
          onChange={(e) => props.handleStoryFilter(e.target)}
        />
      </div>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-md outline-none border-neutral-200 border-2 text-sm">
          <p>Add Page</p>
        </div>
        <div className="hover:bg-black hover:bg-opacity-10 transition-all rounded-full p-2">
          <IoAddOutline
            onClick={props.addPage}
            className="cursor-pointer text-prmColor scale-150"
          />
        </div>
      </div>
    </div>
  );
};

export default AddStoryFilter;

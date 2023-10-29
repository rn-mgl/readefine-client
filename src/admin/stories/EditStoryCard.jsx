import { AiFillDelete } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

const EditStoryCard = (props) => {
  return (
    <div
      style={{ animationDuration: `${props.testNumber * 0.1}s` }}
      className="w-full h-fit cstm-flex-col rounded-2xl p-4 bg-white  text-sm
                gap-4 animate-fadeIn border-2 border-neutral-300 shadow-solid"
    >
      <div className="w-full cstm-flex-row">
        <p className="text-prmColor font-bold mr-auto">{props.pageNumber}.</p>
        <button type="button" onClick={props.handleSelectedCard} className="cstm-bg-hover">
          <BsArrowRight className="text-prmColor" />
        </button>
      </div>

      <div className="cstm-separator" />

      <div className="w-full items-start cstm-flex-row gap-5">
        <p className="font-bold text-prmColor mr-auto">Header:</p>
        <p className={`truncate ${props.pageHeader ? "opacity-100 font-semibold" : "opacity-50"}`}>
          {props.pageHeader ? props.pageHeader : "no header"}
        </p>
      </div>

      <div className="w-full items-start  cstm-flex-row gap-5">
        <p className="font-bold text-prmColor mr-auto">Content:</p>
        <p className={`truncate ${props.pageContent ? "opacity-100" : "opacity-50"}`}>
          {props.pageContent ? props.pageContent : "no content"}
        </p>
      </div>

      <div className="w-full items-start cstm-flex-row gap-5">
        <p className="font-bold text-prmColor mr-auto">Image:</p>
        <p className={`truncate ${props.pageFileName ? "opacity-100 italic font-light" : "opacity-50"}`}>
          {props.pageFileName ? props.pageFileName : "no image"}
        </p>
      </div>

      <button onClick={props.handleDeletePage} type="button" className="cstm-bg-hover ml-auto">
        <AiFillDelete className="text-prmColor scale-125" />
      </button>
    </div>
  );
};

export default EditStoryCard;

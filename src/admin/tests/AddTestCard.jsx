import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

const AddTestCard = (props) => {
  return (
    <div
      style={{ animationDuration: `${props.testNumber * 0.1}s` }}
      className="w-full h-full cstm-flex-col rounded-md p-4 bg-white 
                gap-2 animate-fadeIn border-2 border-neutral-300 shadow-solid"
    >
      <div className="w-full cstm-flex-row">
        <p className="text-prmColor font-bold text-sm mr-auto">{props.testNumber}.</p>
        <button type="button" onClick={props.handleSelectedCard} className="cstm-bg-hover">
          <BsArrowRight className="text-prmColor" />
        </button>
      </div>

      <div className="cstm-separator" />

      <div
        className="cstm-flex-row w-full p-2 
                    rounded-md gap-4 justify-between text-sm"
      >
        <p className="text-prmColor font-bold">Question:</p>
        <p className={`font-medium truncate ${props.question ? "opacity-100" : "opacity-50"}`}>
          {props.question ? props.question : "no question"}
        </p>
      </div>

      <div
        className="cstm-flex-row w-full p-2 
                    rounded-md gap-4 justify-between text-sm"
      >
        <p className="text-prmColor font-bold">Answer:</p>
        <p className={`font-medium truncate ${props.answer ? "opacity-100" : "opacity-50"}`}>
          {props.answer ? props.answer : "no answer"}
        </p>
      </div>
    </div>
  );
};

export default AddTestCard;

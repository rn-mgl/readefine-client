import { BsFillCheckSquareFill, BsFillExclamationOctagonFill } from "react-icons/bs";

const AddTestCard = (props) => {
  return (
    <div
      style={{ animationDuration: `${props.testNumber * 0.1}s` }}
      className="w-full h-full cstm-flex-col rounded-md p-4 bg-white gap-2 animate-fadeIn"
    >
      <div className="w-full text-left">
        <p className="text-prmColor font-bold text-sm ">{props.testNumber}.</p>
      </div>
      {props.answer ? (
        <div
          className="cstm-flex-row w-full bg-green-100 p-2 
                    rounded-md gap-2 justify-between"
        >
          <p className="text-sm font-medium">Answer done</p>
          <div>
            <BsFillCheckSquareFill className="text-green-600" />
          </div>
        </div>
      ) : (
        <div
          className="cstm-flex-row w-full bg-red-100 p-2 
                    rounded-md gap-2 justify-between"
        >
          <p className="text-sm font-medium">Answer required</p>
          <div>
            <BsFillExclamationOctagonFill className="text-red-600" />
          </div>
        </div>
      )}

      {props.question ? (
        <div
          className="cstm-flex-row w-full bg-green-100 p-2 
                    rounded-md gap-2 justify-between"
        >
          <p className="text-sm font-medium">Question done</p>
          <div>
            <BsFillCheckSquareFill className="text-green-600" />
          </div>
        </div>
      ) : (
        <div
          className="cstm-flex-row w-full bg-red-100 p-2 
                    rounded-md gap-2 justify-between"
        >
          <p className="text-sm font-medium">Question required</p>

          <div>
            <BsFillExclamationOctagonFill className="text-red-600" />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={props.handleSelectedCard}
        className="bg-prmColor w-fit cstm-flex-row
                text-accntColor p-2 rounded-md text-sm px-5 ml-auto"
      >
        View
      </button>
    </div>
  );
};

export default AddTestCard;

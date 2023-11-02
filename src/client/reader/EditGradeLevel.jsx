"use client";
import React from "react";
import ConfirmEditGradeLevel from "./ConfirmEditGradeLevel";

import { useSession } from "next-auth/react";
import { IoClose } from "react-icons/io5";

const EditGradeLevel = (props) => {
  const [canSeeConfirmGradeChange, setCanSeeConfirmGradeChange] = React.useState(false);
  const [chosenGrade, setChosenGrade] = React.useState({
    grade: props.gradeLevel,
    lexile: props.lexile,
  });
  const gradeLevels = React.useMemo(
    () => [
      { grade: 3, lexile: 530 },
      { grade: 4, lexile: 735 },
      { grade: 5, lexile: 900 },
      { grade: 6, lexile: 990 },
    ],
    []
  );

  const { data: session } = useSession();
  const user = session?.user?.name;

  const handleChosenGrade = (grade, lexile) => {
    setChosenGrade({ grade, lexile });
  };

  const handleCanSeeConfirmGradeChange = () => {
    setCanSeeConfirmGradeChange((prev) => !prev);
  };

  const gradesAndLexile = gradeLevels.map((g) => {
    return (
      <button
        onClick={() => {
          handleChosenGrade(g.grade, g.lexile);
          handleCanSeeConfirmGradeChange();
        }}
        value={g.grade}
        key={g.grade}
        className="cstm-flex-row w-full bg-prmColor p-2 rounded-md text-accntColor text-sm t:text-base"
      >
        <p className="mr-auto text-scndColor font-bold">Grade {g.grade}</p> <p>{g.lexile}L</p>
      </button>
    );
  });

  return (
    <div
      className="fixed w-full h-auto min-h-full  backdrop-blur-md bg-gradient-to-br animate-fadeIn
                from-[#552aca32] to-[#4bfce132] cstm-flex-col gap-2 p-4 top-0 left-0 z-[60] justify-start"
    >
      {canSeeConfirmGradeChange ? (
        <ConfirmEditGradeLevel
          chosenGrade={chosenGrade}
          confirmation={`Grade ${chosenGrade.grade} - Yes`}
          handleCanSeeConfirmGradeChange={handleCanSeeConfirmGradeChange}
          handleCanEditGradeLevel={props.handleCanEditGradeLevel}
          getUserData={props.getUserData}
        />
      ) : null}

      <button onClick={props.handleCanEditGradeLevel} className="cstm-bg-hover ml-auto">
        <IoClose className="text-prmColor text-xl" />
      </button>

      <div className="cstm-flex-col  my-auto w-full">
        <div
          className="cstm-flex-col w-full h-full gap-4 t:w-8/12 l-s:w-6/12 l-l:w-4/12 
                    bg-white  shadow-solid shadow-prmColor border-2 border-prmColor rounded-2xl p-4 justify-start "
        >
          <p className="text-xs text-center">
            <span className="font-bold text-prmColor">note:</span> changing your grade level will affect your lexile
            level and reset it to the lowest level in the grade you will choose.
          </p>

          <p className="font-bold">Grade and Lexile</p>

          <div className="cstm-flex-row w-full text-xs">
            <p className="mr-auto">
              Your Grade: <span className="font-semibold">{props.gradeLevel}</span>{" "}
            </p>{" "}
            <p>
              Your Lexile: <span className="font-semibold">{props.lexile}L</span>{" "}
            </p>
          </div>

          <div className="cstm-flex-col gap-2 w-full ">{gradesAndLexile}</div>
        </div>
      </div>
    </div>
  );
};

export default EditGradeLevel;

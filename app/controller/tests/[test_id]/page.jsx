"use client";
import React from "react";
import AdminPageHeader from "@/admin/global/PageHeader";
import TestChoices from "@/components/tests/TestChoices";
import axios from "axios";
import Link from "next/link";
import Message from "@/components/global/Message";
import ScorePopup from "@/components/tests/ScorePopup";
import TestResult from "@/src/admin/tests/TestResult";
import DeleteData from "@/admin/global/DeleteData";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { choicesStyle, shuffleQuestions } from "@/functions/testFns";

import { isTokenExpired } from "@/functions/jwtFns";
import { useTestControls } from "@/hooks/useTestControls";
import { useMessage } from "@/hooks/useMessage";

const SingleTest = () => {
  const [canDeleteTest, setCanDeleteTest] = React.useState(false);
  const [canSeeResult, setCanSeeResult] = React.useState(false); // see result

  const {
    testData,
    questions,
    isFinished,
    score,
    selectedChoices,
    handleIsFinished,
    handleSelectedChoices,
    computeScore,
    setNewTestData,
    setNewQuestions,
  } = useTestControls();

  const { message, setMessageStatus } = useMessage();

  const url = process.env.NEXT_PUBLIC_API_URL;
  const { data: session } = useSession({ required: true });
  const params = useParams();
  const testId = params?.test_id;
  const user = session?.user;
  const router = useRouter();

  // toggle can delete
  const handleCanDeleteTest = () => {
    setCanDeleteTest((prev) => !prev);
  };

  // toggle can see result
  const handleCanSeeResult = () => {
    setCanSeeResult((prev) => !prev);
  };

  // get test
  const getTest = React.useCallback(async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/admin_test/${testId}`, {
          headers: { Authorization: user?.token },
        });

        // if no test, move to add test page
        if (data) {
          setNewTestData(data);
        } else {
          router.push(`/controller/tests/add/${params?.test_id}`);
        }
      } catch (error) {
        console.log(error);
        setMessageStatus(true, error?.response?.data?.msg, "error");
        router.push(`/controller/tests/add/${params?.test_id}`);
      }
    }
  }, [
    url,
    user?.token,
    testId,
    router,
    params?.test_id,
    setNewTestData,
    setMessageStatus,
  ]);

  // get questions
  const getQuestions = React.useCallback(async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/admin_test_question`, {
          params: { testId: testId },
          headers: { Authorization: user?.token },
        });

        if (data) {
          shuffleQuestions(data);
          setNewQuestions(data);
        }
      } catch (error) {
        console.log(error);
        setMessageStatus(true, error?.response?.data?.msg, "error");
      }
    }
  }, [url, user?.token, testId, setNewQuestions, setMessageStatus]);

  // map questions
  const mappedQuestions = questions.map((q, i) => {
    return (
      <div
        className="p-4 bg-white rounded-md w-full cstm-flex-col gap-4 items-start"
        key={q.question_id}
      >
        <p className="font-bold">{q.question}</p>

        <div className="cstm-separator" />

        <div className="cstm-flex-col gap-3 w-full t:cstm-flex-row">
          {[1, 2, 3, 4].map((choiceNumber) => {
            const currChoice = q[`choice_${choiceNumber}`];

            return (
              <React.Fragment key={choiceNumber}>
                <TestChoices
                  bgColor={choicesStyle[choiceNumber].bgColor}
                  shadow={choicesStyle[choiceNumber].shadow}
                  shadowActive={choicesStyle[choiceNumber].shadowActive}
                  choice={currChoice}
                  name={`choice${i + 1}`}
                  selectedChoices={selectedChoices}
                  handleSelectedChoices={handleSelectedChoices}
                  questionId={q.question_id}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  });

  React.useEffect(() => {
    getTest();
  }, [getTest]);

  React.useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="p-4 w-full min-h-screen bg-accntColor cstm-flex-col gap-4">
      <AdminPageHeader subHeader="Tests" mainHeader={testData?.title} />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      {isFinished ? (
        <ScorePopup
          score={score}
          handleIsFinished={() => handleIsFinished(false)}
        />
      ) : null}

      {canDeleteTest ? (
        <DeleteData
          apiRoute={`${url}/admin_test/${testId}`}
          returnRoute="/controller/tests"
          confirmation={testData?.title}
          handleCanDeleteData={handleCanDeleteTest}
          resourceType="test"
        />
      ) : null}

      {canSeeResult ? (
        <TestResult
          selectedChoices={selectedChoices}
          questions={questions}
          handleCanSeeResult={handleCanSeeResult}
        />
      ) : null}

      <div className="cstm-flex-col w-full ">
        <p className="text-sm text-center">
          <b>note:</b> admin submissions are <b>not</b> recorded
        </p>

        <div className="cstm-flex-col w-full gap-4 l-s:w-10/12">
          <div className="cstm-flex-row w-full">
            <Link
              href="/controller/tests"
              className="w-fit cstm-bg-hover mr-auto"
            >
              <BsArrowLeft className=" text-prmColor" />
            </Link>

            <Link
              href={`/controller/tests/edit/${params.test_id}`}
              className="cstm-bg-hover"
            >
              <AiFillEdit className=" text-prmColor cursor-pointer" />
            </Link>

            <button onClick={handleCanDeleteTest} className="cstm-bg-hover">
              <AiFillDelete className="text-prmColor cursor-pointer" />
            </button>
          </div>

          {mappedQuestions}

          <div className="cstm-flex-col w-full gap-4 t:cstm-flex-row ">
            <button
              onClick={() => {
                computeScore();
                handleIsFinished(true);
              }}
              className={`p-2 bg-prmColor text-scndColor text-sm rounded-full font-semibold 
                        w-full mt-5 t:mt-0 t:w-fit t:px-10 t:mr-auto`}
            >
              Submit Answers
            </button>

            <button
              onClick={handleCanSeeResult}
              className="bg-scndColor p-2 w-full t:w-fit t:px-10 t:ml-auto rounded-full font-semibold 
                    text-sm text-prmColor "
            >
              See Mistakes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTest;

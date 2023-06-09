"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import TestChoices from "@/src/src/admin/tests/TestChoices";
import axios from "axios";
import Link from "next/link";
import Message from "@/src/src/components/global/Message";
import ScorePopup from "@/src/src/components/tests/ScorePopup";
import DeleteTest from "@/src/src/admin/tests/DeleteTest";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { useGlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { computeScore, shuffleQuestions } from "@/src/src/functions/testFns";
import TestResult from "@/src/src/client/tests/TestResult";

const SingleTest = ({ params }) => {
  const [test, setTest] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [canDeleteTest, setCanDeleteTest] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);
  const [canToggleSeeResult, setCanToggleSeeResult] = React.useState(false); // see button
  const [canSeeResult, setCanSeeResult] = React.useState(false); // see result
  const [message, setMessage] = React.useState({ msg: "", active: false });
  const [selectedChoices, setSelectedChoices] = React.useState({
    choice1: { answer: "", questionId: -1 },
    choice2: { answer: "", questionId: -1 },
    choice3: { answer: "", questionId: -1 },
    choice4: { answer: "", questionId: -1 },
    choice5: { answer: "", questionId: -1 },
    choice6: { answer: "", questionId: -1 },
    choice7: { answer: "", questionId: -1 },
    choice8: { answer: "", questionId: -1 },
    choice9: { answer: "", questionId: -1 },
    choice10: { answer: "", questionId: -1 },
  });

  const { url } = useGlobalContext();
  const { data: session } = useSession({ required: true });

  const handleSelectedChoices = (id, { name, value }) => {
    setSelectedChoices((prev) => {
      return {
        ...prev,
        [name]: { answer: value, questionId: id },
      };
    });
  };

  const handleIsFinished = () => {
    setIsFinished((prev) => !prev);
  };

  const handleCanDeleteTest = () => {
    setCanDeleteTest((prev) => !prev);
  };

  const handleCanSeeResult = () => {
    setCanSeeResult((prev) => !prev);
  };

  const handleCanSeeToggleResult = () => {
    setCanToggleSeeResult((prev) => !prev);
  };

  const testId = params?.test_id;
  const user = session?.user?.name;
  const router = useRouter();

  const mappedQuestions = questions.map((q, i) => {
    return (
      <div
        className="p-5 bg-white rounded-md w-full cstm-flex-col gap-5 items-start t:w-10/12 l-l:w-8/12"
        key={q.question_id}
      >
        <p className="font-bold">{q.question}</p>
        <div className="cstm-separator" />
        <div className="cstm-flex-col gap-3 w-full t:cstm-flex-row t:flex-wrap">
          <TestChoices
            bgColor="bg-indigo-300"
            shadow="shadow-[0_4px_rgba(129,140,248,1)]"
            shadowActive="shadow-[inset_0_4px_rgba(129,140,248,1)]"
            choice={q.choice_1}
            name={"choice" + (i + 1)}
            selectedChoices={selectedChoices}
            handleSelectedChoices={handleSelectedChoices}
            questionId={q.question_id}
          />
          <TestChoices
            bgColor="bg-indigo-500"
            shadow="shadow-[0_4px_rgba(79,70,229,1)]"
            shadowActive="shadow-[inset_0_4px_rgba(79,70,229,1)]"
            choice={q.choice_2}
            name={"choice" + (i + 1)}
            selectedChoices={selectedChoices}
            handleSelectedChoices={handleSelectedChoices}
            questionId={q.question_id}
          />
          <TestChoices
            bgColor="bg-indigo-700"
            shadow="shadow-[0_4px_rgba(55,48,163,1)]"
            shadowActive="shadow-[inset_0_4px_rgba(55,48,163,1)]"
            choice={q.choice_3}
            name={"choice" + (i + 1)}
            selectedChoices={selectedChoices}
            handleSelectedChoices={handleSelectedChoices}
            questionId={q.question_id}
          />
          <TestChoices
            bgColor="bg-indigo-900"
            shadow="shadow-[0_4px_rgba(25,22,75,1)]"
            shadowActive="shadow-[inset_0_4px_rgba(25,22,75,1)]"
            choice={q.choice_4}
            name={"choice" + (i + 1)}
            selectedChoices={selectedChoices}
            handleSelectedChoices={handleSelectedChoices}
            questionId={q.question_id}
          />
        </div>
      </div>
    );
  });

  const getQuestions = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_test_question`, {
        params: { testId },
        headers: { Authorization: user?.token },
      });
      if (data) {
        shuffleQuestions(data);
        setQuestions(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, testId, setQuestions]);

  const getTest = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_test/${testId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setTest(data);
      } else {
        router.push(`/controller/tests/add/${testId}`);
      }
    } catch (error) {
      console.log(error);
      router.push(`/controller/tests/add/${testId}`);
    }
  }, [url, user, testId, router]);

  React.useEffect(() => {
    if (user) {
      getTest();
    }
  }, [user, getTest]);

  React.useEffect(() => {
    if (user) {
      getQuestions();
    }
  }, [user, getQuestions]);

  return (
    <div className="p-5 w-full min-h-screen bg-accntColor cstm-flex-col gap-2">
      <AdminPageHeader subHeader="Tests" mainHeader={test?.title} />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {isFinished ? <ScorePopup score={score} handleIsFinished={handleIsFinished} /> : null}

      {canDeleteTest ? (
        <DeleteTest
          handleCanDeleteTest={handleCanDeleteTest}
          confirmation={test?.title}
          testId={params.test_id}
        />
      ) : null}

      {canSeeResult ? (
        <TestResult
          selectedChoices={selectedChoices}
          questions={questions}
          handleCanSeeResult={handleCanSeeResult}
        />
      ) : null}

      <div className="cstm-flex-col gap-2 w-full cstm-w-limit">
        <p className="text-sm text-center">
          <b>note:</b> admin submissions are <b>not</b> recorded
        </p>

        <div className="cstm-flex-row w-full t:w-10/12 l-l:w-8/12">
          <Link href="/controller/tests" className="w-fit cstm-bg-hover mr-auto">
            <BsArrowLeft className=" text-prmColor" />
          </Link>

          <Link href={`/controller/tests/edit/${params.test_id}`} className="cstm-bg-hover">
            <AiFillEdit className=" text-prmColor cursor-pointer" />
          </Link>

          <div className="cstm-bg-hover">
            <AiFillDelete className="text-prmColor cursor-pointer" onClick={handleCanDeleteTest} />
          </div>
        </div>

        {mappedQuestions}

        <div className="cstm-flex-col w-full gap-2 t:cstm-flex-row t:w-10/12 l-l:w-8/12">
          <button
            onClick={() => {
              computeScore(setScore, setIsFinished, questions, selectedChoices);
              handleCanSeeToggleResult();
            }}
            className={`p-2 bg-prmColor text-scndColor text-sm rounded-full w-full mt-5 t:mt-0 t:w-fit t:px-10 t:${
              canToggleSeeResult ? "mr-auto" : "mr-0"
            } shadow-[0_4px_rgba(55,48,163,1)]`}
          >
            Submit Answers
          </button>

          {canToggleSeeResult ? (
            <button
              onClick={handleCanSeeResult}
              className="bg-scndColor p-2 w-full t:w-fit t:px-10 t:ml-auto rounded-full text-sm text-prmColor shadow-solid shadow-cyan-800"
            >
              See Mistakes
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SingleTest;

"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import TestChoices from "@/src/src/components/tests/TestChoices";
import TestQuestion from "@/src/src/components/tests/TestQuestion";
import axios from "axios";
import Link from "next/link";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { useGlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ScorePopup from "@/src/src/components/tests/ScorePopup";
import DeleteTest from "@/src/src/admin/tests/DeleteTest";

const SingleTest = ({ params }) => {
  const [test, setTest] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [canDeleteTest, setCanDeleteTest] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);
  const [selectedChoices, setSelectedChoices] = React.useState({
    choice1: { answer: "", question_id: -1 },
    choice2: { answer: "", question_id: -1 },
    choice3: { answer: "", question_id: -1 },
    choice4: { answer: "", question_id: -1 },
    choice5: { answer: "", question_id: -1 },
    choice6: { answer: "", question_id: -1 },
    choice7: { answer: "", question_id: -1 },
    choice8: { answer: "", question_id: -1 },
    choice9: { answer: "", question_id: -1 },
    choice10: { answer: "", question_id: -1 },
  });

  const { url } = useGlobalContext();
  const { data: session } = useSession({ required: true });

  const handleSelectedChoices = (id, { name, value }) => {
    setSelectedChoices((prev) => {
      return {
        ...prev,
        [name]: { answer: value, question_id: id },
      };
    });
  };

  const handleIsFinished = () => {
    setIsFinished((prev) => !prev);
  };

  const handleCanDeleteTest = () => {
    setCanDeleteTest((prev) => !prev);
  };

  const shuffleQuestions = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  };

  const computeScore = () => {
    let score = 0;
    let visited = [];

    for (let i = 0; i < 10; i++) {
      const q = questions[i];
      for (let j = 1; j <= 10; j++) {
        const choiceIdx = "choice" + j;
        const currChoice = selectedChoices[choiceIdx];
        if (currChoice.question_id === q.question_id && !visited.includes(q.question_id)) {
          if (q.answer === currChoice.answer) {
            score++;
            visited.push(q.question_id);
          }
          break;
        }
      }
    }

    setScore(score);
    setIsFinished(true);
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
        <TestQuestion question={q.question} />
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
    }
  }, [url, user, testId, setSelectedChoices, setQuestions]);

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
      router.push(`/controller/tests/add/${testId}`);
      console.log(error);
    }
  }, [url, user, testId]);

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
      {isFinished ? <ScorePopup score={score} handleIsFinished={handleIsFinished} /> : null}
      {canDeleteTest ? (
        <DeleteTest
          handleCanDeleteTest={handleCanDeleteTest}
          confirmation={test?.title}
          testId={params.test_id}
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

        <button
          onClick={computeScore}
          className="p-2 bg-prmColor text-scndColor rounded-full w-full mt-5 t:w-fit t:px-10 shadow-[0_4px_rgba(55,48,163,1)]"
        >
          Submit Answers
        </button>
      </div>
    </div>
  );
};

export default SingleTest;

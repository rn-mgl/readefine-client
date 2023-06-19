"use client";
import axios from "axios";
import React from "react";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import QuestionSlide from "@/src/src/client/tests/QuestionSlide";

import { useSession } from "next-auth/react";
import { shuffleQuestions } from "@/src/src/functions/testFns";
import { useGlobalContext } from "@/src/context";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const SingleTest = ({ params }) => {
  const [testData, setTestData] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [activePage, setActivePage] = React.useState(0);
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
  const { data: session } = useSession();
  const testId = params?.test_id;
  const user = session?.user?.name;

  const handleSelectedChoices = (id, { name, value }) => {
    setSelectedChoices((prev) => {
      return {
        ...prev,
        [name]: { answer: value, question_id: id },
      };
    });
  };

  const handleIncrement = () => {
    setActivePage((prev) => (prev + 1 > 9 ? 9 : prev + 1));
  };

  const handleDecrement = () => {
    setActivePage((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  const questionSlides = questions.map((q, index) => {
    return (
      <React.Fragment key={q.question_id}>
        <QuestionSlide
          question={q.question}
          choice1={q.choice_1}
          choice2={q.choice_2}
          choice3={q.choice_3}
          choice4={q.choice_4}
          index={index}
          selectedChoices={selectedChoices}
          questionId={q.question_id}
          activePage={activePage}
          handleSelectedChoices={handleSelectedChoices}
          maxPage={10}
        />
      </React.Fragment>
    );
  });

  const getTestData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/test/${testId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setTestData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, testId]);

  const getQuestions = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/test_question`, {
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
  }, [user, url, testId]);

  React.useEffect(() => {
    if (user) {
      getTestData();
    }
  }, [user, getTestData]);

  React.useEffect(() => {
    if (user) {
      getQuestions();
    }
  }, [user, getQuestions]);

  return (
    <div className="p-5 w-full min-h-screen bg-accntColor cstm-flex-col gap-2 justify-start overflow-hidden">
      <ClientPageHeader mainHeader={testData?.title} subHeader="Test" />

      <div
        className="cstm-flex-row items-start gap-2 w-full cstm-w-limit relative h-[75vh]
                  t:h-[50vh]"
      >
        <Link href="/archives/tests" className="cstm-bg-hover mr-auto">
          <BsArrowLeft className="text-prmColor" />
        </Link>
        {questionSlides}
        <div className="cstm-flex-row absolute -bottom-20 w-full t:-bottom-24">
          <button
            onClick={handleDecrement}
            className="bg-prmColor p-2 w-16 rounded-md cstm-flex-col font-medium text-white shadow-solid shadow-indigo-950"
          >
            <AiFillCaretLeft />
          </button>
          <p className="mx-auto">{activePage + 1}</p>
          <button
            onClick={handleIncrement}
            className="bg-prmColor p-2 w-16 rounded-md cstm-flex-col font-medium text-white shadow-solid shadow-indigo-950"
          >
            <AiFillCaretRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTest;

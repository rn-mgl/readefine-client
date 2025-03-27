"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";

import AdminPageHeader from "@/admin/global/PageHeader";
import EditTestPage from "@/admin/tests/EditTestPage";
import Loading from "@/components/global/Loading";
import Message from "@/components/global/Message";

import { isTokenExpired } from "@/functions/jwtFns";

import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import EditTestCard from "@/src/admin/tests/EdiTestCard";
import useAdminActivities from "@/src/hooks/useAdminActivities";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

const EditTest = () => {
  const [test, setTest] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(0);

  const { createAdminActivity } = useAdminActivities();
  const { loading, setLoadingState } = useLoading(false);
  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession({ required: true });
  const url = process.env.NEXT_PUBLIC_API_URL;
  const user = session?.user;
  const router = useRouter();
  const params = useParams();
  const testId = params?.test_id;

  // handle onchange on questions
  const handleQuestions = (questionId, { name, value }) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.question_id === questionId) {
          return {
            ...q,
            [name]: value,
          };
        }
        return q;
      })
    );
  };

  const handleSelectedCard = (id) => {
    setSelectedCard((prev) => (prev === id ? 0 : id));
  };

  //handle edit test
  const editTest = async (e) => {
    e.preventDefault();

    setLoadingState(true);

    for (let i = 0; i < 10; i++) {
      const q = questions[i];
      const answerKey = `answer${q.question_id}`;
      const currAnswer = q[answerKey];

      if (
        !currAnswer ||
        (currAnswer !== q["choice_1"] &&
          currAnswer !== q["choice_2"] &&
          currAnswer !== q["choice_3"] &&
          currAnswer !== q["choice_4"])
      ) {
        setLoadingState(false);
        setMessageStatus(
          true,
          `You do not have an answer in number ${i + 1}.`,
          "error"
        );
        return;
      }

      if (!q.question) {
        setLoadingState(false);
        setMessageStatus(
          true,
          `You do not have a question in number ${i + 1}.`,
          "error"
        );
        return;
      }
    }

    try {
      const { data } = await axios.patch(
        `${url}/admin_test/${testId}`,
        { questions, testId: testId },
        { headers: { Authorization: user.token } }
      );

      if (data) {
        const activityData = await createAdminActivity(
          "test",
          test?.title,
          "U"
        );

        if (activityData) {
          router.push(`/controller/tests/${params?.test_id}`);
        }
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  // get questions
  const getQuestions = React.useCallback(async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/admin_test_question`, {
          params: { testId: testId },
          headers: { Authorization: user?.token },
        });

        if (data) {
          //set new answer key to prevent duplicate changes onchange
          const newQuestions = data.map((d) => {
            const answerKey = `answer${d.question_id}`;
            return {
              ...d,
              [answerKey]: d.answer,
            };
          });

          setQuestions(newQuestions);
        }
      } catch (error) {
        console.log(error);
        setMessageStatus(true, error?.response?.data?.msg, "error");
      }
    }
  }, [url, user?.token, testId, setMessageStatus]);

  // get test
  const getTest = React.useCallback(async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/admin_test/${testId}`, {
          headers: { Authorization: user?.token },
        });

        if (data) {
          setTest(data);
        }
      } catch (error) {
        console.log(error);
        setMessageStatus(true, error?.response?.data?.msg, "error");
      }
    }
  }, [url, user?.token, testId, setMessageStatus]);

  // map questions
  const testQuestions = questions.map((q, index) => {
    const answer = `answer${q.question_id}`;
    return (
      <React.Fragment key={q?.question_id}>
        <EditTestCard
          answer={q[answer]}
          testNumber={index + 1}
          question={q.question}
          handleSelectedCard={() => handleSelectedCard(q.question_id)}
        />
      </React.Fragment>
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 bg-accntColor w-full min-h-screen cstm-flex-col gap-4 justify-start">
      <AdminPageHeader subHeader={test?.title} mainHeader="Edit Test" />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      {selectedCard ? (
        <EditTestPage
          questions={questions}
          selectedCard={selectedCard}
          handleSelectedCard={handleSelectedCard}
          handleQuestions={handleQuestions}
        />
      ) : null}

      <div className="w-full cstm-flex-row ">
        <Link
          href={`/controller/tests/${params?.test_id}`}
          className="w-fit cstm-bg-hover mr-auto"
        >
          <BsArrowLeft className=" text-prmColor" />
        </Link>
      </div>

      <form
        onSubmit={(e) => editTest(e)}
        className="w-full cstm-flex-col  border-collapse gap-4 bg-white rounded-2xl p-4"
      >
        <div className="w-full mb-auto gap-4 grid grid-cols-1 t:grid-cols-2 l-l:grid-cols-3">
          {testQuestions}
        </div>

        <button
          type="submit"
          className="w-fit text-center  ml-auto text-sm font-semibold
                  bg-scndColor text-prmColor rounded-full p-2 px-4 t:px-10"
        >
          Edit Test
        </button>
      </form>
    </div>
  );
};

export default EditTest;

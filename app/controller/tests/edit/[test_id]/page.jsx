"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import EditTestPage from "@/src/src/admin/tests/EditTestPage";
import ActionLabel from "@/src/src/components/global/ActionLabel";
import Link from "next/link";
import Message from "@/src/src/components/global/Message";

import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import axios from "axios";

const EditTest = ({ params }) => {
  const [test, setTest] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false });

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();

  const user = session?.user?.name;
  const router = useRouter();
  const testId = params?.test_id;

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

  const testQuestions = questions.map((q, idx) => {
    return (
      <React.Fragment key={q?.question_id}>
        <EditTestPage
          handleQuestions={handleQuestions}
          questionId={q?.question_id}
          question={q}
          testNumber={idx + 1}
        />
      </React.Fragment>
    );
  });

  const editTest = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch(
        `${url}/admin_test/${testId}`,
        { questions },
        { headers: { Authorization: user.token } }
      );
      if (data) {
        router.push(`/controller/tests/${testId}`);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  };

  const getQuestions = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_test_question`, {
        params: { testId },
        headers: { Authorization: user?.token },
      });
      if (data) {
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
      setMessage({ active: true, msg: error?.response?.data?.msg });
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
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-2 justify-start">
      <AdminPageHeader subHeader={test?.title} mainHeader="Edit Test" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      <form
        onSubmit={(e) => editTest(e)}
        className="w-full cstm-flex-col cstm-w-limit border-collapse gap-5"
      >
        <Link
          type="button"
          href={`/controller/tests/${testId}`}
          className="w-fit cstm-bg-hover mr-auto"
        >
          <BsArrowLeft className=" text-prmColor" />
        </Link>
        {testQuestions}

        <button
          type="submit"
          className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-scndColor text-prmColor rounded-full p-2 px-4"
        >
          Edit Test
        </button>
      </form>
    </div>
  );
};

export default EditTest;

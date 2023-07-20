"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";

import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import EditTestPage from "@/src/src/admin/tests/EditTestPage";
import Message from "@/src/src/components/global/Message";

import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { decipher } from "@/src/src/functions/security";

const EditTest = ({ params }) => {
  const [test, setTest] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false });

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();
  const decodedTestId = decipher(params?.test_id);

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

  //handle edit test
  const editTest = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch(
        `${url}/admin_test/${decodedTestId}`,
        { questions },
        { headers: { Authorization: user.token } }
      );

      if (data) {
        router.push(`/controller/tests/${params?.test_id}`);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  };

  // get questions
  const getQuestions = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_test_question`, {
        params: { testId: decodedTestId },
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
  }, [url, user, decodedTestId, setQuestions]);

  // get test
  const getTest = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_test/${decodedTestId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setTest(data);
      } else {
        router.push(`/controller/tests/add/${decodedTestId}`);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, decodedTestId, router]);

  // map questions
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
          href={`/controller/tests/${params?.test_id}`}
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

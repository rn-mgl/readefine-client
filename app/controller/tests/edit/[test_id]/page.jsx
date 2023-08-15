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
import Loading from "@/src/src/components/global/Loading";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

const EditTest = ({ params }) => {
  const [test, setTest] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });
  const [loading, setLoading] = React.useState(false);

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

    setLoading(true);

    questions.forEach((q, i) => {
      const answerKey = `answer${q.question_id}`;

      if (!q[answerKey]) {
        setLoading(false);
        setMessage({
          active: true,
          msg: `You do not have an answer in number ${i + 1}.`,
          type: "error",
        });
        return;
      }

      if (!q.question) {
        setLoading(false);
        setMessage({
          active: true,
          msg: `You do not have a question in number ${i + 1}.`,
          type: "error",
        });
        return;
      }
    });

    try {
      const { data } = await axios.patch(
        `${url}/admin_test/${decodedTestId}`,
        { questions, testId: decodedTestId },
        { headers: { Authorization: user.token } }
      );

      if (data) {
        router.push(`/controller/tests/${params?.test_id}`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
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
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
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
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
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

  /* eslint-disable react-hooks/exhaustive-deps */
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
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
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
          className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-scndColor text-prmColor rounded-full p-2 px-4 t:px-10"
        >
          Edit Test
        </button>
      </form>
    </div>
  );
};

export default EditTest;

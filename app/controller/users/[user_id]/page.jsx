"use client";
import React from "react";
import axios from "axios";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import Link from "next/link";
import Message from "@/src/src/components/global/Message";

// chart.js is needed to view the react charts
import { Chart as ChartJS } from "chart.js/auto";
import { defaults } from "chart.js";
import { Line, Scatter } from "react-chartjs-2";
import { getDaysInMonth, localizeDate, monthMap } from "@/src/src/functions/localDate";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

const SingleUser = ({ params }) => {
  const [userData, setUserData] = React.useState({});
  const [userLexile, setUserLexile] = React.useState([]);
  const [userReads, setUserReads] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false });
  const [userQuizzes, setUserQuizzes] = React.useState([]);

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const userId = params?.user_id;
  const user = session?.user?.name;

  defaults.font.family = "Poppins";
  defaults.font.size = 12;
  defaults.font.style = "italic";

  const mapLexileToDays = () => {
    let curr = userLexile[0]?.lexile;
    // set the initial values to be the oldest (curr) record
    const days = getDaysInMonth(new Date()).map(() => curr);
    for (let i = 0; i < days.length; i++) {
      // check if i is within the user lexile length
      if (i < userLexile.length) {
        // change the current value to the next latest lexile data
        curr = userLexile[i];
      }
      // check if the current value exists
      if (curr) {
        // get the day as index
        const dayIdx = new Date(curr.date_added).getDate();
        // -1 to place in the "today" data
        days[dayIdx - 1] = curr.lexile;
        // to place in the "tomorrow" data for possibility of no entry
        days[dayIdx] = curr.lexile;
      }
    }
    return days;
  };

  const lexileChartData = {
    labels: getDaysInMonth(new Date()),
    datasets: [
      {
        label: `Lexile Growth | ${monthMap[new Date().getMonth()]}`,
        data: mapLexileToDays(),
        backgroundColor: "#542ACA",
        borderColor: "#542ACA",
        borderWidth: 1,
        tension: 0,
      },
    ],
  };

  const mapBooksReadToDays = () => {
    let counts = getDaysInMonth(new Date()).map((_, i) => {
      return {
        x: i + 1,
        y: undefined,
      };
    });

    for (let i = 0; i < counts.length; i++) {
      const curr = userReads[i];

      if (curr) {
        const dayIdx = new Date(curr.date_read).getDate();
        const data = { x: dayIdx, y: curr.lexile };
        counts[dayIdx - 1] = data;
      }
    }

    return counts;
  };

  const booksChartData = {
    datasets: [
      {
        label: `Lexiles of Books Read | ${monthMap[new Date().getMonth()]}`,
        data: mapBooksReadToDays(),
        borderWidth: 1,
        tension: 0.4,
        backgroundColor: "#4BFCE1",
        borderColor: "#4BFCE1",
      },
    ],
  };

  const mapQuizScoresToDays = () => {
    let counts = getDaysInMonth(new Date()).map((_, i) => {
      return {
        x: i + 1,
        y: undefined,
      };
    });

    for (let i = 0; i < counts.length; i++) {
      const curr = userReads[i];
      if (curr) {
        const dayIdx = new Date(curr.date_read).getDate();
        const data = { x: dayIdx, y: curr.lexile };
        counts[dayIdx - 1] = data;
      }
    }

    return counts;
  };

  const gamesChartData = {
    datasets: [
      {
        label: `Quizzes Answered | ${monthMap[new Date().getMonth()]}`,
        data: mapQuizScoresToDays(),
        backgroundColor: "#D498FF",
        borderColor: "#D498FF",
        borderWidth: 1,
        tension: 0.4,
        fill: "origin",
      },
    ],
  };

  const getUserData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_user/${userId}`, {
        headers: { Authorization: user.token },
      });

      if (data) {
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, setUserData, userId]);

  const getUserLexile = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_user_lexile`, {
        params: { userId },
        headers: { Authorization: user.token },
      });

      if (data) {
        setUserLexile(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, setUserLexile, userId]);

  const getUserBooksRead = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_read_story`, {
        params: { userId },
        headers: { Authorization: user.token },
      });

      if (data) {
        setUserReads(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, setUserReads, userId]);

  const getUserQuizzesAnswered = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_answered_questions`, {
        params: { userId },
        headers: { Authorization: user.token },
      });

      if (data) {
        setUserQuizzes(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, setUserQuizzes, userId]);

  React.useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [getUserData, user]);

  React.useEffect(() => {
    if (user) {
      getUserLexile();
    }
  }, [getUserLexile, user]);

  React.useEffect(() => {
    if (user) {
      getUserBooksRead();
    }
  }, [getUserBooksRead, user]);

  React.useEffect(() => {
    if (user) {
      getUserQuizzesAnswered();
    }
  }, [getUserQuizzesAnswered, user]);

  return (
    <div className="w-full min-h-screen bg-accntColor cstm-flex-col justify-start p-5 gap-2">
      <AdminPageHeader subHeader="User" mainHeader="Dashboard" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      <div className="cstm-flex-col gap-5 w-full cstm-w-limit ">
        <Link href="/controller/users" className="cstm-bg-hover text-prmColor mr-auto">
          <BsArrowLeft />
        </Link>
        <div className="cstm-flex-col gap-5 w-full t:cstm-flex-row">
          <div className="cstm-flex-col bg-white rounded-2xl p-5 w-full">
            <div className="cstm-flex-row gap-2 w-full justify-start">
              <div
                style={{ backgroundImage: userData.image ? `url("${userData.image}")` : null }}
                className="w-12 h-12 rounded-full bg-prmColor bg-opacity-10 bg-cover bg-center"
              />
              <div className="cstm-flex-col items-start">
                <p className="capitalize font-bold text-black text-base">
                  {userData.name} {userData.surname}
                </p>
                <p className="font-light text-xs">{userData.email}</p>
              </div>
              <Link className="cstm-bg-hover ml-auto" href={`mailto:${userData.email}`}>
                <AiOutlineMail className=" scale-125 text-prmColor" />
              </Link>
            </div>
          </div>

          <div className="cstm-flex-col bg-white rounded-2xl p-5 w-full t:w-4/12">
            <p className="font-bold text-prmColor text-xl">{userData?.lexile}</p>
            <p className="text-sm">Lexile Level</p>
          </div>
        </div>

        <div className="cstm-flex-col gap-5 w-full min-h-screen ">
          <div className="cstm-flex-col w-full h-auto min-h-[30rem] p-5 bg-white rounded-2xl">
            <Line
              data={lexileChartData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>

          <div className="cstm-flex-col w-full h-auto min-h-[30rem] p-5 bg-white rounded-2xl">
            <Scatter
              data={booksChartData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>

          <div className="cstm-flex-col w-full h-auto min-h-[30rem] p-5 bg-white rounded-2xl">
            <Scatter
              data={gamesChartData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;

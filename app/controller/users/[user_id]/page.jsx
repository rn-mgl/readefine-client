"use client";
import React from "react";
import axios from "axios";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import Link from "next/link";

import { Chart as ChartJS } from "chart.js/auto";
import { defaults } from "chart.js";
import { Line } from "react-chartjs-2";
import { getDaysInMonth, monthMap } from "@/src/src/functions/localDate";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { BsArrowLeft } from "react-icons/bs";

const SingleUser = ({ params }) => {
  const [userData, setUserData] = React.useState({});
  const [userLexile, setUserLexile] = React.useState([]);
  const [userReads, setUserReads] = React.useState([]);
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
    // set the initial values to be the oldest record
    const days = getDaysInMonth(new Date()).map(() => curr);

    for (let i = 0; i < days.length; i++) {
      // check if the loop index is within the user lexile length
      if (i < userLexile.length) {
        // change the current value to the next latest data
        curr = userLexile[i];
      }

      // check if the current value exists
      if (curr) {
        // get the day as index
        const dayIdx = new Date(curr.date_added).getDate();

        // -1 to place in the appropriate day
        days[dayIdx - 1] = curr.lexile;

        // check if dayIdx is within the user lexile length
        if (dayIdx < userLexile.length) {
          // also place the value in the "tomorrow data" because there is possibility of no entry there
          days[dayIdx] = curr.lexile;
        }
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
        tension: 0.4,
        fill: "origin",
      },
    ],
  };

  const booksChartData = {
    labels: userReads.map((r) => new Date(r.date_read).getDate()),
    datasets: [
      {
        label: `Books Read | ${monthMap[new Date().getMonth()]}`,
        data: userReads.map((r) => r.lexile),
        backgroundColor: "#4BFCE1",
        borderColor: "#4BFCE1",
        borderWidth: 1,
        tension: 0.4,
        fill: "origin",
      },
    ],
  };

  const gamesChartData = {
    labels: [],
    datasets: [
      {
        label: `Quizzes Answered | ${monthMap[new Date().getMonth()]}`,
        data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        backgroundColor: "#FAEAFF",
        borderColor: "#FAEAFF",
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
    }
  }, [url, user, setUserData]);

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
    }
  }, [url, user, setUserLexile, userId]);

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
    }
  }, [url, user, setUserQuizzes, userId]);

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
    }
  }, [url, user, setUserReads, userId]);

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
      <Link href="/controller/users" className="cstm-bg-hover text-prmColor mr-auto">
        <BsArrowLeft />
      </Link>
      <div className="cstm-flex-col w-full p-5 bg-white rounded-2xl t:w-8/12">
        <Line
          data={lexileChartData}
          options={{
            responsive: true,
            aspectRatio: 1,
          }}
          redraw={true}
          updateMode="reset"
        />
      </div>

      <div className="cstm-flex-col w-full p-5 bg-white rounded-2xl t:w-8/12">
        <Line
          data={booksChartData}
          options={{
            responsive: true,
            aspectRatio: 1,
          }}
          redraw={true}
          updateMode="reset"
        />
      </div>

      <div className="cstm-flex-col w-full p-5 bg-white rounded-2xl t:w-8/12">
        <Line
          data={gamesChartData}
          options={{
            responsive: true,
            aspectRatio: 1,
          }}
          redraw={true}
          updateMode="reset"
        />
      </div>
    </div>
  );
};

export default SingleUser;

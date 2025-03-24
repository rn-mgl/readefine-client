"use client";
import React from "react";
import axios from "axios";
import AdminPageHeader from "@/admin/global/PageHeader";
import Link from "next/link";
import Message from "@/components/global/Message";
import SelectFilter from "@/components/filter/SelectFilter";
import UserMainData from "@/admin/users/UserMainData";
import GraphTypeChoice from "@/admin/users/graph/GraphTypeChoice";

// chart.js is needed to view the react charts
import { Chart as ChartJS } from "chart.js/auto";
import { defaults } from "chart.js";
import { Line, Scatter } from "react-chartjs-2";
import { getDaysInMonth, monthMap } from "@/functions/localDate";
import { useSession } from "next-auth/react";

import { BsArrowLeft } from "react-icons/bs";
import { decipher } from "@/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useMessage } from "@/hooks/useMessage";

const SingleUser = ({ params }) => {
  const [userData, setUserData] = React.useState({});
  const [userLexile, setUserLexile] = React.useState([]);
  const [userReads, setUserReads] = React.useState([]);
  const [userQuizzes, setUserQuizzes] = React.useState([]);
  const [quizVariable, setQuizVariable] = React.useState("lexile");
  const [quizMonth, setQuizMonth] = React.useState(new Date().getMonth() + 1);
  const [lexileMonth, setLexileMonth] = React.useState(
    new Date().getMonth() + 1
  );
  const [readMonth, setReadMonth] = React.useState(new Date().getMonth() + 1);

  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession({ required: true });
  const url = process.env.NEXT_PUBLIC_API_URL;
  const decodedUserId = decipher(params?.user_id);
  const user = session?.user?.name;
  const router = useRouter();

  defaults.font.family = "Poppins";
  defaults.font.size = 12;
  defaults.font.style = "italic";

  // toggle if quiz y axis graph is lexile or score
  const handleQuizVariable = ({ value }) => {
    setQuizVariable(value);
  };

  const handleQuizMonth = ({ value }) => {
    setQuizMonth(parseInt(value));
  };

  const handleLexileMonth = ({ value }) => {
    setLexileMonth(parseInt(value));
  };

  const handleReadMonth = ({ value }) => {
    setReadMonth(parseInt(value));
  };

  // map lexile level to the days it changed and remain the same on the days it did not change
  const mapLexileToDays = () => {
    let curr = userLexile[0]?.lexile;

    const days = getDaysInMonth(new Date(), lexileMonth).map(() => curr);

    for (let i = 0; i < days.length; i++) {
      if (i < userLexile.length) {
        curr = userLexile[i];
      }

      if (curr) {
        const dayIdx = new Date(curr.date_added).getDate();
        days[dayIdx - 1] = curr.lexile;
        days[dayIdx] = curr.lexile;
      }
    }

    const latest = userLexile?.at(-1);
    const latestLexile = latest?.lexile;
    const lastUpdatedDate = new Date(latest?.date_added).getDate();

    for (let i = lastUpdatedDate; i < days.length; i++) {
      days[i] = latestLexile;
    }

    return days;
  };

  // place data to lexile line chart
  const lexileChartData = {
    labels: getDaysInMonth(new Date(), lexileMonth),
    datasets: [
      {
        label: `Lexile Growth | ${monthMap[lexileMonth]}`,
        data: mapLexileToDays(),
        backgroundColor: "#542ACA",
        borderColor: "#542ACA",
        borderWidth: 1,
        tension: 0,
      },
    ],
  };

  // map read books to the dates it has been read
  const mapBooksReadToDays = () => {
    const days = getDaysInMonth(new Date(), readMonth);
    let counts = [];

    for (let i = 0; i < days.length; i++) {
      const curr = userReads[i];
      let data = { x: i, y: undefined };

      if (curr) {
        const dayIdx = new Date(curr.date_read).getDate();
        data = { x: dayIdx, y: curr.lexile };
      }
      counts.push(data);
    }

    return counts;
  };

  // place data to book scatter chart
  const booksChartData = {
    datasets: [
      {
        label: `Lexiles of Books Read | ${monthMap[readMonth]}`,
        data: mapBooksReadToDays(),
        borderWidth: 1,
        tension: 0.4,
        backgroundColor: "#4BFCE1",
        borderColor: "#4BFCE1",
      },
    ],
  };

  // map taken tests to the days in has been taken
  const mapQuizScoresToDays = () => {
    const days = getDaysInMonth(new Date(), readMonth);
    let counts = [];

    for (let i = 0; i < days.length; i++) {
      const curr = userQuizzes[i];
      let data = { x: i, y: undefined };

      if (curr) {
        const dayIdx = new Date(curr.date_taken).getDate();
        data = { x: dayIdx, y: curr[quizVariable] };
      }
      counts.push(data);
    }
    return counts;
  };

  // place data to answered tests scatter chart
  const quizChartData = {
    datasets: [
      {
        label: `Quizzes Answered | ${monthMap[quizMonth]}`,
        data: mapQuizScoresToDays(),
        backgroundColor: "#D498FF",
        borderColor: "#D498FF",
        borderWidth: 1,
        tension: 0.4,
        fill: "origin",
      },
    ],
  };

  // get user data
  const getUserData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_user/${decodedUserId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, decodedUserId, setMessageStatus]);

  // get user lexile for graph
  const getUserLexile = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_user_lexile`, {
        params: { userId: decodedUserId, lexileMonth },
        headers: { Authorization: user?.token },
      });

      if (data) {
        setUserLexile(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, decodedUserId, lexileMonth, setMessageStatus]);

  // get books read for graph
  const getUserBooksRead = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_read_story`, {
        params: { userId: decodedUserId, readMonth },
        headers: { Authorization: user?.token },
      });

      if (data) {
        setUserReads(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, decodedUserId, readMonth, setMessageStatus]);

  // get quizzes for graph
  const getUserQuizzesAnswered = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_taken_test`, {
        params: { userId: decodedUserId, quizMonth },
        headers: { Authorization: user?.token },
      });

      if (data) {
        setUserQuizzes(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, decodedUserId, quizMonth, setMessageStatus]);

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

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="w-full min-h-screen bg-accntColor cstm-flex-col justify-start p-4 gap-4">
      <AdminPageHeader subHeader="User" mainHeader="Dashboard" />

      {/* show if has message pop up */}
      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <div className="cstm-flex-col gap-4 w-full">
        <Link
          href="/controller/users"
          className="cstm-bg-hover text-prmColor mr-auto"
        >
          <BsArrowLeft />
        </Link>

        <UserMainData userData={userData} />

        {/* graphs */}
        <div className="cstm-flex-col gap-4 w-full min-h-screen justify-start">
          {/* graph for lexile */}
          <div className="cstm-flex-col p-4 w-full bg-white rounded-2xl gap-4 items-start">
            <SelectFilter
              onChange={handleLexileMonth}
              selectValue={lexileMonth}
              name="lexileMonth"
              label="Month"
              labelValue={[
                { label: "January", value: 1 },
                { label: "February", value: 2 },
                { label: "March", value: 3 },
                { label: "April", value: 4 },
                { label: "May", value: 5 },
                { label: "June", value: 6 },
                { label: "July", value: 7 },
                { label: "August", value: 8 },
                { label: "September", value: 9 },
                { label: "October", value: 10 },
                { label: "November", value: 11 },
                { label: "December", value: 12 },
              ]}
            />

            <div className="cstm-flex-col w-full h-auto min-h-[30rem] p-4 bg-white rounded-2xl">
              <Line
                data={lexileChartData}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>

          <div className="cstm-flex-col p-4 w-full bg-white rounded-2xl gap-4 items-start">
            <SelectFilter
              onChange={handleReadMonth}
              selectValue={readMonth}
              name="readMonth"
              label="Month"
              labelValue={[
                { label: "January", value: 1 },
                { label: "February", value: 2 },
                { label: "March", value: 3 },
                { label: "April", value: 4 },
                { label: "May", value: 5 },
                { label: "June", value: 6 },
                { label: "July", value: 7 },
                { label: "August", value: 8 },
                { label: "September", value: 9 },
                { label: "October", value: 10 },
                { label: "November", value: 11 },
                { label: "December", value: 12 },
              ]}
            />

            {/* graph for books read */}
            <div className="cstm-flex-col w-full h-auto min-h-[30rem] p-4 bg-white rounded-2xl">
              <Scatter
                data={booksChartData}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>

          {/* graph for quizzes taken */}
          <div className="cstm-flex-col p-4 w-full bg-white rounded-2xl gap-4 items-start">
            <div className="cstm-flex-col items-start t:cstm-flex-row w-full t:justify-between gap-2">
              <SelectFilter
                onChange={handleQuizMonth}
                selectValue={quizMonth}
                name="quizMonth"
                label="Month"
                labelValue={[
                  { label: "January", value: 1 },
                  { label: "February", value: 2 },
                  { label: "March", value: 3 },
                  { label: "April", value: 4 },
                  { label: "May", value: 5 },
                  { label: "June", value: 6 },
                  { label: "July", value: 7 },
                  { label: "August", value: 8 },
                  { label: "September", value: 9 },
                  { label: "October", value: 10 },
                  { label: "November", value: 11 },
                  { label: "December", value: 12 },
                ]}
              />

              {/* button to change if y axis is lexile or score */}
              <SelectFilter
                onChange={handleQuizVariable}
                selectValue={quizVariable}
                name="quizVariable"
                label="Type"
                labelValue={[
                  { label: "Score", value: "score" },
                  { label: "Lexile", value: "lexile" },
                ]}
              />
            </div>

            <div className="cstm-flex-col justify-start w-full h-auto min-h-[30rem]">
              <Scatter
                data={quizChartData}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;

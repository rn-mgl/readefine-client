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
import { getDaysInMonth, monthMap } from "@/src/src/functions/localDate";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { decipher } from "@/src/src/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

const SingleUser = ({ params }) => {
  const [userData, setUserData] = React.useState({});
  const [userLexile, setUserLexile] = React.useState([]);
  const [userReads, setUserReads] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });
  const [userQuizzes, setUserQuizzes] = React.useState([]);
  const [quizVariable, setQuizVariable] = React.useState("lexile");

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
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

  // map lexile level to the days it changed and remain the same on the days it did not change
  const mapLexileToDays = () => {
    let curr = userLexile[0]?.lexile;

    // set the initial values to be the oldest lexile (curr) record
    const days = getDaysInMonth(new Date()).map(() => curr);

    for (let i = 0; i < days.length; i++) {
      // check if i is within the user lexile length to get appropriate matching lexile
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

  // map read books to the dates it has been read
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

  // place data to book scatter chart
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

  // map taken tests to the days in has been taken
  const mapQuizScoresToDays = () => {
    let counts = getDaysInMonth(new Date()).map((_, i) => {
      return {
        x: i + 1,
        y: undefined,
      };
    });

    for (let i = 0; i < counts.length; i++) {
      const curr = userQuizzes[i];
      if (curr) {
        const dayIdx = new Date(curr.date_taken).getDate();
        const data = { x: dayIdx, y: curr[quizVariable] };
        counts[dayIdx - 1] = data;
      }
    }

    return counts;
  };

  // place data to answered tests scatter chart
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

  // get user data
  const getUserData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_user/${decodedUserId}`, {
        headers: { Authorization: user.token },
      });

      if (data) {
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setUserData, decodedUserId]);

  // get user lexile for graph
  const getUserLexile = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_user_lexile`, {
        params: { userId: decodedUserId },
        headers: { Authorization: user.token },
      });

      if (data) {
        setUserLexile(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setUserLexile, decodedUserId]);

  // get books read for graph
  const getUserBooksRead = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_read_story`, {
        params: { userId: decodedUserId },
        headers: { Authorization: user.token },
      });

      if (data) {
        setUserReads(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setUserReads, decodedUserId]);

  // get quizzes for graph
  const getUserQuizzesAnswered = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_taken_test`, {
        params: { userId: decodedUserId },
        headers: { Authorization: user.token },
      });

      if (data) {
        setUserQuizzes(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setUserQuizzes, decodedUserId]);

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
    const isExpired = isTokenExpired(user?.token.split(" ")[2]);

    if (isExpired) {
      router.push("/filter");
    }
  }, [user?.token, router]);

  return (
    <div className="w-full min-h-screen bg-accntColor cstm-flex-col justify-start p-5 gap-2">
      <AdminPageHeader subHeader="User" mainHeader="Dashboard" />

      {/* show if has message pop up */}
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <div className="cstm-flex-col gap-5 w-full cstm-w-limit ">
        <Link href="/controller/users" className="cstm-bg-hover text-prmColor mr-auto">
          <BsArrowLeft />
        </Link>

        <div className="cstm-flex-col gap-5 w-full t:cstm-flex-row">
          {/* user data */}
          <div className="cstm-flex-col bg-white rounded-2xl p-5 w-full">
            <div className="cstm-flex-row gap-2 w-full justify-start">
              {/* user image */}
              <div
                style={{ backgroundImage: userData.image ? `url("${userData.image}")` : null }}
                className="w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-full bg-prmColor bg-opacity-10 bg-cover bg-center"
              />

              <div className="cstm-flex-col items-start overflow-x-auto scrollbar-none">
                {/* user name and surname */}
                <p className="capitalize font-bold text-black text-base whitespace-nowrap ">
                  {userData.name} {userData.surname}
                </p>
                {/* user email */}
                <p className="font-light text-xs">{userData.email}</p>
              </div>

              {/* send email button */}
              <Link className="cstm-bg-hover ml-auto" href={`mailto:${userData.email}`}>
                <AiOutlineMail className=" scale-125 text-prmColor" />
              </Link>
            </div>
          </div>

          {/* user lexile level*/}
          <div className="cstm-flex-col bg-white rounded-2xl p-5 w-full t:w-4/12">
            <p className="font-bold text-prmColor text-xl">{userData?.lexile}</p>

            <p className="text-sm">Lexile Level</p>
          </div>
        </div>

        <div className="cstm-flex-col gap-5 w-full min-h-screen ">
          {/* graph for lexile */}
          <div className="cstm-flex-col w-full h-auto min-h-[30rem] p-5 bg-white rounded-2xl">
            <Line
              data={lexileChartData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>

          {/* graph for books read */}
          <div className="cstm-flex-col w-full h-auto min-h-[30rem] p-5 bg-white rounded-2xl">
            <Scatter
              data={booksChartData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>

          {/* graph for quizzes taken */}
          <div className="cstm-flex-col p-5 w-full bg-white rounded-2xl gap-5">
            {/* button to change if y axis is lexile or score */}
            <div className="cstm-flex-row text-sm gap-5 w-full">
              <label htmlFor="lexile" className="mr-auto t:mr-0 cursor-pointer">
                <input
                  type="radio"
                  value="lexile"
                  checked={quizVariable === "lexile"}
                  name="lexile"
                  id="lexile"
                  className="hidden peer"
                  onChange={(e) => handleQuizVariable(e.target)}
                />

                <div
                  className="p-2 peer-checked:bg-prmColor peer-checked:text-white w-16 cstm-flex-col
                        bg-accntColor rounded-md font-bold"
                >
                  Lexile
                </div>
              </label>

              <label htmlFor="score" className="t:mr-auto cursor-pointer">
                <input
                  type="radio"
                  value="score"
                  checked={quizVariable === "score"}
                  name="score"
                  id="score"
                  className="hidden peer"
                  onChange={(e) => handleQuizVariable(e.target)}
                />

                <div
                  className="p-2 peer-checked:bg-prmColor peer-checked:text-white w-16 cstm-flex-col
                        bg-accntColor rounded-md font-bold"
                >
                  Score
                </div>
              </label>
            </div>

            <div className="cstm-flex-col justify-start w-full h-auto min-h-[30rem]">
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
    </div>
  );
};

export default SingleUser;

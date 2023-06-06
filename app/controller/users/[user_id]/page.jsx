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
  const [userGames, setUserGames] = React.useState([]);

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const userId = params?.user_id;
  const user = session?.user?.name;
  defaults.font.family = "Poppins";
  defaults.font.size = 12;
  defaults.font.style = "italic";

  const lexileChartData = {
    labels: userLexile.map((l) => new Date(l.date_added).getDate()),
    datasets: [
      {
        label: `Lexile Growth | ${monthMap[new Date().getMonth()]}`,
        data: userLexile.map((l) => l.lexile),
        backgroundColor: "#542ACA",
        borderColor: "#542ACA",
        borderWidth: 1,
        tension: 0.4,
        fill: "origin",
      },
    ],
  };

  const booksChartData = {
    labels: userReads.map((l) => new Date(l.date_added).getDate()),
    datasets: [
      {
        label: `Books Read | ${monthMap[new Date().getMonth()]}`,
        data: userReads.map((l) => l.lexile),
        backgroundColor: "#4BFCE1",
        borderColor: "#4BFCE1",
        borderWidth: 1,
        tension: 0.4,
        fill: "origin",
      },
    ],
  };

  const gamesChartData = {
    labels: userGames.map((l) => new Date(l.date_added).getDate()),
    datasets: [
      {
        label: `Games Played | ${monthMap[new Date().getMonth()]}`,
        data: userGames.map((l) => l.lexile),
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

  console.log(userLexile);

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

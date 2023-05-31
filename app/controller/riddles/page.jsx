"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import RiddlesFilter from "@/src/src/admin/riddles/RiddlesFilter";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useGlobalContext } from "@/src/context";
import { inputDate, localizeDate } from "@/src/src/functions/localDate";

const AdminRiddles = () => {
  const [riddles, setRiddles] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState({ toSearch: "riddle", searchKey: "" });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "riddle", sortMode: "ASC" });
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "",
    to: inputDate(new Date().toLocaleDateString()),
  });
  const { data: session } = useSession();

  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const handleSearchFilter = ({ name, value }) => {
    setSearchFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleDateRangeFilter = ({ name, value }) => {
    setDateRangeFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSortFilter = ({ name, value }) => {
    setSortFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const riddleRow = riddles.map((riddle) => {
    return (
      <tr
        key={riddle.riddle_id}
        className="p-2 cstm-flex-col justify-start gap-5 text-center w-full rounded-md bg-accntColor
                  t:bg-white t:cstm-flex-row"
      >
        <td className="t:hidden">
          <p className="text-prmColor font-bold text-sm t:hidden">Riddle</p>
        </td>

        <td className="whitespace-pre-wrap text-justify t:w-[40%]">{riddle.riddle}</td>

        <td className="t:hidden">
          <div className="cstm-separator t:hidden" />
        </td>

        <td className="t:hidden">
          <p className="text-prmColor font-bold text-sm t:hidden">Answer</p>
        </td>

        <td className="t:w-[20%]">{riddle.answer}</td>

        <td className="t:hidden">
          <div className="cstm-separator t:hidden" />
        </td>

        <td className="t:hidden">
          <p className="text-prmColor font-bold text-sm t:hidden">Date Added</p>
        </td>

        <td className="t:w-[20%]">{localizeDate(riddle.date_added)}</td>
        <td className="t:w-[20%] cstm-flex-col">
          <Link
            href={`/controller/riddles/${riddle.riddle_id}`}
            className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2"
          >
            Visit
          </Link>
        </td>
      </tr>
    );
  });

  const getRiddles = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_riddles`, {
        headers: { Authorization: user.token },
        params: {
          searchFilter,
          sortFilter,
          dateRangeFilter,
        },
      });

      if (data) {
        setRiddles(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setRiddles, url, user, searchFilter, sortFilter, dateRangeFilter]);

  React.useEffect(() => {
    if (user) {
      getRiddles();
    }
  }, [user, url, getRiddles]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-2 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Riddles" />
      <RiddlesFilter
        handleSearchFilter={handleSearchFilter}
        handleDateRangeFilter={handleDateRangeFilter}
        handleSortFilter={handleSortFilter}
        searchFilter={searchFilter}
        sortFilter={sortFilter}
        dateRangeFilter={dateRangeFilter}
      />

      <table
        className="table-fixed p-4 rounded-md cstm-flex-col overflow-auto w-full h-[80vh] justify-start items-start bg-white text-sm 
                t:gap-5 
                l-s:w-[70%] l-s:ml-auto border-collapse
                l-l:w-[80%]"
      >
        <thead className="w-full ">
          <tr className="p-2 cstm-flex-row justify-start gap-10 text-center text-prmColor w-full hidden t:flex">
            <th className="w-[40%]">Riddle Statement</th>
            <th className="w-[20%]">Answer</th>
            <th className="w-[20%]">Date Added</th>
            <th className="w-[20%]">Link</th>
          </tr>
        </thead>

        <tbody className="w-full cstm-flex-col gap-5">{riddleRow}</tbody>
      </table>
    </div>
  );
};

export default AdminRiddles;

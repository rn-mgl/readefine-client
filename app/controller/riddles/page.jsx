"use client";
import React from "react";
import AdminPageHeader from "@/src/components/src/admin/global/PageHeader";
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

  console.log(dateRangeFilter);

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
        className="p-2 cstm-flex-row justify-start gap-10 text-center w-full "
      >
        <td className="whitespace-pre-wrap text-justify max-h-32 truncate">{riddle.riddle}</td>
        <td>{riddle.answer}</td>
        <td>{localizeDate(riddle.date_added)}</td>
        <td className=" cstm-flex-col">
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
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
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
        className="table-fixed p-4 rounded-md cstm-flex-col overflow-auto w-full h-[70vh] justify-start items-start bg-white text-sm gap-5 
                l-s:w-[70%] l-s:ml-auto border-collapse
                l-l:w-[80%]"
      >
        <thead className="w-full ">
          <tr className="p-2 cstm-flex-row justify-start gap-10 text-center text-prmColor w-full">
            <th>Riddle Statement</th>
            <th>Answer</th>
            <th>Date Added</th>
            <th>Link</th>
          </tr>
        </thead>

        <tbody className="w-full">{riddleRow}</tbody>
      </table>
    </div>
  );
};

export default AdminRiddles;

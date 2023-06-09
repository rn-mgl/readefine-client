"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import UsersFilter from "@/src/src/admin/users/UsersFilter";
import axios from "axios";
import Link from "next/link";
import Message from "@/src/src/components/global/Message";

import { useGlobalContext } from "@/src/context";
import { localizeDate, inputDate } from "@/src/src/functions/localDate";
import { useSession } from "next-auth/react";

const AdminUsers = () => {
  const [users, setUsers] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState({ toSearch: "name", searchKey: "" });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "name", sortMode: "ASC" });
  const [lexileRangeFilter, setLexileRangeFilter] = React.useState({ from: 0, to: 1250 });
  const [message, setMessage] = React.useState({ msg: "", active: false });
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "",
    to: inputDate(new Date().toLocaleDateString()),
  });
  const { data: session } = useSession({ required: true });

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

  const handleSortFilter = ({ name, value }) => {
    setSortFilter((prev) => {
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

  const handleLexileRangeFilter = ({ name, value }) => {
    setLexileRangeFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const userRow = users.map((user) => {
    const email = user.email.split("@");
    return (
      <tr key={user.user_id} className="p-2 cstm-flex-row justify-start gap-10 text-center ">
        <td className="cstm-flex-col">
          <div className="w-10 h-10 rounded-full bg-prmColor bg-opacity-30" />
        </td>
        <td>
          {email[0]} <br /> <span className="font-light text-xs">@{email[1]}</span>
        </td>
        <td className="break-words whitespace-pre-wrap">{user.surname}</td>
        <td className="break-words whitespace-pre-wrap">{user.name}</td>
        <td className="break-words whitespace-pre-wrap">{user.username}</td>
        <td className="break-words whitespace-pre-wrap">{user.lexile}L</td>
        <td className="break-words whitespace-pre-wrap">{user.grade_level}</td>
        <td className="break-words whitespace-pre-wrap">{localizeDate(user.date_joined)}</td>
        <td className="cstm-flex-col">
          <Link
            href={`/controller/users/${user.user_id}`}
            className="bg-prmColor rounded-full p-2 text-white w-full"
          >
            Visit
          </Link>
        </td>
      </tr>
    );
  });

  const getUsers = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_user`, {
        headers: { Authorization: user.token },
        params: { searchFilter, sortFilter, dateRangeFilter, lexileRangeFilter },
      });

      if (data) {
        setUsers(data);
        setMessage({ active: true, msg: error?.response?.data?.msg });
      }
    } catch (error) {
      console.log(error);
    }
  }, [setUsers, url, user, searchFilter, sortFilter, dateRangeFilter, lexileRangeFilter]);

  React.useEffect(() => {
    if (user) {
      getUsers();
    }
  }, [getUsers, user]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Users" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      <UsersFilter
        handleSearchFilter={handleSearchFilter}
        handleSortFilter={handleSortFilter}
        handleDateRangeFilter={handleDateRangeFilter}
        handleLexileRangeFilter={handleLexileRangeFilter}
        dateRangeFilter={dateRangeFilter}
        lexileRangeFilter={lexileRangeFilter}
        sortFilter={sortFilter}
        searchFilter={searchFilter}
      />

      <table
        className="table-fixed p-4 rounded-md cstm-flex-col overflow-auto w-full h-screen justify-start items-start bg-white text-sm gap-5 
        cstm-w-limit border-collapse"
      >
        <thead className="w-full ">
          <tr className="p-2 cstm-flex-row justify-start gap-10 text-center text-prmColor">
            <th>Image</th>
            <th>Email</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Username</th>
            <th>Lexile</th>
            <th>Grade</th>
            <th>Date Joined</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody className="w-full">{userRow}</tbody>
      </table>
    </div>
  );
};

export default AdminUsers;

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
import { cipher } from "@/src/src/functions/security";
import UserRow from "@/src/src/admin/users/UserRow";

const AdminUsers = () => {
  const [users, setUsers] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false });

  // search filters
  const [searchFilter, setSearchFilter] = React.useState({ toSearch: "name", searchKey: "" });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "name", sortMode: "ASC" });
  const [lexileRangeFilter, setLexileRangeFilter] = React.useState({ from: 0, to: 1250 });
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "",
    to: inputDate(new Date().toLocaleDateString()),
  });

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  // handle onchange on search filter
  const handleSearchFilter = ({ name, value }) => {
    setSearchFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle onchange on sort filter
  const handleSortFilter = ({ name, value }) => {
    setSortFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle onchange on date range filter
  const handleDateRangeFilter = ({ name, value }) => {
    setDateRangeFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle onchange on lexile range filter
  const handleLexileRangeFilter = ({ name, value }) => {
    setLexileRangeFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // map user row
  const userRow = users.map((user) => {
    const email = user.email.split("@");
    const cipheredUserId = cipher(user.user_id);
    return (
      <React.Fragment key={user.user_id}>
        <UserRow user={user} email={email} cipheredUserId={cipheredUserId} />
      </React.Fragment>
    );
  });

  // get users
  const getUsers = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_user`, {
        headers: { Authorization: user.token },
        params: { searchFilter, sortFilter, dateRangeFilter, lexileRangeFilter },
      });

      if (data) {
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
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

      {/* filters */}
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

      {/* users container */}
      <table
        className="table-fixed p-4 h-[75vh] cstm-scrollbar rounded-md cstm-flex-col overflow-auto w-full justify-start items-start bg-white text-sm gap-5 
        cstm-w-limit border-collapse"
      >
        <thead className="w-full text-sm">
          <tr className="p-2 cstm-flex-row justify-start text-center text-prmColor gap-5">
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

        <tbody className="w-full text-sm">{userRow}</tbody>
      </table>
    </div>
  );
};

export default AdminUsers;

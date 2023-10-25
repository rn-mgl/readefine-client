"use client";
import React from "react";
import AdminPageHeader from "@/admin/global/PageHeader";
import UsersFilter from "@/admin/users/UsersFilter";
import axios from "axios";
import Message from "@/components/global/Message";
import UserRow from "@/admin/users/UserRow";

import noUsers from "@/public/profile/NoTest.svg";

import { useGlobalContext } from "@/base/context";
import { inputDate } from "@/functions/localDate";
import { useSession } from "next-auth/react";
import { cipher } from "@/functions/security";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useMessage } from "@/hooks/useMessage";

const AdminUsers = () => {
  const [users, setUsers] = React.useState([]);

  // search filters
  const [searchFilter, setSearchFilter] = React.useState({
    toSearch: "name",
    searchKey: "",
  });
  const [sortFilter, setSortFilter] = React.useState({
    toSort: "name",
    sortMode: "ASC",
  });
  const [lexileRangeFilter, setLexileRangeFilter] = React.useState({
    from: 0,
    to: 1250,
  });
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "",
    to: inputDate(new Date().toLocaleDateString()),
  });

  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

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
        headers: { Authorization: user?.token },
        params: {
          searchFilter,
          sortFilter,
          dateRangeFilter,
          lexileRangeFilter,
        },
      });

      if (data) {
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, searchFilter, sortFilter, dateRangeFilter, lexileRangeFilter, setMessageStatus]);

  React.useEffect(() => {
    if (user) {
      getUsers();
    }
  }, [getUsers, user]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen h-screen cstm-flex-col gap-4 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Users" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

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
      <div className="cstm-w-limit w-full cstm-flex-col gap-4 relative h-full">
        {users.length ? (
          <table
            className="table-fixed p-4 h-full min-h-full cstm-scrollbar-2 rounded-md cstm-flex-col  
                  overflow-auto w-full justify-start items-start bg-white text-sm gap-4 border-collapse"
          >
            <thead className="w-full text-sm">
              <tr className="p-2 cstm-flex-row justify-start text-center text-prmColor gap-24">
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

            <tbody className="w-full text-sm relative">{userRow}</tbody>
          </table>
        ) : (
          <div className="cstm-flex-col absolute left-2/4 -translate-x-2/4 w-full">
            <Image src={noUsers} alt="empty" priority width={220} draggable={false} />
            <p className="text-xs opacity-80">No Users Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;

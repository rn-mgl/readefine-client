"use client";
import React from "react";
import AdminPageHeader from "@/src/components/src/admin/global/PageHeader";
import UsersFilter from "@/src/components/src/admin/users/UsersFilter";
import axios from "axios";
import { useGlobalContext } from "@/src/components/context";

const AdminUsers = () => {
  const [users, setUsers] = React.useState([]);

  const { url } = useGlobalContext();

  const fetchUsers = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_user`);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Users" />
      <UsersFilter />

      <table
        className="table-fixed p-4 rounded-md cstm-flex-col overflow-auto w-full h-screen justify-start items-start bg-white text-sm gap-5 
                l-s:w-[70%] l-s:ml-auto border-collapse
                l-l:w-[80%]"
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
          </tr>
        </thead>

        <tbody className="w-full h-[1px] bg-black opacity-20">
          <tr className="w-full">
            <td className="w-full" />
          </tr>
        </tbody>

        <tbody className="w-full">
          <tr className="p-2 cstm-flex-row justify-start gap-10 text-center">
            <td className="cstm-flex-col">
              <div className="w-10 h-10 rounded-full bg-prmColor bg-opacity-30" />
            </td>
            <td>
              emaiemail <br /> <span className="font-light text-xs">@gmail.com</span>
            </td>
            <td>Surname</td>
            <td>First Name</td>
            <td>Username</td>
            <td>300L</td>
            <td>3</td>
            <td>Feb 2, 2003</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;

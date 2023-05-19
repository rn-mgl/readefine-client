import React from "react";
import AdminPageHeader from "@/src/components/src/admin/global/PageHeader";
import RiddlesFilter from "@/src/components/src/admin/riddles/RiddlesFilter";
import Link from "next/link";

const AdminRiddles = () => {
  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Riddles" />
      <RiddlesFilter />

      <table
        className="table-fixed p-4 rounded-md cstm-flex-col overflow-auto w-full h-screen justify-start items-start bg-white text-sm gap-5 
                l-s:w-[70%] l-s:ml-auto border-collapse
                l-l:w-[80%]"
      >
        <thead className="w-full ">
          <tr className="p-2 cstm-flex-row justify-start gap-10 text-center text-prmColor">
            <th className="w-6/12">Riddle</th>
            <th className="w-2/12">Answer</th>
            <th className="w-2/12">Date Added</th>
            <th className="w-2/12">Link</th>
          </tr>
        </thead>

        <tbody className="w-full h-[1px] bg-black opacity-20">
          <tr className="w-full">
            <td className="w-full" />
          </tr>
        </tbody>

        <tbody className="w-full">
          <tr className="p-2 cstm-flex-row justify-start gap-10 text-center">
            <td className="w-6/12 whitespace-pre-wrap truncate max-h-16 text-justify">
              Hamburger short ribs est venison consectetur, ut rump. Hamburger short ribs est
              venison consectetur, ut rump.Hamburger short ribs est venison consectetur, ut rump.
              Hamburger short ribs est venison consectetur, ut rump.
            </td>
            <td className="w-2/12">Answer</td>
            <td className="w-2/12">Feb 2, 2003</td>
            <th className="w-2/12 cstm-flex-col">
              <Link
                href="/controller/riddles/123"
                className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2
                t:text-base"
              >
                Visit
              </Link>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminRiddles;

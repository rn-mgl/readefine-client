"use client";
import React from "react";
import AdminPageHeader from "@/src/components/src/admin/global/PageHeader";
import AddAchievementFilter from "@/src/components/src/admin/achievements/AddAchievementFilter";
import { useRouter } from "next/navigation";
import { adminIsLogged } from "@/src/components/src/security/verifications";

const AddAchievement = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (!adminIsLogged()) {
      router.push("/filter");
    }
  }, [adminIsLogged, router]);
  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Achievements" mainHeader="Add Achievement" />
      <AddAchievementFilter />
      <form
        action=""
        className="w-full cstm-flex-col l-s:w-[70%] l-s:ml-auto border-collapse
                l-l:w-[80%]"
      >
        <div className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-screen justify-start items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar">
          <div className="cstm-flex-row w-full">
            <textarea
              name=""
              id=""
              cols="30"
              rows="1"
              className="resize-none p-2 focus:outline-none font-bold text-prmColor mr-auto"
              defaultValue="Achievement Title/Name"
            ></textarea>
          </div>

          <div className="cstm-separator" />
          <div className="w-full h-full cstm-flex-col">
            <textarea
              name=""
              id=""
              cols="30"
              rows="1"
              className="resize-none p-2 focus:outline-none w-full h-full mr-auto"
              defaultValue="task..."
            ></textarea>
          </div>
        </div>
        <div className="pt-4 cstm-flex-row w-full">
          <button
            className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 px-4
                t:text-base"
          >
            Publish Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAchievement;

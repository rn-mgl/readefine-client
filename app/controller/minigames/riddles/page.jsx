"use client";
import DeleteData from "@/admin/global/DeleteData";
import AdminPageHeader from "@/admin/global/PageHeader";
import EditRow from "@/admin/riddles/EditRow";
import RiddleRow from "@/admin/riddles/RiddleRow";
import RiddlesFilter from "@/admin/riddles/RiddlesFilter";
import Message from "@/components/global/Message";
import axios from "axios";
import Link from "next/link";
import React from "react";

import { useGlobalContext } from "@/base/context";
import { isTokenExpired } from "@/functions/jwtFns";
import { useMessage } from "@/hooks/useMessage";
import useAdminActivities from "@/src/hooks/useAdminActivities";
import useRiddleFilters from "@/src/hooks/useRiddleFilters";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";

const AdminRiddles = () => {
  const [riddles, setRiddles] = React.useState([]);
  const [canDeleteRiddle, setCanDeleteRiddle] = React.useState(false);
  const [riddleToEdit, setRiddleToEdit] = React.useState(-1);

  const [riddleToDelete, setRiddleToDelete] = React.useState({ id: -1, answer: "" });

  const { message, setMessageStatus } = useMessage();
  const { searchFilter, sortFilter, dateRangeFilter, handleSearchFilter, handleDateRangeFilter, handleSortFilter } =
    useRiddleFilters();
  const { createAdminActivity } = useAdminActivities();

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

  // handle selection of riddle to edit
  const handleRiddleToEdit = (id) => {
    setRiddleToEdit((prev) => (prev === id ? -1 : id));
  };

  // handle selection of riddle to delete
  const handleRiddleToDelete = (id, answer) => {
    setRiddleToDelete((prev) => {
      return {
        ...prev,
        id: id,
        answer: answer,
      };
    });
  };

  // toggle can delete riddle
  const handleCanDeleteRiddle = () => {
    setCanDeleteRiddle((prev) => !prev);
  };

  // handle onchange on riddle
  const handleRiddle = (id, { name, value }) => {
    setRiddles((prev) =>
      prev.map((r) => {
        if (r.riddle_id === id) {
          return {
            ...r,
            [name]: value,
          };
        }

        return r;
      })
    );
  };

  // edit riddle
  const editRiddle = async (id) => {
    let riddle = null;
    let answer = null;

    // find the riddle that needs to be edited
    riddles.map((r) => {
      if (r.riddle_id === id) {
        riddle = r.riddle;
        answer = r.answer;
        return;
      }
    });

    try {
      const { data } = await axios.patch(
        `${url}/admin_riddles/${id}`,
        { riddle, answer },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        // get index of edited riddle
        const riddleIdx = riddles.findIndex((riddle) => riddle.riddle_id === riddleToEdit);
        // get riddle using index
        const riddle = riddles[riddleIdx];

        const activityData = await createAdminActivity("riddle", riddle.answer, "U");

        if (activityData) {
          setRiddleToEdit(-1);
        }
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  // get riddles
  const getRiddles = React.useCallback(async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/admin_riddles`, {
          headers: { Authorization: user?.token },
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

        setMessageStatus(true, error?.response?.data?.msg, "error");
      }
    }
  }, [url, user?.token, searchFilter, sortFilter, dateRangeFilter, setMessageStatus]);

  // map riddle rows
  const riddleRow = riddles.map((riddle) => {
    const isToEdit = riddle.riddle_id === riddleToEdit;
    return (
      <React.Fragment key={riddle.riddle_id}>
        {isToEdit ? (
          <EditRow
            riddle={riddle}
            handleRiddle={handleRiddle}
            handleCanDeleteRiddle={handleCanDeleteRiddle}
            handleRiddleToEdit={handleRiddleToEdit}
            handleRiddleToDelete={handleRiddleToDelete}
            editRiddle={editRiddle}
          />
        ) : (
          <RiddleRow
            isToEdit={isToEdit}
            riddle={riddle}
            handleRiddleToEdit={handleRiddleToEdit}
            createAdminActivity={createAdminActivity}
          />
        )}
      </React.Fragment>
    );
  });

  React.useEffect(() => {
    getRiddles();
  }, [getRiddles]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="p-4 bg-accntColor w-full min-h-screen h-screen cstm-flex-col gap-2 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Riddles" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <div className="cstm-flex-col gap-2 w-full ">
        <Link href="/controller/minigames" className="cstm-bg-hover mr-auto">
          <BsArrowLeft className="text-prmColor text-xl" />
        </Link>

        <RiddlesFilter
          handleSearchFilter={handleSearchFilter}
          handleDateRangeFilter={handleDateRangeFilter}
          handleSortFilter={handleSortFilter}
          searchFilter={searchFilter}
          sortFilter={sortFilter}
          dateRangeFilter={dateRangeFilter}
        />

        {canDeleteRiddle ? (
          <DeleteData
            apiRoute={`${url}/admin_riddles/${riddleToDelete.id}`}
            confirmation={riddleToDelete.answer}
            handleCanDeleteData={handleCanDeleteRiddle}
            getData={getRiddles}
            resourceType="riddle"
          />
        ) : null}

        <div className="cstm-flex-row w-full gap-4">
          <Link
            href="/controller/minigames/riddles/add"
            className="p-2 w-fit cstm-flex-row gap-1 mr-auto
                  text-prmColor rounded-md text-sm hover:underline hover:underline-offset-2"
          >
            <IoAddOutline className=" text-xl" />
            <p>Add Riddles</p>
          </Link>

          <Link
            href="/controller/minigames/riddles/play"
            className="bg-prmColor rounded-full p-2 text-sm w-fit px-10 text-accntColor"
          >
            Play
          </Link>
        </div>
      </div>

      <table
        className="table-fixed p-4 rounded-md cstm-flex-col cstm-scrollbar-2 overflow-auto 
                w-full h-full justify-start items-start bg-white text-sm 
                t:gap-4  border-collapse"
      >
        <thead className="w-full ">
          <tr className="p-2 cstm-flex-row justify-start gap-4 text-center text-prmColor w-full hidden t:flex">
            <th className="w-[50%]">Riddle Statement</th>

            <th className="w-[20%]">Answer</th>

            <th className="w-[20%]">Date Added</th>

            <th className="w-[10%]">Actions</th>
          </tr>
        </thead>

        <tbody className="w-full cstm-flex-col gap-4">{riddleRow}</tbody>
      </table>
    </div>
  );
};

export default AdminRiddles;

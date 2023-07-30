"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import RiddlesFilter from "@/src/src/admin/riddles/RiddlesFilter";
import axios from "axios";
import DeleteRiddle from "@/src/src/admin/riddles/DeleteRiddle";
import Link from "next/link";
import Message from "@/src/src/components/global/Message";

import { IoAddOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { inputDate } from "@/src/src/functions/localDate";
import { BsArrowLeft } from "react-icons/bs";
import RiddleRow from "@/src/src/admin/riddles/RiddleRow";
import EditRow from "@/src/src/admin/riddles/EditRow";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

const AdminRiddles = () => {
  const [riddles, setRiddles] = React.useState([]);
  const [canDeleteRiddle, setCanDeleteRiddle] = React.useState(false);
  const [riddleToEdit, setRiddleToEdit] = React.useState(-1);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

  const [riddleToDelete, setRiddleToDelete] = React.useState({ id: -1, answer: "" });
  const [searchFilter, setSearchFilter] = React.useState({ toSearch: "riddle", searchKey: "" });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "riddle", sortMode: "ASC" });
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "",
    to: inputDate(new Date().toLocaleDateString()),
  });

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

  // handle onchange on search filter
  const handleSearchFilter = ({ name, value }) => {
    setSearchFilter((prev) => {
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

  // handle onchange on sort filter
  const handleSortFilter = ({ name, value }) => {
    setSortFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
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
        { headers: { Authorization: user.token } }
      );

      if (data) {
        setRiddleToEdit(-1);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  };

  // get riddles
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
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [setRiddles, url, user, searchFilter, sortFilter, dateRangeFilter]);

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
          <RiddleRow isToEdit={isToEdit} riddle={riddle} handleRiddleToEdit={handleRiddleToEdit} />
        )}
      </React.Fragment>
    );
  });

  React.useEffect(() => {
    if (user) {
      getRiddles();
    }
  }, [user, url, getRiddles]);

  React.useEffect(() => {
    const isExpired = isTokenExpired(user?.token.split(" ")[2]);

    if (isExpired) {
      router.push("/filter");
    }
  }, [user?.token, router]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-2 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Riddles" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <div className="cstm-flex-col gap-2 w-full cstm-w-limit">
        <RiddlesFilter
          handleSearchFilter={handleSearchFilter}
          handleDateRangeFilter={handleDateRangeFilter}
          handleSortFilter={handleSortFilter}
          searchFilter={searchFilter}
          sortFilter={sortFilter}
          dateRangeFilter={dateRangeFilter}
        />

        <div className="cstm-flex-row w-full gap-2">
          <Link href="/controller/minigames" className="cstm-bg-hover">
            <BsArrowLeft className="text-prmColor scale-100 m-l:scale-125" />
          </Link>

          <Link href="/controller/minigames/riddles/add" className="cstm-bg-hover mr-auto p-2">
            <IoAddOutline className="text-prmColor cursor-pointer scale-150" />
          </Link>

          <Link
            href="/controller/minigames/riddles/play"
            className="bg-prmColor rounded-full p-2 text-sm w-fit px-10 text-white"
          >
            Play
          </Link>
        </div>
      </div>

      {canDeleteRiddle ? (
        <DeleteRiddle
          riddleId={riddleToDelete.id}
          confirmation={riddleToDelete.answer}
          handleCanDeleteRiddle={handleCanDeleteRiddle}
          getRiddles={getRiddles}
        />
      ) : null}

      <table
        className="table-fixed p-4 rounded-md cstm-flex-col overflow-auto w-full h-[70vh] justify-start items-start bg-white text-sm 
                t:gap-5 cstm-w-limit border-collapse"
      >
        <thead className="w-full ">
          <tr className="p-2 cstm-flex-row justify-start gap-5 text-center text-prmColor w-full hidden t:flex">
            <th className="w-[50%]">Riddle Statement</th>

            <th className="w-[20%]">Answer</th>

            <th className="w-[20%]">Date Added</th>

            <th className="w-[10%]">Actions</th>
          </tr>
        </thead>

        <tbody className="w-full cstm-flex-col gap-5">{riddleRow}</tbody>
      </table>
    </div>
  );
};

export default AdminRiddles;

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
import { inputDate, localizeDate } from "@/src/src/functions/localDate";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { BiCheck } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";

const AdminRiddles = () => {
  const [riddles, setRiddles] = React.useState([]);
  const [canDeleteRiddle, setCanDeleteRiddle] = React.useState(false);
  const [riddleToEdit, setRiddleToEdit] = React.useState(-1);
  const [riddleToDelete, setRiddleToDelete] = React.useState({ id: -1, answer: "" });
  const [searchFilter, setSearchFilter] = React.useState({ toSearch: "riddle", searchKey: "" });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "riddle", sortMode: "ASC" });
  const [message, setMessage] = React.useState({ msg: "", active: false });
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

  const handleRiddleToEdit = (id) => {
    setRiddleToEdit((prev) => (prev === id ? -1 : id));
  };

  const handleRiddleToDelete = (id, answer) => {
    setRiddleToDelete((prev) => {
      return {
        ...prev,
        id: id,
        answer: answer,
      };
    });
  };

  const handleCanDeleteRiddle = () => {
    setCanDeleteRiddle((prev) => !prev);
  };

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
    const isToEdit = riddle.riddle_id === riddleToEdit;

    return (
      <tr
        key={riddle.riddle_id}
        className="p-2 cstm-flex-col justify-start gap-5 text-center w-full rounded-md bg-accntColor
                  t:bg-white t:cstm-flex-row"
      >
        <td className="t:hidden">
          <p className="text-prmColor font-bold text-sm t:hidden">Riddle</p>
        </td>

        <td className="whitespace-pre-wrap text-justify t:w-[50%]">
          {isToEdit ? (
            <textarea
              className="w-full resize-none bg-accntColor rounded-md p-2"
              name="riddle"
              value={riddle.riddle}
              onChange={(e) => handleRiddle(riddle.riddle_id, e.target)}
            />
          ) : (
            riddle.riddle
          )}
        </td>

        <td className="t:hidden">
          <div className="cstm-separator t:hidden" />
        </td>

        <td className="t:hidden">
          <p className="text-prmColor font-bold text-sm t:hidden">Answer</p>
        </td>

        <td className="t:w-[20%]">
          {isToEdit ? (
            <textarea
              className="w-full resize-none bg-accntColor rounded-md p-2"
              name="answer"
              value={riddle.answer}
              onChange={(e) => handleRiddle(riddle.riddle_id, e.target)}
            />
          ) : (
            riddle.answer
          )}
        </td>

        <td className="t:hidden">
          <div className="cstm-separator t:hidden" />
        </td>

        <td className="t:hidden">
          <p className="text-prmColor font-bold text-sm t:hidden">Date Added</p>
        </td>

        <td className="t:w-[20%]">{localizeDate(riddle.date_added)}</td>
        <td className="t:w-[10%] cstm-flex-row gap-5">
          <button
            onClick={() => handleRiddleToEdit(riddle.riddle_id)}
            className={`cstm-flex-col cstm-bg-hover ${
              isToEdit ? "text-scndColor" : "text-prmColor"
            } `}
          >
            {isToEdit ? <IoClose className="scale-125" /> : <AiFillEdit className="scale-125" />}
          </button>

          {!isToEdit ? (
            <button
              onClick={() => {
                handleCanDeleteRiddle();
                handleRiddleToDelete(riddle.riddle_id, riddle.answer);
              }}
              className={`cstm-flex-col cstm-bg-hover ${
                isToEdit ? "text-scndColor" : "text-prmColor"
              } `}
            >
              <AiFillDelete className="scale-125" />
            </button>
          ) : null}

          {isToEdit ? (
            <button
              onClick={() => editRiddle(riddle.riddle_id)}
              className={`cstm-flex-col cstm-bg-hover ${
                isToEdit ? "text-scndColor" : "text-prmColor"
              } `}
            >
              <BiCheck className="scale-125" />
            </button>
          ) : null}
        </td>
      </tr>
    );
  });

  const editRiddle = async (id) => {
    let riddle,
      answer = null;

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
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  };

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
      setMessage({ active: true, msg: error?.response?.data?.msg });
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

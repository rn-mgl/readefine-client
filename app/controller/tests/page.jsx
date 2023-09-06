"use client";
import React from "react";
import AdminPageHeader from "../../../src/admin/global/PageHeader";
import TestsCards from "@/src/src/admin/tests/TestsCards";
import TestsFilter from "@/src/src/admin/tests/TestsFilter";
import axios from "axios";
import Message from "@/src/src/components/global/Message";
import Image from "next/image";

import noTest from "../../../public/profile/NoTest.svg";

import { inputDate } from "@/src/src/functions/localDate";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { cipher } from "@/src/src/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import { useLoading } from "@/src/src/hooks/useLoading";
import FetchingMessage from "@/src/src/components/global/FetchingMessage";

const AdminTests = () => {
  const [tests, setTests] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

  // filters
  const [searchFilter, setSearchFilter] = React.useState({ toSearch: "title", searchKey: "" });
  const [lexileRangeFilter, setLexileRangeFilter] = React.useState({ from: 0, to: 1250 });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "title", sortMode: "ASC" });
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "",
    to: inputDate(new Date().toLocaleDateString()),
  });

  const { loading, setLoadingState } = useLoading(true);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

  // handle onchange search filter
  const handleSearchFilter = ({ name, value }) => {
    setSearchFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle date range filter
  const handleDateRangeFilter = ({ name, value }) => {
    setDateRangeFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle lexile range filter
  const handleLexileRangeFilter = ({ name, value }) => {
    setLexileRangeFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle sort filter
  const handleSortFilter = ({ name, value }) => {
    setSortFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // get tests
  const getTests = React.useCallback(async () => {
    setLoadingState(true);
    try {
      const { data } = await axios.get(`${url}/admin_test`, {
        params: {
          searchFilter,
          lexileRangeFilter,
          sortFilter,
          dateRangeFilter,
        },
        headers: { Authorization: user?.token },
      });

      if (data) {
        setTests(data);
        setLoadingState(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);

      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setTests, setLoadingState, searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter]);

  // map test cards
  const testCards = tests.map((t) => {
    const cipheredTestId = cipher(t.test_id);
    return (
      <React.Fragment key={t.test_id}>
        <TestsCards
          image={t.book_cover}
          title={t.title}
          author={t.author}
          lexile={t.lexile}
          to={`/controller/tests/${cipheredTestId}`}
        />
      </React.Fragment>
    );
  });

  React.useEffect(() => {
    if (user) {
      getTests();
    }
  }, [user, getTests]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Tests" />

      {/* show if has message pop up */}
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <div className="w-full cstm-w-limit cstm-flex-col gap-5 ">
        {/* test filter */}
        <TestsFilter
          handleSearchFilter={handleSearchFilter}
          handleDateRangeFilter={handleDateRangeFilter}
          handleLexileRangeFilter={handleLexileRangeFilter}
          handleSortFilter={handleSortFilter}
          searchFilter={searchFilter}
          lexileRangeFilter={lexileRangeFilter}
          sortFilter={sortFilter}
          dateRangeFilter={dateRangeFilter}
        />

        {/* all tests */}
        <div
          className="cstm-flex-col gap-5 justify-start w-full transition-all relative 
                  t:cstm-flex-row t:flex-wrap"
        >
          {tests.length ? (
            testCards
          ) : loading ? (
            <FetchingMessage />
          ) : (
            <div className="cstm-flex-col absolute top-2/4 translate-y-2/4 left-2/4 -translate-x-2/4 w-full">
              <Image src={noTest} alt="empty" priority width={220} draggable={false} />
              <p className="text-xs opacity-80">No Tests Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTests;

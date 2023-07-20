"use client";
import React from "react";
import AdminPageHeader from "../../../src/admin/global/PageHeader";
import TestsCards from "@/src/src/admin/tests/TestsCards";
import TestsFilter from "@/src/src/admin/tests/TestsFilter";
import axios from "axios";
import Message from "@/src/src/components/global/Message";

import { inputDate } from "@/src/src/functions/localDate";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { cipher } from "@/src/src/functions/security";

const AdminTests = () => {
  const [tests, setTests] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false });

  // filters
  const [searchFilter, setSearchFilter] = React.useState({ toSearch: "title", searchKey: "" });
  const [lexileRangeFilter, setLexileRangeFilter] = React.useState({ from: 0, to: 1250 });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "title", sortMode: "ASC" });
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "",
    to: inputDate(new Date().toLocaleDateString()),
  });

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

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
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, user, setTests, searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter]);

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

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Tests" />

      {/* show if has message pop up */}
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

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
      <div className="w-full cstm-w-limit">
        <div
          className="cstm-flex-col gap-5 justify-start w-full transition-all 
                  t:cstm-flex-row t:flex-wrap"
        >
          {testCards}
        </div>
      </div>
    </div>
  );
};

export default AdminTests;

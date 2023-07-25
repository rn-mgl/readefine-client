"use client";
import React, { Suspense } from "react";
import { inputDate } from "@/src/src/functions/localDate";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";

import TestsCards from "@/src/src/client/tests/TestsCards";
import TestsFilter from "@/src/src/client/tests/TestsFilter";
import axios from "axios";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import Message from "@/src/src/components/global/Message";
import LowLexileTestMessage from "@/src/src/client/tests/LowLexileTestMessage";
import TestRecord from "@/src/src/client/tests/TestRecord";
import { cipher } from "@/src/src/functions/security";

const ClientTests = () => {
  const [tests, setTests] = React.useState([]);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });
  const [showLexileMessage, setShowLexileMessage] = React.useState(false);

  const [userLexile, setUserLexile] = React.useState(-1);
  const [selectedBook, setSelectedBook] = React.useState(-1);
  const [seeTestRecord, setSeeTestRecord] = React.useState(null);

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

  const handleSearchFilter = ({ name, value }) => {
    setSearchFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleDateRangeFilter = ({ name, value }) => {
    setDateRangeFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLexileRangeFilter = ({ name, value }) => {
    setLexileRangeFilter((prev) => {
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

  const handleShowLexileMessage = () => {
    setShowLexileMessage((prev) => !prev);
  };

  const handleSelectedBook = (id) => {
    setSelectedBook(id);
  };

  const handleSeeTestRecord = (id) => {
    setSeeTestRecord((prev) => (prev === id ? null : id));
  };

  const testCards = tests.map((t) => {
    const cipheredTestId = cipher(t.test_id);
    return (
      <React.Fragment key={t.test_id}>
        <TestsCards
          image={t.book_cover}
          title={t.title}
          author={t.author}
          lexile={t.lexile}
          score={t.score}
          to={`/archives/tests/${cipheredTestId}`}
          testId={t.test_id}
          isTaken={t.is_taken}
          isLower={userLexile.lexile - 100 > t.lexile}
          showLexileMessage={showLexileMessage}
          handleShowLexileMessage={handleShowLexileMessage}
          handleSelectedBook={handleSelectedBook}
          handleSeeTestRecord={handleSeeTestRecord}
        />
      </React.Fragment>
    );
  });

  const getTests = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/test`, {
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
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setTests, searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter]);

  const getUserLexile = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/user_lexile`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        setUserLexile(data);
        setLexileRangeFilter({ from: data.lexile - 100, to: data.lexile + 50 });
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [setUserLexile, setLexileRangeFilter, url, user]);

  React.useEffect(() => {
    if (user) {
      getTests();
    }
  }, [user, getTests]);

  React.useEffect(() => {
    if (user) {
      getUserLexile();
    }
  }, [user, getUserLexile]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <ClientPageHeader subHeader="Tests" mainHeader="Readefine" />

      {seeTestRecord ? (
        <TestRecord testId={seeTestRecord} handleSeeTestRecord={handleSeeTestRecord} />
      ) : null}

      {showLexileMessage ? (
        <LowLexileTestMessage
          userLexile={userLexile.lexile}
          testLink={`/archives/tests/${cipher(selectedBook)}`}
          handleShowLexileMessage={handleShowLexileMessage}
        />
      ) : null}

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

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

      <div className="w-full cstm-w-limit">
        <div
          className="cstm-flex-col gap-5 justify-start w-full transition-all 
                  t:cstm-flex-row t:flex-wrap"
        >
          <Suspense fallback={<p>Loading...</p>}> {testCards}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default ClientTests;

"use client";
import React, { Suspense } from "react";
import TestsCards from "@/src/src/client/tests/TestsCards";
import TestsFilter from "@/src/src/client/tests/TestsFilter";
import axios from "axios";
import { inputDate } from "@/src/src/functions/localDate";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import ClientPageHeader from "@/src/src/client/global/PageHeader";

const ClientTests = () => {
  const [tests, setTests] = React.useState([]);
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

  const testCards = tests.map((t) => {
    return (
      <React.Fragment key={t.test_id}>
        <TestsCards
          image={t.book_cover}
          title={t.title}
          author={t.author}
          lexile={t.lexile}
          score={t.score}
          to={`/archives/tests/${t.test_id}`}
          isTaken={t.is_taken}
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
    }
  }, [url, user, setTests, searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter]);

  React.useEffect(() => {
    if (user) {
      setLexileRangeFilter({ from: user?.lexile - 50, to: user?.lexile + 100 });
    }
  }, [user, setLexileRangeFilter]);

  React.useEffect(() => {
    if (user) {
      getTests();
    }
  }, [user, getTests]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <ClientPageHeader subHeader="Tests" mainHeader="Readefine" />
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

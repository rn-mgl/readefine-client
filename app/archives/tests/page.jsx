"use client";
import React from "react";
import TestsCards from "@/src/src/client/tests/TestsCards";
import TestsFilter from "@/src/src/client/tests/TestsFilter";
import axios from "axios";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import Message from "@/src/src/components/global/Message";
import LowLexileTestMessage from "@/src/src/client/tests/LowLexileTestMessage";
import TestRecord from "@/src/src/client/tests/TestRecord";
import Image from "next/image";

import noTest from "../../../public/profile/NoTest.svg";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { cipher } from "@/src/src/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import { useMessage } from "@/src/src/hooks/useMessage";
import { useUserLexile } from "@/src/src/hooks/useUserLexile";
import { useTestFilters } from "@/src/src/hooks/useTestFilters";

const ClientTests = () => {
  const [tests, setTests] = React.useState([]);
  const [showLexileMessage, setShowLexileMessage] = React.useState(false);

  const [selectedBook, setSelectedBook] = React.useState(-1);
  const [seeTestRecord, setSeeTestRecord] = React.useState(null);

  const { message, setMessageStatus } = useMessage();
  const { userLexile } = useUserLexile();
  const {
    searchFilter,
    lexileRangeFilter,
    sortFilter,
    handleSearchFilter,
    handleLexileRangeFilter,
    handleSortFilter,
    setLexileSweetSpot,
  } = useTestFilters();

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

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
          isLower={userLexile - 100 > t.lexile}
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
        },
        headers: { Authorization: user?.token },
      });
      if (data) {
        setTests(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, searchFilter, lexileRangeFilter, sortFilter, setMessageStatus]);

  React.useEffect(() => {
    if (user) {
      getTests();
    }
  }, [user, getTests]);

  React.useEffect(() => {
    setLexileSweetSpot(userLexile - 100, userLexile + 50);
  }, [userLexile, setLexileSweetSpot]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[1]);

      if (isExpired) {
        router.push("/login");
      }
    }
  }, [user, router]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <ClientPageHeader subHeader="Tests" mainHeader="Readefine" />

      {seeTestRecord ? <TestRecord testId={seeTestRecord} handleSeeTestRecord={handleSeeTestRecord} /> : null}

      {showLexileMessage ? (
        <LowLexileTestMessage
          userLexile={userLexile}
          testLink={`/archives/tests/${cipher(selectedBook)}`}
          handleShowLexileMessage={handleShowLexileMessage}
        />
      ) : null}

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <div className="w-full cstm-w-limit cstm-flex-col gap-5 ">
        <TestsFilter
          handleSearchFilter={handleSearchFilter}
          handleLexileRangeFilter={handleLexileRangeFilter}
          handleSortFilter={handleSortFilter}
          searchFilter={searchFilter}
          lexileRangeFilter={lexileRangeFilter}
          sortFilter={sortFilter}
        />

        <div
          className="cstm-flex-col gap-5 justify-start w-full transition-all relative
                  t:cstm-flex-row t:flex-wrap"
        >
          {tests.length ? (
            testCards
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

export default ClientTests;

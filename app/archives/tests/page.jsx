"use client";
import React from "react";
import TestsCards from "@/client/tests/TestsCards";
import TestsFilter from "@/client/tests/TestsFilter";
import axios from "axios";
import ClientPageHeader from "@/client/global/PageHeader";
import Message from "@/components/global/Message";
import LowLexileTestMessage from "@/client/tests/LowLexileTestMessage";
import TestRecord from "@/client/tests/TestRecord";
import Image from "next/image";

import noTest from "@/public/profile/NoTest.svg";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useMessage } from "@/hooks/useMessage";
import { useUserLexile } from "@/hooks/useUserLexile";
import { useTestFilters } from "@/hooks/useTestFilters";

const ClientTests = () => {
  const [tests, setTests] = React.useState([]);
  const [showLexileMessage, setShowLexileMessage] = React.useState(false);

  const [selectedBook, setSelectedBook] = React.useState(-1);
  const [seeTestRecord, setSeeTestRecord] = React.useState(null);

  const { message, setMessageStatus } = useMessage();
  const { userLexile } = useUserLexile();
  const { searchFilter, sortFilter, handleSearchFilter, handleSortFilter } =
    useTestFilters();

  const { data: session } = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL;
  const user = session?.user;
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
    const cipheredTestId = t.test_id;
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
          userLexile,
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
  }, [
    url,
    user?.token,
    searchFilter,
    userLexile,
    sortFilter,
    setMessageStatus,
  ]);

  React.useEffect(() => {
    if (user && userLexile) {
      getTests();
    }
  }, [user, userLexile, getTests]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[1]);

      if (isExpired) {
        router.push("/login");
      }
    }
  }, [user, router]);

  return (
    <div className="p-4 bg-accntColor w-full min-h-screen cstm-flex-col gap-4 justify-start">
      <ClientPageHeader subHeader="Tests" mainHeader="Readefine" />

      {seeTestRecord ? (
        <TestRecord
          testId={seeTestRecord}
          handleSeeTestRecord={handleSeeTestRecord}
        />
      ) : null}

      {showLexileMessage ? (
        <LowLexileTestMessage
          userLexile={userLexile}
          testLink={`/archives/tests/${selectedBook}`}
          handleShowLexileMessage={handleShowLexileMessage}
        />
      ) : null}

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <div className="w-full h-full cstm-flex-col gap-4 justify-start ">
        <TestsFilter
          handleSearchFilter={handleSearchFilter}
          handleSortFilter={handleSortFilter}
          searchFilter={searchFilter}
          sortFilter={sortFilter}
        />

        <div
          className="cstm-flex-col gap-4 justify-start w-full transition-all relative
                  t:cstm-flex-row t:flex-wrap"
        >
          {tests.length ? (
            testCards
          ) : (
            <div className="cstm-flex-col absolute top-2/4 translate-y-2/4 left-2/4 -translate-x-2/4 w-full">
              <Image
                src={noTest}
                alt="empty"
                priority
                width={220}
                draggable={false}
              />
              <p className="text-xs opacity-80">No Tests Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientTests;

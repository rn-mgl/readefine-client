"use client";
import React from "react";
import AdminPageHeader from "@/admin/global/PageHeader";
import TestsCards from "@/admin/tests/TestsCards";
import TestsFilter from "@/admin/tests/TestsFilter";
import axios from "axios";
import Message from "@/components/global/Message";
import Image from "next/image";

import noTest from "@/public/profile/NoTest.svg";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/base/context";
import { cipher } from "@/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useMessage } from "@/hooks/useMessage";
import { useTestFilters } from "@/hooks/useTestFilters";

const AdminTests = () => {
  const [tests, setTests] = React.useState([]);

  const { message, setMessageStatus } = useMessage();
  const {
    searchFilter,
    lexileRangeFilter,
    sortFilter,
    dateRangeFilter,
    handleSearchFilter,
    handleDateRangeFilter,
    handleLexileRangeFilter,
    handleSortFilter,
  } = useTestFilters();

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

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
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter, setMessageStatus]);

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
      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

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

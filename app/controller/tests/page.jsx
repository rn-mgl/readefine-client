"use client";
import React from "react";
import AdminPageHeader from "../../../src/admin/global/PageHeader";
import TestsCards from "@/src/components/src/admin/tests/TestsCards";
import DashboardCardImage2 from "../../../public/DashboardCardImage2.svg";
import TestsFilter from "@/src/components/src/admin/tests/TestsFilter";
import { adminIsLogged } from "@/src/components/src/security/verifications";
import { useRouter } from "next/navigation";

const AdminTests = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (!adminIsLogged()) {
      router.push("/filter");
    }
  }, [adminIsLogged, router]);
  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Tests" />
      <TestsFilter />
      <div
        className="w-full     
                  l-s:w-[70%] l-s:ml-auto
                  l-l:w-[80%]"
      >
        <div
          className="cstm-flex-col gap-5 justify-start w-full transition-all 
                  t:cstm-flex-row t:flex-wrap"
        >
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
          <TestsCards
            image={DashboardCardImage2}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/tests/123"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminTests;

import React from "react";
import AdminPageHeader from "../../../src/admin/global/PageHeader";
import StoriesCards from "@/src/components/src/admin/stories/StoriesCards";
import DashboardCardImage3 from "../../../public/DashboardCardImage3.svg";
import StoriesFilter from "@/src/components/src/admin/stories/StoriesFilter";

const AdminStories = () => {
  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Stories" />
      <StoriesFilter />
      <div
        className="w-full     
                  l-s:w-[70%] l-s:ml-auto
                  l-l:w-[80%]"
      >
        <div
          className="cstm-flex-col gap-5 justify-start w-full transition-all 
                  t:cstm-flex-row t:flex-wrap"
        >
          <StoriesCards
            image={DashboardCardImage3}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/stories/123"
          />
          <StoriesCards
            image={DashboardCardImage3}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/stories/123"
          />
          <StoriesCards
            image={DashboardCardImage3}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/stories/123"
          />
          <StoriesCards
            image={DashboardCardImage3}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/stories/123"
          />
          <StoriesCards
            image={DashboardCardImage3}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/stories/123"
          />
          <StoriesCards
            image={DashboardCardImage3}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/stories/123"
          />
          <StoriesCards
            image={DashboardCardImage3}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/stories/123"
          />
          <StoriesCards
            image={DashboardCardImage3}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/stories/123"
          />
          <StoriesCards
            image={DashboardCardImage3}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/stories/123"
          />
          <StoriesCards
            image={DashboardCardImage3}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/stories/123"
          />
          <StoriesCards
            image={DashboardCardImage3}
            title="Title"
            author="author"
            lexile={300}
            genre="genre"
            to="/controller/stories/123"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminStories;

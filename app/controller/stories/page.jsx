"use client";
import React from "react";
import AdminPageHeader from "../../../src/admin/global/PageHeader";
import StoriesCards from "@/src/components/src/admin/stories/StoriesCards";
import DashboardCardImage3 from "../../../public/DashboardCardImage3.svg";
import StoriesFilter from "@/src/components/src/admin/stories/StoriesFilter";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/components/context";
import axios from "axios";

const AdminStories = () => {
  const [stories, setStories] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState({ toSearch: "title", searchKey: "" });
  const [lexileRangeFilter, setLexileRangeFilter] = React.useState({ from: 0, to: 1250 });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "title", sortMode: "ASC" });
  const [dateRangeFilter, setDateRangeFilter] = React.useState({ from: "", to: new Date() });
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

  const getAllStories = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_story/`, {
        headers: { Authorization: user.token },
        params: {
          searchFilter,
          lexileRangeFilter,
          sortFilter,
          dateRangeFilter,
        },
      });

      if (data) {
        setStories(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, setStories, searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter]);

  const storiesCards = stories.map((story) => {
    return (
      <React.Fragment key={story.story_id}>
        <StoriesCards
          image={story.book_cover ? story.book_cover : DashboardCardImage3}
          title={story.title}
          author={story.author}
          lexile={story.lexile}
          genre={story.genre}
          visit={`/controller/stories/${story.story_id}`}
          test={`/controller/tests/${story.story_id}`}
        />
      </React.Fragment>
    );
  });

  React.useEffect(() => {
    if (user) {
      getAllStories();
    }
  }, [getAllStories, user]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Stories" />
      <StoriesFilter
        handleSearchFilter={handleSearchFilter}
        handleDateRangeFilter={handleDateRangeFilter}
        handleLexileRangeFilter={handleLexileRangeFilter}
        handleSortFilter={handleSortFilter}
        searchFilter={searchFilter}
        lexileRangeFilter={lexileRangeFilter}
        sortFilter={sortFilter}
        dateRangeFilter={dateRangeFilter}
      />
      <div
        className="w-full     
                  l-s:w-[70%] l-s:ml-auto
                  l-l:w-[80%]"
      >
        <div
          className="cstm-flex-col gap-5 justify-start w-full transition-all 
                  t:cstm-flex-row t:flex-wrap"
        >
          {storiesCards}
        </div>
      </div>
    </div>
  );
};

export default AdminStories;

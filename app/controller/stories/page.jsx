"use client";
import React from "react";
import AdminPageHeader from "@/admin/global/PageHeader";
import StoriesCards from "@/admin/stories/StoriesCards";
import StoriesFilter from "@/admin/stories/StoriesFilter";
import axios from "axios";
import Link from "next/link";
import Message from "@/components/global/Message";
import Image from "next/image";
import ActionLabel from "@/components/global/ActionLabel";

import noReads from "@/public/profile/NoReads.svg";

import { IoAddOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/base/context";
import { cipher } from "@/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useMessage } from "@/hooks/useMessage";
import { useStoryFilters } from "@/hooks/useStoryFilters";
import useAdminActivities from "@/src/hooks/useAdminActivities";

const AdminStories = () => {
  const [stories, setStories] = React.useState([]);

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
  } = useStoryFilters();

  const { createAdminActivity } = useAdminActivities();

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

  // get all stories
  const getAllStories = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_story/`, {
        headers: { Authorization: user?.token },
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
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter, setMessageStatus]);

  // map stories
  const storiesCards = stories.map((story) => {
    // temporarily use story_id if no test to cater the condition in suddenly checking test with no content
    const testId = story?.test_id ? story?.test_id : story.story_id;
    const cipheredStoryId = cipher(story.story_id);
    const cipheredTestId = cipher(testId);

    // if story has no test, redirect to add
    const testLink = story?.has_test
      ? `/controller/tests/${cipheredTestId}`
      : `/controller/tests/add/${cipheredTestId}`;

    return (
      <React.Fragment key={story.story_id}>
        <StoriesCards
          image={story.book_cover}
          title={story.title}
          author={story.author}
          lexile={story.lexile}
          genre={story.genre}
          testId={story.test_id}
          visit={`/controller/stories/${cipheredStoryId}`}
          createAdminActivity={async () => await createAdminActivity("story", story?.title, "R")}
          test={testLink}
        />
      </React.Fragment>
    );
  });

  React.useEffect(() => {
    if (user) {
      getAllStories();
    }
  }, [getAllStories, user]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-4 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Stories" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <div className="w-full cstm-w-limit cstm-flex-col gap-4 ">
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

        <div className="relative group cstm-flex-col mr-auto">
          <ActionLabel label="Add Story" />
          <Link href="/controller/stories/add" className="cstm-bg-hover p-2 w-fit">
            <IoAddOutline className="text-prmColor cursor-pointer scale-150" />
          </Link>
        </div>

        <div
          className="cstm-flex-col gap-4 justify-start w-full transition-all relative
                  t:cstm-flex-row t:flex-wrap"
        >
          {stories.length ? (
            storiesCards
          ) : (
            <div className="cstm-flex-col absolute top-2/4 translate-y-2/4 left-2/4 -translate-x-2/4 w-full">
              <Image src={noReads} alt="empty" priority width={220} draggable={false} />
              <p className="text-xs opacity-80">No Stories Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStories;

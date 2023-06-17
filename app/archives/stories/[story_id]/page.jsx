"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import axios from "axios";

const SingleStory = ({ params }) => {
  const [storyData, setStoryData] = React.useState({});
  const [storyContent, setStoryContent] = React.useState([]);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const storyId = params?.story_id;

  const getStoryData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/story/${storyId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setStoryData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, storyId]);

  const getStoryContent = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/story_content`, {
        params: { storyId },
        headers: { Authorization: user?.token },
      });

      if (data) {
        setStoryContent(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, storyId]);

  React.useEffect(() => {
    if (user) {
      getStoryData();
    }
  }, [user, getStoryData]);

  React.useEffect(() => {
    if (user) {
      getStoryContent();
    }
  }, [user, getStoryContent]);

  return <div>SingleStory</div>;
};

export default SingleStory;

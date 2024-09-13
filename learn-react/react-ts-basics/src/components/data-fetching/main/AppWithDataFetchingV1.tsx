// import React from 'react'

import { useEffect, useState } from "react";
import { get } from "../common/http";
import BlogPosts, { BlogPost } from "../blog-post/BlogPosts";
import fetchingImg from '../../../assets/data-fetching.png';

type RawDataBlogPost = {
  uniqueId: string;
  name: string;
  parentId: string;
  // _id: string;
  // children: RawDataBlogPost[] | null;
  // tags: string[];
  // ancestors: { uniqueId: string; name: string; parentId: string }[] | null;
};

const AppWithDataFetchingV1 = () => {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const data = (await get(
        "http://127.0.0.1:3003/topics"
      )) as RawDataBlogPost[];

      const blogPosts: BlogPost[] = data.map((rawPost) => ({
        id: rawPost.uniqueId,
        title: rawPost.name,
        text: rawPost.name,
      }));

      setFetchedPosts(blogPosts);
    }

    fetchPosts();
  }, []);
  return (
    <main>
        <img src={fetchingImg} alt="An abstract image depicting a data fetching process." />
        <BlogPosts posts={fetchedPosts}/>
    </main>
  );
};

export default AppWithDataFetchingV1;

// import React from 'react'

import { ReactNode, useEffect, useState } from "react";
import { get } from "../common/http";
import BlogPosts, { BlogPost } from "../blog-post/BlogPosts";
import fetchingImg from "../../../assets/data-fetching.png";
import ErrorMessage from "../error-message/ErrorMessage";

type RawDataBlogPost = {
  uniqueId: string;
  name: string;
  parentId: string;
  // _id: string;
  // children: RawDataBlogPost[] | null;
  // tags: string[];
  // ancestors: { uniqueId: string; name: string; parentId: string }[] | null;
};

const AppWithDataFetchingV3 = () => {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError]= useState<string>("")

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      setError("");
      setFetchedPosts([]);
      try{
        const data = (await get(
          "http://127.0.0.1:3003/topics"
        )) as RawDataBlogPost[];
  
        const blogPosts: BlogPost[] = data.map((rawPost) => ({
          id: rawPost.uniqueId,
          title: rawPost.name,
          text: rawPost.name,
        }));
        setFetchedPosts(blogPosts);

      }catch(e){
        if(e instanceof Error){
          setError(e.message);
        }        
      }

      setIsFetching(false);
      
    }

    fetchPosts();
  }, []);

  let content: ReactNode;
  if (isFetching) {
    content = <p id="loading-fallback">Fetching Posts....</p>;
  } else if(error) {
    content = <ErrorMessage text={error}/>
  }else{
    content= null;
  }
  return (
    <main>
      <img
        src={fetchingImg}
        alt="An abstract image depicting a data fetching process."
      />
      {content}
      <BlogPosts posts={fetchedPosts} />
    </main>
  );
};

export default AppWithDataFetchingV3;

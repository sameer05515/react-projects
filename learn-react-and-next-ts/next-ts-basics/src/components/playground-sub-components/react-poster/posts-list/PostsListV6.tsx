import React, { useState } from "react";
import Post, { PostProps } from "../post/Post";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import NewPost from "../new-post/NewPostWithCustomFormV3";

type PostsListProps = {
  data?: PostProps[];
};

const PostsListV6 = ({ data = [] }: PostsListProps) => {
  const {
    GLOBAL_APPLICATION_STYLES: { "post-list-container": posts },
  } = useGlobalStyles();
  const [enteredFormData, setEnteredFormData] = useState<{
    author: string;
    body: string;
  }>();
  return (
    <>
      <NewPost onSubmit={(data) => setEnteredFormData(() => ({ ...data }))} onReset={()=>{}} />
      <ul className={posts}>
        <Post author="Premendra Kumar" body="Practice makes a man perfect" />
        <Post
          author="Vandana Kumari"
          body="I will become a teacher in next birth"
        />
        {enteredFormData && <Post {...enteredFormData} />}
      </ul>
    </>
  );
};

export default PostsListV6;

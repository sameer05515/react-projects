import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import React from "react";

export type PostProps = {
  author: string;
  body: string;
};

const Post = ({ author: name, body: details }: PostProps) => {
  const {
    GLOBAL_APPLICATION_STYLES: {
      "post-item-card":post,
      "post-item-card-author": postAuthor,
      "post-item-card-body": postBody,
    },
  } = useGlobalStyles();
  return (
    <li className={post}>
      <p className={postAuthor}>{name}</p>
      <p className={postBody}>{details}</p>
    </li>
  );
};

export default Post;

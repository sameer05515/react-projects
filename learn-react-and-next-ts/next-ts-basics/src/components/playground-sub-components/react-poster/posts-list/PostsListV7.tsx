import React, { useState } from "react";
import Post, { PostProps } from "../post/Post";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import NewPost from "../new-post/NewPostWithCustomFormV3";
import Modal from "@/components/common/modal-overlay/Modal";

type PostsListProps = {
  data?: PostProps[];
  isPosting: boolean;
  onStopPosting: () => void;
};

const PostsListV7 = ({
  data = [],
  isPosting,
  onStopPosting,
}: PostsListProps) => {
  const {
    GLOBAL_APPLICATION_STYLES: { "post-list-container": posts },
  } = useGlobalStyles();
  const [enteredFormData, setEnteredFormData] = useState<{
    author: string;
    body: string;
  }>();

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost
            onSubmit={(data) => {
              setEnteredFormData(() => ({ ...data }));
              onStopPosting();
            }}
            onReset={() => onStopPosting()}
          />
        </Modal>
      )}
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

export default PostsListV7;

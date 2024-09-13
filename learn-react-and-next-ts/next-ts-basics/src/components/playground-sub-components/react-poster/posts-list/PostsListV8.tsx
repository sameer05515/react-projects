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

const PostsListV8 = ({
  data: initialData = [],
  isPosting,
  onStopPosting,
}: PostsListProps) => {
  const {
    GLOBAL_APPLICATION_STYLES: { "post-list-container": posts },
  } = useGlobalStyles();

  const [postsList, setPostsList] = useState<PostProps[]>(initialData || []);

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost
            onSubmit={(data) => {
              onStopPosting();
              setPostsList((prev) => [data, ...prev]);
            }}
            onReset={() => onStopPosting()}
          />
        </Modal>
      )}
      <ul className={posts}>
        {/* <Post author="Premendra Kumar" body="Practice makes a man perfect" />
        <Post
          author="Vandana Kumari"
          body="I will become a teacher in next birth"
        /> */}
        {postsList?.length > 0 ? (
          postsList.map((p, idx) => (
            <Post key={`id_${idx + 1}`} author={p.author} body={p.body} />
          ))
        ) : (
          <div style={{ width:'90%',textAlign: "center", color: "white" }}>
            <h2>There are no posts yet</h2>
          </div>
        )}
      </ul>
    </>
  );
};

export default PostsListV8;

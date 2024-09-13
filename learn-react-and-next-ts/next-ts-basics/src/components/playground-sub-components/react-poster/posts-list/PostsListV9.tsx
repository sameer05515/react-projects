import React, { useEffect, useState } from "react";
import Post, { PostProps } from "../post/Post";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import NewPost from "../new-post/NewPostWithCustomFormV3";
import Modal from "@/components/common/modal-overlay/Modal";
import JSONDataViewer from "@/components/common/JSONDataViewer";

type PostsListProps = {
  data?: PostProps[];
  isPosting: boolean;
  onStopPosting: () => void;
};

const BaseURL = "http://127.0.0.1:3003/tweets/v2";

const PostsListV8 = ({
  data: initialData = [],
  isPosting,
  onStopPosting,
}: PostsListProps) => {
  const {
    GLOBAL_APPLICATION_STYLES: { "post-list-container": posts },
  } = useGlobalStyles();

  const [postsList, setPostsList] = useState<PostProps[]>(initialData || []);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(BaseURL);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const responseJson = await response.json();
        setPostsList(
          responseJson.data.map(
            (d: { _id: string; content: string; author: string }) => ({
              // ...d,
              id: d._id,
              body: d.content,
              author: d.author,
            })
          ) || []
        );
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const addPostHandler = async (data: PostProps) => {
    try {
      const response = await fetch(BaseURL, {
        method: "POST",
        body: JSON.stringify({ author: data.author, content: data.body }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add post");
      }

      const newPost = await response.json();
      // const {id,body, author}= newPost.data;
      const d = newPost.data;
      setPostsList((prev) => [
        { id: d._id, body: d.content, author: d.author },
        ...prev,
      ]); // Optimistic UI update
      onStopPosting();
    } catch (err) {
      console.error("Error posting data: ", (err as Error).message);
    }
  };

  if (isLoading) {
    return (
      <div style={{ width: "90%", textAlign: "center", color: "white" }}>
        <h2>Loading posts...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: "90%", textAlign: "center", color: "red" }}>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onSubmit={addPostHandler} onReset={() => onStopPosting()} />
        </Modal>
      )}
      <ul className={posts}>
        {postsList?.length > 0 ? (
          postsList.map((p, idx) => (
            <Post key={`id_${idx + 1}`} author={p.author} body={p.body} />
          ))
        ) : (
          <div style={{ width: "90%", textAlign: "center", color: "white" }}>
            <h2>There are no posts yet</h2>
          </div>
        )}
      </ul>

      <JSONDataViewer metadata={postsList} title="Jhaat ki dukaan" />
    </>
  );
};

export default PostsListV8;

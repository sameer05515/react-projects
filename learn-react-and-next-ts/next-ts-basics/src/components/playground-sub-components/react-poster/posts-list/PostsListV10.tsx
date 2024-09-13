import React, { useEffect, useState } from "react";
import Post, { PostProps } from "../post/Post";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import NewPost from "../new-post/NewPostWithCustomFormV3";
import Modal from "@/components/common/modal-overlay/Modal";
import JSONDataViewer from "@/components/common/JSONDataViewer";

// TypeScript type for the API response
interface ApiResponse<T> {
  status: "SUCCESS" | "VALIDATION_ERROR" | "DATABASE_ERROR" | "ERROR";
  messages: string[];
  data: T | null;
  statusCode: number;
  timeStamp: string;
}

// Type for Tweet data coming from the API
interface TweetData {
  _id: string;
  content: string;
  author: string;
}

// Props for the component
type PostsListProps = {
  data?: PostProps[];
  isPosting: boolean;
  onStopPosting: () => void;
};

const BaseURL = "http://127.0.0.1:3003/tweets/v2";

const PostsListV10 = ({
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

        const responseJson: ApiResponse<TweetData[]> = await response.json();

        if (responseJson.status === "SUCCESS") {
          // Map data to PostProps format
          const mappedPosts =
            responseJson.data?.map((d) => ({
              id: d._id,
              body: d.content,
              author: d.author,
            })) || [];
          setPostsList(mappedPosts);
        } else {
          // Handle the case where data is null
          throw new Error(responseJson.messages.join(", "));
        }
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

      // if (!response.ok) {
      //   throw new Error("Failed to add post");
      // }

      const responseJson: ApiResponse<TweetData> = await response.json();

      if (responseJson.status === "SUCCESS" && responseJson.data) {
        // Optimistic UI update with the new post
        const newPostData = {
          id: responseJson.data._id,
          body: responseJson.data.content,
          author: responseJson.data.author,
        };
        setPostsList((prev) => [newPostData, ...prev]);
        onStopPosting();
      } else if (responseJson.status === "SUCCESS" && !responseJson.data) {
        throw new Error(
          "Response saved but data recieved as invalid value. Please connect with Administrator"
        );
      } else {
        throw new Error(responseJson.messages.join(", "));
      }
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

export default PostsListV10;

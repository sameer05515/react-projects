import React, { useEffect, useRef, useState, useCallback } from "react";
import Post, { PostProps } from "../post/Post";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import NewPost, { FormErrorsHandle } from "../new-post/NewPostWithCustomFormV4";
import Modal from "@/components/common/modal-overlay/ModalV2";
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

const PostsListV11 = ({ data: initialData = [], isPosting, onStopPosting }: PostsListProps) => {
  const { GLOBAL_APPLICATION_STYLES: { "post-list-container": posts } } = useGlobalStyles();

  const [postsList, setPostsList] = useState<PostProps[]>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const newPostFormErrorsRef = useRef<FormErrorsHandle>(null);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(BaseURL);
        const responseJson: ApiResponse<TweetData[]> = await response.json();

        if (responseJson.status === "SUCCESS" && responseJson.data) {
          const mappedPosts = responseJson.data.map((d) => ({
            id: d._id,
            body: d.content,
            author: d.author,
          }));
          setPostsList(mappedPosts);
        } else {
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

  // Handler to add a new post
  const addPostHandler = useCallback(async (data: PostProps) => {
    try {
      const response = await fetch(BaseURL, {
        method: "POST",
        body: JSON.stringify({ author: data.author, content: data.body }),
        headers: { "Content-Type": "application/json" },
      });

      const responseJson: ApiResponse<TweetData> = await response.json();

      if (responseJson.status === "SUCCESS" && responseJson.data) {
        const newPostData = {
          id: responseJson.data._id,
          body: responseJson.data.content,
          author: responseJson.data.author,
        };
        setPostsList((prev) => [newPostData, ...prev]);
        onStopPosting();
      } else {
        newPostFormErrorsRef.current?.addApiResponseMessages(responseJson.messages);
        throw new Error(responseJson.messages.join(", "));
      }
    } catch (err) {
      console.error("Error posting data:", (err as Error).message);
    }
  }, [onStopPosting]);

  // Loading and Error States
  const Loading = () => (
    <div style={{ width: "90%", textAlign: "center", color: "white" }}>
      <h2>Loading posts...</h2>
    </div>
  );

  const ErrorMessage = ({ message }: { message: string }) => (
    <div style={{ width: "90%", textAlign: "center", color: "red" }}>
      <h2>Error: {message}</h2>
    </div>
  );

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onSubmit={addPostHandler} ref={newPostFormErrorsRef} />
        </Modal>
      )}

      <ul className={posts}>
        {postsList.length > 0 ? (
          postsList.map((p, idx) => <Post key={`id_${idx+1}`} author={p.author} body={p.body} />)
        ) : (
          <div style={{ width: "90%", textAlign: "center", color: "white" }}>
            <h2>There are no posts yet</h2>
          </div>
        )}
      </ul>

      <JSONDataViewer metadata={postsList} title="Post Metadata" />
    </>
  );
};

export default PostsListV11;

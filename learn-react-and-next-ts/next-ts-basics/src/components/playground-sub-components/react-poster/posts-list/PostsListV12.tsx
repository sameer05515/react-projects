import React, { useRef, useCallback, useState, useEffect } from "react";
import Post, { PostProps } from "../post/Post";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import NewPost, { FormErrorsHandle } from "../new-post/NewPostWithCustomFormV4";
import Modal from "@/components/common/modal-overlay/ModalV2";
import JSONDataViewer from "@/components/common/JSONDataViewer";
import { useTweetsAPIFetch as useFetch, ApiResponse } from "@/common/hooks/useTweetsAPIFetch";

// Type for Tweet data coming from the API
interface TweetData {
  _id: string;
  content: string;
  author: string;
}

const BaseURL = "http://127.0.0.1:3003/tweets/v2";

type PostsListProps = {
  isPosting: boolean;
  onStopPosting: () => void;
};

const PostsListV12 = ({ isPosting, onStopPosting }: PostsListProps) => {
  const { GLOBAL_APPLICATION_STYLES: { "post-list-container": posts } } = useGlobalStyles();
  const newPostFormErrorsRef = useRef<FormErrorsHandle>(null);

  // Use the useFetch hook for fetching posts
  const { data: fetchedPosts, error, isLoading } = useFetch<TweetData[]>(BaseURL);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postsList, setPostsList] = useState<PostProps[]>([]);

  // Synchronize fetched posts with local state
  useEffect(() => {
    if (fetchedPosts) {
      const formattedPosts = fetchedPosts.map((d) => ({
        id: d._id,
        body: d.content,
        author: d.author,
      }));
      setPostsList(formattedPosts);
    }
  }, [fetchedPosts]);

  const addPostHandler = useCallback(async (data: PostProps) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(BaseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: data.author, content: data.body }),
      });

      const responseJson: ApiResponse<TweetData> = await response.json();

      if (responseJson.status === "SUCCESS" && responseJson.data) {
        const newPostData: PostProps = {
        //   id: responseJson.data._id,
          body: responseJson.data.content,
          author: responseJson.data.author,
        };

        // Update the posts list with the new post
        setPostsList((prevPosts) => [newPostData, ...prevPosts]);
        onStopPosting(); // Close the modal
      } else {
        newPostFormErrorsRef.current?.addApiResponseMessages(responseJson.messages);
        throw new Error(responseJson.messages.join(", "));
      }
    } catch (err) {
      console.error("Error posting data:", (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }, [onStopPosting]);

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
          <NewPost onSubmit={addPostHandler} ref={newPostFormErrorsRef} />
        </Modal>
      )}

      <ul className={posts}>
        {postsList.length > 0 ? (
          postsList.map((p, idx) => <Post key={`id_${idx + 1}`} author={p.author} body={p.body} />)
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

export default PostsListV12;

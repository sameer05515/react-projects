import React, { useRef, useCallback, useState, useEffect } from "react";
import Post, { PostProps } from "../post/Post";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import NewPost, { FormErrorsHandle } from "../new-post/NewPostWithCustomFormV4";
import Modal from "@/components/common/modal-overlay/ModalV2";
import JSONDataViewer from "@/components/common/JSONDataViewer";
import { useApiRequest } from "@/common/hooks/api-requests/useApiRequestV7";
import { ApiResponse } from "@/common/hooks/useTweetsAPIFetch";

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
  const {
    GLOBAL_APPLICATION_STYLES: { "post-list-container": posts },
  } = useGlobalStyles();
  const newPostFormErrorsRef = useRef<FormErrorsHandle>(null);

  const { fetchData, overlayModal } = useApiRequest();
  const [postsList, setPostsList] = useState<PostProps[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    reload();
  }, [fetchData]);

  const reload = () => {
    fetchData(
      { url: BaseURL },
      (resp) => {
        console.log("Success Response: ", resp);
        const fetchedPosts = (resp as ApiResponse<TweetData[] | null>)?.data || [];
        const formattedPosts = fetchedPosts.map((d) => ({
          id: d._id,
          body: d.content,
          author: d.author,
        }));
        setPostsList(formattedPosts);
      },
      (resp) => {
        console.error("Error Response: ", resp);
      }
    );
  };

  const addPostHandler = useCallback(
    (data: PostProps) => {
      setIsSubmitting(true);
      fetchData(
        {
          url: BaseURL,
          options: {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: { author: data.author, content: data.body },
          },
        },
        (resp) => {

          //ApiResponse<TweetData>
          const responseJson= (resp as ApiResponse<TweetData | null>);

          if (responseJson.status === "SUCCESS" && responseJson.data) {
            const newPostData: PostProps = {
              // id: responseJson.data._id,
              body: responseJson.data.content,
              author: responseJson.data.author,
            };
            setPostsList((prevPosts) => [newPostData, ...prevPosts]);
            onStopPosting(); // Close the modal
          } else {
            newPostFormErrorsRef.current?.addApiResponseMessages(
              responseJson.messages
            );
            // throw new Error(responseJson.messages.join(", "));
          }
        },
        (errorResp) => {
          console.error("Error posting data:", errorResp.messages.join(", "));
        }
      ).finally(() => {
        setIsSubmitting(false);
      });
    },
    [fetchData, onStopPosting]
  );

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onSubmit={addPostHandler} ref={newPostFormErrorsRef} />
        </Modal>
      )}

      {overlayModal}

      <ul className={posts}>
        {postsList.length > 0 ? (
          postsList.map((p, idx) => (
            <Post key={`id_${idx + 1}`} author={p.author} body={p.body} />
          ))
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

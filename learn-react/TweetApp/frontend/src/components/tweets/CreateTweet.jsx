import React, { useState } from "react";
import GlobalConstants from "../../common/globalConstants";
import EditableLabel from "../common/EditableLabel";
import { toast } from "react-toastify";

function CreateTweet({ onTweetCreated }) {
  const [content, setContent] = useState("");
  const BASE_URL = GlobalConstants.tweetsApplicationBaseURL;

  const handleCreateTweet = async (updatedText) => {    
    if (!updatedText || updatedText.trim() === "") {
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/tweets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: updatedText }),
      });

      if (response.ok) {
        const newTweet = await response.json();
        onTweetCreated(newTweet);
        setContent("");
        toast.success(`Successfully created tweet : ${JSON.stringify(newTweet)}`);
      }
    } catch (error) {
      console.error("Error creating tweet:", error);
      toast.error(`Error creating tweet: ${error}`);
    }
  };

  const handleCommentBlur = (updatedText) => {
    if (updatedText.trim() === "") {
      return;
    }
    handleCreateTweet(updatedText);
  };

  return (
    <div>
      {/* <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your tweet content"
      />
      <button onClick={handleCreateTweet}>Create Tweet</button> */}

      <EditableLabel
        text={content}
        postUpdateClick={handleCommentBlur}
        placeholder="Enter your tweet content"
        editMode={false}
        submitButtonText="Create Tweet"
        flushSavedText={true}
      />
    </div>
  );
}

export default CreateTweet;

import { useState } from "react";
import MainHeader from "../header/MainHeader";
import PostsList from "../posts-list/PostsListV13";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";

const AppWithPostListAndCustomFormV10 = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main },
  } = useGlobalStyles();
  const [showModal, setShowModal] = useState(false);
  const toggleModalVisibility = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <div className={main}>
        <h1>AppWithPostListAndCustomFormV10</h1>
        <h2>with hook 'useApiRequestV7'</h2>
        <MainHeader onCreatePost={toggleModalVisibility} />
        <PostsList
          isPosting={showModal}
          onStopPosting={toggleModalVisibility}
        />
      </div>
    </>
  );
};

export default AppWithPostListAndCustomFormV10;

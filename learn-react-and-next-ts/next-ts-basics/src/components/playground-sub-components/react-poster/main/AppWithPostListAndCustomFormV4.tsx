import { useState } from "react";
import MainHeader from "../header/MainHeader";
import PostsList from "../posts-list/PostsListV7";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";

const AppWithPostListAndCustomFormV4 = () => {
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
        <MainHeader onCreatePost={toggleModalVisibility} />
        <PostsList
          isPosting={showModal}
          onStopPosting={toggleModalVisibility}
        />
      </div>
    </>
  );
};

export default AppWithPostListAndCustomFormV4;

import PostsList from "../posts-list/PostsListV4";
import { useGlobalStyles } from '@/common/hooks/useGlobalStyles';

const AppWithPostListAndCustomForm = () => {
    const {GLOBAL_APPLICATION_STYLES:{main}}= useGlobalStyles();
  return (
    <div className={main}>
        <PostsList/>
    </div>
  );
};

export default AppWithPostListAndCustomForm;

import PostsList from "../posts-list/PostsListV2";
import { useGlobalStyles } from '@/common/hooks/useGlobalStyles';

const AppWithPostListAndForm = () => {
    const {GLOBAL_APPLICATION_STYLES:{main}}= useGlobalStyles();
  return (
    <div className={main}>
        <PostsList/>
    </div>
  );
};

export default AppWithPostListAndForm;

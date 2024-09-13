import PostsList from "../posts-list/PostsListV5";
import { useGlobalStyles } from '@/common/hooks/useGlobalStyles';

const AppWithPostListAndCustomFormV2 = () => {
    const {GLOBAL_APPLICATION_STYLES:{main}}= useGlobalStyles();
  return (
    <div className={main}>
        <PostsList/>
    </div>
  );
};

export default AppWithPostListAndCustomFormV2;

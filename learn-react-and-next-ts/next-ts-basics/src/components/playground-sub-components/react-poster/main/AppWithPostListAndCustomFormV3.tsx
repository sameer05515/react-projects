import PostsList from "../posts-list/PostsListV6";
import { useGlobalStyles } from '@/common/hooks/useGlobalStyles';

const AppWithPostListAndCustomFormV3 = () => {
    const {GLOBAL_APPLICATION_STYLES:{main}}= useGlobalStyles();
  return (
    <div className={main}>
        <PostsList/>
    </div>
  );
};

export default AppWithPostListAndCustomFormV3;

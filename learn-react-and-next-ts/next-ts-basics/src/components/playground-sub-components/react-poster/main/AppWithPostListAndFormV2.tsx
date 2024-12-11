import PostsList from "../posts-list/PostsListV3";
import { useGlobalStyles } from '@/common/hooks/useGlobalStyles';

const AppWithPostListAndFormV2 = () => {
    const {GLOBAL_APPLICATION_STYLES:{main}}= useGlobalStyles();
  return (
    <div className={main}>
        <PostsList/>
    </div>
  );
};

export default AppWithPostListAndFormV2;

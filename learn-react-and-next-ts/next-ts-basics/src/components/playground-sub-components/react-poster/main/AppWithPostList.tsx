import PostsList from "../posts-list/PostsList";
import { useGlobalStyles } from '@/common/hooks/useGlobalStyles';

const AppWithPostsList = () => {
    const {GLOBAL_APPLICATION_STYLES:{main}}= useGlobalStyles();
  return (
    <div className={main}>
        <PostsList/>
    </div>
  );
};

export default AppWithPostsList;

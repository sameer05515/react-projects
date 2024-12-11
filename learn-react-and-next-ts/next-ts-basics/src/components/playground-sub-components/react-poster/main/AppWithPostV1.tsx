import React from "react";
import Post from "../post/Post";
import { useGlobalStyles } from '@/common/hooks/useGlobalStyles'; 

const AppWithPostV1 = () => {
  const {GLOBAL_APPLICATION_STYLES:{
    main
  }}= useGlobalStyles();
  return (
    <div className={main}>
      <Post author={"Premendra Kumar"} body={"Practice makes a man perfect!!"} />
    </div>
  );
};

export default AppWithPostV1;

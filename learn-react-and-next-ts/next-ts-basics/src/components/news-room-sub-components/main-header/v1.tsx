import Link from "next/link";
import React from "react";

const MainHeader = () => {
  return (
    <div>
      <span style={{padding:'10px', margin:'10px'}}>
        <Link href={"/news-room"}>
          <b>Home</b>
        </Link>
      </span>
      <span style={{padding:'10px', margin:'10px'}}>
        <Link href={"/news-room/news"}>
          <b>News</b>
        </Link>
      </span>
    </div>
  );
};

export default MainHeader;

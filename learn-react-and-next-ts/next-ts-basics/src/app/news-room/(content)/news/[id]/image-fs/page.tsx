import { DUMMY_NEWS } from "@/lib/news-room/dummy-news";
import { notFound } from "next/navigation";
import React from "react";

const FullScreenImagePage = ({ params }: { params: { id: string } }) => {
  const newsSlug = params.id;
  const newsItem = DUMMY_NEWS.find((ni) => ni.slug === newsSlug);

  if (!newsItem) {
    notFound(); // Ensure handling of news not found
  }
  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
};

export default FullScreenImagePage;

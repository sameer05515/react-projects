'use client';
import { DUMMY_NEWS } from "@/lib/news-room/dummy-news";
import { notFound, useRouter } from "next/navigation";
import React from "react";

const InterceptedFSImagePage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  
  const newsSlug = params.id;
  const newsItem = DUMMY_NEWS.find((ni) => ni.slug === newsSlug);

  if (!newsItem) {
    notFound(); // Ensure handling of news not found
  }

  return (
    <>
      <div className="modal-backdrop" onClick={router.back} />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
};

export default InterceptedFSImagePage;

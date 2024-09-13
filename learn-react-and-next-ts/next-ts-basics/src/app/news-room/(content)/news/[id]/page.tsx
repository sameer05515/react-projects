import { DUMMY_NEWS } from "@/lib/news-room/dummy-news";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

const NewsDetails = ({ params }: { params: { id: string } }) => {
  const newsSlug = params.id;
  const newsItem = DUMMY_NEWS.find((ni) => ni.slug === newsSlug);
  if (!newsItem) {
    notFound(); // Ensure handling of news not found
  }
  return (
    <article className="news-article">
      <header>
        <Link href={`/news-room/news/${newsSlug}/image-fs`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
};

export default NewsDetails;

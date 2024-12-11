// import { DUMMY_NEWS } from "@/lib/news-room/dummy-news";
import Link from "next/link";
import React from "react";

type NewsProps = {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  content: string;
};

type NewsListProps = {
  news: NewsProps[];
};

const NewsList = ({ news }:NewsListProps) => {
  return (
    <ul className="news-list">
        {
            news.map((newsItem)=>(
                <li key={`${newsItem.id}-${newsItem.slug}`}>
                    <Link href={`/news-room/news/${newsItem.slug}`}>
                        <img src={`/images/news/${newsItem.image}`}
                        alt={newsItem.title}/>
                        <span>{newsItem.title}</span>
                    </Link>
                </li>
            ))
        }
    </ul>
  )
};

export default NewsList;

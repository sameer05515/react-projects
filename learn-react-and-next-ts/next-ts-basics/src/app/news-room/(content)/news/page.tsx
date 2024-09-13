import Link from "next/link";
import React from "react";
import { DUMMY_NEWS } from "@/lib/news-room/dummy-news";
import NewsList from "@/components/news-room-sub-components/news-list/NewsListV1";

const independenceDayNews: string[] = [
  "Headline: India Gains Independence, Ends British Rule After 200 Years",
  "Subheadline: A New Dawn for India as the Nation Celebrates Freedom",
  "Dateline: New Delhi, 15th August 1947",
  " ",
  "India has awoken to a new era of freedom as the country officially gained independence from British rule today. After nearly two centuries of colonial domination, the Indian subcontinent has taken its first steps as a free nation.",
  " ",
  "At the stroke of midnight, the first Prime Minister of India, Jawaharlal Nehru, delivered his historic 'Tryst with Destiny' speech, marking the end of British rule and the birth of an independent India. In his address, Nehru said, 'At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom.'",
  " ",
  "Large crowds gathered in the capital, New Delhi, as the Indian national flag was raised for the first time at the Red Fort. People from all walks of life, including freedom fighters, politicians, and citizens, celebrated the momentous occasion. Joyous processions and celebrations erupted across the country, from the streets of Bombay to the shores of Madras.",
  " ",
  "However, the road to independence was not without its challenges. The partition of India and Pakistan has created waves of uncertainty and displacement for millions. As independence was announced, so too was the creation of the new nation of Pakistan, leading to the largest mass migration in history, as Hindus and Muslims cross the new borders.",
  " ",
  "Despite the complexities and uncertainties, today's events symbolize hope, unity, and the promise of a brighter future for the Indian people. India's leaders, including Mahatma Gandhi, who played a crucial role in the non-violent struggle for freedom, have called for peace and unity during this historic transition.",
  " ",
  "As the world watches, India begins its journey as a sovereign nation, with challenges ahead, but also with the resolve and spirit of a people who have fought long and hard for their freedom.",
];

const NewsPage = () => {
  return (
    <>
      <h1>News Page</h1>
      <NewsList news={DUMMY_NEWS}/>
      {/* <ul className="news-list">
        {DUMMY_NEWS.map((newsItem) => (
          <li key={newsItem.id}>
            <Link href={`/news-room/news/${newsItem.slug}`}>
              <img
                src={`/images/news/${newsItem.image}`}
                alt={newsItem.title}
              />
              <span>{newsItem.title}</span>
            </Link>
          </li>
        ))}
      </ul> */}
    </>
  );
};

const NewsListV2 = () => {
  return (
    <>
      <h1>News Page</h1>
      <ul className="news-list">
        {independenceDayNews.map((n, idx) => (
          <li>
            <Link href={`/news-room/news/news_for_${idx + 1}`}>{n}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const NewsListV1 = () => {
  return (
    <div>
      {independenceDayNews.map((n, idx) => (
        <p>
          <Link href={`/news-room/news/news_for_${idx + 1}`}>{n}</Link>
        </p>
      ))}
    </div>
  );
};

export default NewsPage;

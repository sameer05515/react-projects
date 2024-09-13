import NewsList from "@/components/news-room-sub-components/news-list/NewsListV1";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news-room/news";
import Link from "next/link";
import React from "react";

const FilterredNewsPage = ({ params }: { params: { filter: string[] } }) => {
  const filter = params.filter;
  console.log(filter);
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  let news: {
    id: string;
    slug: string;
    title: string;
    image: string;
    date: string;
    content: string;
  }[] = [];
  let links = getAvailableNewsYears();

  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(+selectedYear);
    links = getAvailableNewsMonths(+selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(+selectedYear, +selectedMonth);
    links = [];
  }

  let newsContent = <p>No news found for the selected period</p>;

  if (!params.filter || params.filter.length==0){
    newsContent= <p>Please select some period!</p>

  } else if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  if (
    params?.filter?.length > 2 ||
    (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
    (selectedMonth &&
      !getAvailableNewsMonths(+selectedYear).includes(+selectedMonth))
  ) {
    throw new Error("Invalid Filter!: "+params.filter.join(' / '));
  }

  return (
    <>
      {/* <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify({filter,news}, null, 2)}</pre> */}
      <header id="archive-header">
        <nav>
          {selectedYear && (
            <ul>
              <li>{selectedYear}</li>
            </ul>
          )}
          {selectedMonth && (
            <ul>
              <li key={new Date().toString()}>{selectedMonth}</li>
            </ul>
          )}
          <ul>
            {links.map((link, idx) => {
              const href = selectedYear
                ? `/news-room/archive/${selectedYear}/${link}`
                : `/news-room/archive/${link}`;

              return (
                <li key={`id_${idx+1}_${new Date().toString()}`}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
  // const news = getNewsForYear();
  // return <NewsList news={news} />;
};

export default FilterredNewsPage;

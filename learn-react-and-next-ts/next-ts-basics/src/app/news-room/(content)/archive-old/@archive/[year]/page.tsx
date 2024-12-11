import NewsList from "@/components/news-room-sub-components/news-list/NewsListV1";
import { getNewsForYear } from "@/lib/news-room/news";
import React from "react";

const FilterredNewsPage = ({ params }: { params: { year: number } }) => {
  const news = getNewsForYear(params.year);
  return <NewsList news={news} />;
};

export default FilterredNewsPage;

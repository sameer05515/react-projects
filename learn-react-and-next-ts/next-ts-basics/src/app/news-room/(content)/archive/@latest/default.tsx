import NewsList from '@/components/news-room-sub-components/news-list/NewsListV1';
import { getLatestNews } from '@/lib/news-room/news'
import React from 'react'

const LatestPage = () => {

  const latestNews= getLatestNews();
  return (
    <>
    <h2>Latest News</h2>
    <NewsList news={latestNews}/>
    </>
  )
}

export default LatestPage
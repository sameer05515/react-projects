import NewsList from '@/components/news-room-sub-components/news-list/NewsListV1';
import { getLatestNewsForOld } from '@/lib/news-room/news'
import React from 'react'

const LatestPage = () => {

  const latestNews= getLatestNewsForOld();
  return (
    <>
    <h2>Latest News</h2>
    <NewsList news={latestNews}/>
    </>
  )
}

export default LatestPage
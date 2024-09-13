import React from 'react';
import Post, { PostProps } from '../post/Post';
import { useGlobalStyles } from '@/common/hooks/useGlobalStyles'; 

type PostsListProps={
   data?: PostProps[];
}

const PostsList = ({data=[]}:PostsListProps) => {
    const {GLOBAL_APPLICATION_STYLES:{"post-list-container":posts}} = useGlobalStyles();
  return (
    <ul className={posts}>
      <Post author='Premendra Kumar' body='Practice makes a man perfect'/>
      <Post author='Vandana Kumari' body='I will become a teacher in next birth'/>
    </ul>
  )
}

export default PostsList
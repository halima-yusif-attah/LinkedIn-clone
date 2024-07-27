'use client'

import { IPostDocument } from '@/modules/post'
import Post from './Post'


function PostFeed({ posts }: { posts: IPostDocument[] } ) {
  
  return (
    <div className="space-y-2 pb-20">
      {posts.map((post) => (
        <div key={post.id}  className="">
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}

export default PostFeed
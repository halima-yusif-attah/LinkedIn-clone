'use client'

import { IPostDocument } from '@/modules/post'
import Post from './Post'


function PostFeed({ posts }: { posts: IPostDocument[] } ) {
  // console.log('posts- postfeed', posts.length, posts)
  
  return (
    <div className="space-y-2 pb-20">
      {posts.map((post) => (
        <div key={post.id}  className="" onClick={() => console.log("post.id", post.userDB.userId)}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}

export default PostFeed
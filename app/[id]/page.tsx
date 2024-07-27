import getAllPostAction from '@/actions/getAllPostAction';
import PostFeed from '@/components/PostFeed';
import UserInformation from '@/components/UserInformation';
import { db } from '@/firebase/db';
import { IPostDocument } from '@/modules/post';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react'

async function DynamicPage() {
    const id = useRouter().query.id; // get the id from the query parameters
  
    const posts = await getAllPostAction();
    const userPosts = posts.filter((post) => post.userDB?.userId === id);

  
  

    return (
      <main className="grid grid-cols-8 mt-5 sm:px-5">
        <section className="hidden md:inline md:col-span-2">
          <UserInformation posts={userPosts} />
        </section>

        <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
          {/* <SignedIn>
            <PostForm />
          </SignedIn> */}

          <PostFeed posts={userPosts} />
        </section>
      </main>
    );
}

export default DynamicPage;
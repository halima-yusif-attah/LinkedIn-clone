'use client'

import { getAllFollowers, IFollowers } from "@/actions/getAllFollowers"
import { useFollowerContext } from "@/context/FollowerContext";
import { IPostDocument } from "@/modules/post";
import { IUser } from "@/types/user";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";


function Widget() {
  const { user } = useUser();
  const { followed, setFollowed, followers, author } =
    useFollowerContext();
    

  console.log("followers - widget", followers);
  console.log("user - Widget", user);

   if (!user) return null;
  
   console.log("Author - widget", author);

  return (
    <div className="ml-6 h-[790px] max-h-[790px] bg-white rounded-lg">
      <div className="flex flex-col gap-2">
        <Image
          src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png"
          width={200}
          alt="Post Image"
          height={200}
          className="w-full mx-auto mb-4"
          unoptimized
        />

        {author && (
          <>
            <h2 className="text-center font-medium text-xl">Followers</h2>

            <Link href="/user.id" className="border-b border-gray-200">
              {followers.map((follower) => (
                <div key={follower.userId} className="">
                  <p>{follower.firstName}</p>
                </div>
              ))}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Widget

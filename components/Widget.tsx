'use client'

import { getAllFollowers, IFollowers } from "@/actions/getAllFollowers"
import { useFollowerContext } from "@/context/FollowerContext";
import { IPostDocument } from "@/modules/post";
import { IUser } from "@/types/user";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

function Widget({ post }: { post: IPostDocument }) {
  const { user } = useUser();
  const { followed, setFollowed, followers, setFollowers, author } =
    useFollowerContext();
    

  console.log("followers - widget", followers);
  console.log("user - Widget", user);

   if (!user) return null;
  
   console.log("Author - widget", author);

  return (
    <div className="ml-6 h-[790px] max-h-[790px] bg-white rounded-lg">
      <div className="flex flex-col gap-2">
        <h2 className="text-center font-medium text-xl">Followers</h2>
        <p>hello</p>
        {author && 
        <Link href="/user.id" className="border-b border-gray-200">
          {followers.map((follower) => (
            <div key={follower.userId} className="">
              <p>{follower.firstName}</p>
            </div>
          ))}
        </Link>
}
      </div>
    </div>
  );
}

export default Widget

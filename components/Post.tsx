'use client'


import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import deletePostAction from '@/actions/deletePostAction';
import Image from 'next/image';
import PostOptions from './PostOptions';
import { Badge } from './ui/badge';
import ReactTimeago from "react-timeago";
import { toast } from 'sonner';
import { IPostDocument } from '@/modules/post';
import { useEffect, useState } from 'react';
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/db';
import { getAllFollowers, IFollowers } from '@/actions/getAllFollowers';
import { IUser } from '@/types/user';
import { useFollowerContext } from '@/context/FollowerContext';


function Post({ post }: { post: IPostDocument }) {

   const { user } = useUser();
   const { followed, setFollowed, followers, setFollowers } =
     useFollowerContext();

   if (!user) return null;

   const isAuthor = user?.id === post.userDB.userId;
   console.log("id-post", post.id);
   console.log("followed", followed);
   console.log("post.userDB.userId", post.id);

   const userDB: IUser = {
     userId: user.id,
     userImage: user?.imageUrl,
     firstName: user?.firstName || "",
     lastName: user?.lastName || "",
   };

   const followOrUnfollow = async (followingUserId: string) => {
     if (!user?.id) {
       throw new Error("User not authenticated");
     }
     console.log("user -post", user);
     console.log("followerUserId -post", followingUserId);

     const originalFollowed = followed;
     const originalFollowers = followers;

     const newFollowers = followed
       ? followers.filter((follower) => follower.userId !== user.id)
       : [...followers, userDB];

     setFollowed(!followed);
     setFollowers(newFollowers);

     try {
       const postRef = doc(db, `users/${followingUserId}`);

       await setDoc(
         postRef,
         {
           postUserId: post.userDB.userId,
           followers: followed ? arrayRemove(userDB) : arrayUnion(userDB),
         },
         { merge: true }
       );

       const postDoc = await getDoc(postRef);
       const postData = postDoc.data();

       console.log("postData", postData);
       
       if (postData) {
         setFollowers(postData.followers || []);
       } else {
         throw new Error("Failed to fetch followers");
       }
     } catch (error) {
       setFollowed(originalFollowed);
       setFollowers(originalFollowers);
       throw new Error(`Failed to follow or unfollow: ${error}`);
     }
   };




  return (
    <div className="bg-white rounded">
      <div className="p-4 flex space-x-2">
        <div>
          <Avatar>
            <AvatarImage src={post.userDB?.userImage} />
            <AvatarFallback>
              {post.userDB?.firstName?.charAt(0)}
              {post.userDB?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex justify-between flex-1">
          <div>
            <p className="font-semiBold">
              {post.userDB?.firstName} {post.userDB?.lastName}
              {isAuthor && (
                <Badge className="ml-2" variant="secondary">
                  Author
                </Badge>
              )}
            </p>
            <p className="text-xs text-gray-400">
              {!isAuthor && (
                <Button
                  className="mt-1"
                  variant="outline"
                  onClick={() => {
                    const promise = followOrUnfollow(post.userDB.userId);
                    // Toast Notification
                    console.log("promise", promise);
                    toast.promise(promise, {
                      loading: followed ? "Unfollowing..." : "following...",
                      success: followed
                        ? "unfollowed successfully..."
                        : "following successful",
                      error: followed
                        ? "Failed to follow"
                        : "Failed to unfollow",
                    });
                  }}
                >
                 { followed? "following" : "follow"}
                </Button>
              )}
            </p>
          </div>

          {isAuthor && (
            <Button
              variant="outline"
              onClick={() => {
                const promise = deletePostAction(post.id);
                // Toast Notification
                toast.promise(promise, {
                  loading: "Deleting Post...",
                  success: "Post Deleted Successfully",
                  error: "Error Deleting Post",
                });
              }}
            >
              <Trash2 />
            </Button>
          )}
        </div>
      </div>

      <div>
        <p className="px-4 pb-2 mt-2">{post.text}</p>

        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            width={500}
            alt="Post Image"
            height={500}
            className="w-full mx-auto"
          />
        )}
      </div>

      <PostOptions post={post} />
    </div>
  );
}

export default Post
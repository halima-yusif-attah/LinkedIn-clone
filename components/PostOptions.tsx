'use client'

import { SignedIn, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { MessageCircle, Repeat2, Send, ThumbsUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import CommentFeed from "./CommentFeed"
import CommentForm from "./CommentForm"
import { toast } from "sonner"
import { IPostDocument } from "@/modules/post"
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase/db"
import createRepostAction from "@/actions/createRepostAction";

function PostOptions({ post }: { post : IPostDocument }) {
  const { user } = useUser();
  const [isCommentOpen, setIsCommentOpen]  = useState(false)
  const [liked, setLiked]  = useState(false)
  const [likes, setLikes] = useState(post.likes);
  
  useEffect(() => {
    if (user?.id && post.likes?.includes(user.id)) {
      setLiked(true);
    }
  }, [post, user])



  const likedOrUnlikePost = async () => {
    if (!user?.id) {
      throw new Error("User not authenticated")
    }

    const originalLiked = liked;
    const originalLikes = likes;

    const newLikes = liked ? likes?.filter((like) => like !== user.id) : [...(likes ?? []), user.id]

    setLiked(!liked)
    setLikes(newLikes)

    try {
    const postRef = doc(db, `posts/${user.id}/files/${post.id}`);
    await updateDoc(postRef, {
      likes: liked ? arrayRemove(user.id) : arrayUnion(user.id),
    });
    
    const postDoc = await getDoc(postRef);
    const postData = postDoc.data();

    if (postData) {
      setLikes(postData.likes || []);
    } else {
      setLiked(originalLiked);
      setLikes(originalLikes);
      throw new Error("Failed to fetch likes");
    }
  } catch (error: any) {
    setLiked(originalLiked);
    setLikes(originalLikes);
    throw new Error("Failed to like or unlike post", error);
  }

  }

  

  return (
    <div>
      <div className="flex justify-between p-4">
        <div className="">
          {likes && likes.length > 0 && (
            <p className="text-ms text-gray-500 cursor-pointer hover:underline">
              {likes.length} like(s)
            </p>
          )}
        </div>

        <div className="">
          {post?.comments && post.comments.length > 0 && (
            <p
              onClick={() => setIsCommentOpen(!isCommentOpen)}
              className="text-ms text-gray-500 cursor-pointer hover:underline"
            >
              {post.comments.length} comments
            </p>
          )}
        </div>
      </div>

      <div className="flex p-2 justify-between px-2 border-t">
        <Button
          variant="ghost"
          className="postButton"
          onClick={() => {
            const promise = likedOrUnlikePost;
            //Toast Notification
            toast.promise(promise, {
              loading: liked ? "Unliking post..." : "Liking post...",
              success: liked ? "Post unliked" : "Post liked successfully",
              error: liked ? "Failed to unlike post" : "Failed to like post",
            });
          }}
        >
          {/* if user has liked the post, show filled thumbs up icon */}
          <ThumbsUpIcon
            className={cn("mr-1", liked && "text-[#4bb1c2] fill-[#4bb1c2]")}
          />
          <>Like</>
        </Button>

        <Button
          variant="ghost"
          className="postButton"
          onClick={() => setIsCommentOpen(!isCommentOpen)}
        >
          {/* if user has liked the post, show filled thumbs up icon */}
          <MessageCircle
            className={cn("mr-1", isCommentOpen && "text-[#4bb1c2] fill-[#4bb1c2]")}
          />
          Comment
        </Button>

        <Button variant="ghost" className="postButton" onClick={() => {
          const promise = createRepostAction(post.id);
          
          toast.promise(promise, {
            loading: "Reposting",
            success: "Reposted successfully",
            error: "Failed to repost"
          });
        }}>
          <Repeat2 className="mr-1" />
          Repost
        </Button>

        <Button variant="ghost" className="postButton">
          <Send className="mr-1" />
          Send
        </Button>
      </div>

      {isCommentOpen && (
        <div className="p-4">
          <SignedIn>
            <CommentForm postId={post.id} />
          </SignedIn>

          <CommentFeed post={post} />
        </div>
      )}

      
    </div>
  );
}

export default PostOptions
import { db } from "@/firebase/db";
import { currentUser } from "@clerk/nextjs/server";
import { deleteDoc, doc } from "firebase/firestore";

export async function DeleteFollower (followingUserId: string) {
    const user = await currentUser();
    if(!user) return;

    try {
         const followerRef =  doc(db, `users/${user.id}/follower/${followingUserId}`)
        await deleteDoc(followerRef).then(() => console.log('unfollowed successfully'))
    } catch (error) {
        throw new Error(`unfollow failed: ${error}`);
    }
}
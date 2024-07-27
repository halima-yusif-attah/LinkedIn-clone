import { db } from "@/firebase/db";
import { currentUser } from "@clerk/nextjs/server";
import { addDoc, collection } from "firebase/firestore";

export async function AddFollowers( followerUserId: string ) {
    const user = await currentUser();

    if (!user) return;


    const followers = {
      
        follower: followerUserId,
        createdAt: new Date(),
        // updatedAt: new Date()
    }

    try {
        await addDoc(collection(db, `users/${user.id}/followers`), followers)
        return {message: "following successfully"}
    } catch (error) {
        throw new Error(`Error while following ${error}`)
    }
}






export async function AddFollowings( followingUserId: string ) {
    const user = await currentUser();

    if (!user) return;


    const followings = {
        // follower: user.id,
        following: followingUserId,
        createdAt: new Date(),
        // updatedAt: new Date()
    }

    try {
        await addDoc(collection(db, `users/${user.id}/followings`), followings)
        
    } catch (error) {
        throw new Error(`Error while adding following ${error}`)
    }
}
import { db } from "@/firebase/db";
import { IUser } from "@/types/user";
// import { IFollowers, IFollowersBase } from "@/modules/followers";
import { auth, currentUser } from "@clerk/nextjs/server";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export interface IFollowers {
    followers: IUser[];
    postUserId: string;
}

export async function getAllFollowers () {
    const user  = await currentUser();
    console.log('user -get', user)

    try {
    const querySnapshot = await getDoc(doc(db, "users"));
    console.log('querySnapshot -get', querySnapshot)

     if (querySnapshot.exists()) {
    console.log("Document data:", querySnapshot.data());
  } else {
    console.log("No such document!");
  }


    const userData = querySnapshot.data() as IFollowers; 
    console.log('postuid - get', userData.postUserId)

    return {
  followers: userData.followers || [],
  postUserId: userData.postUserId || '', 
};
  
  } catch (error) {
    throw new Error(`Error while getting all followers ${error}`)
  }
  
}
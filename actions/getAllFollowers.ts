import { db } from "@/firebase/db";
import { IUser } from "@/types/user";
import { auth, currentUser } from "@clerk/nextjs/server";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export interface IFollowers {
    followers: IUser[];
    postUserId: string;
}

export async function getAllFollowers () {
    const user  = await currentUser();

    try {
    const querySnapshot = await getDoc(doc(db, "users"));

     if (querySnapshot.exists()) {
    console.log("Document data:", querySnapshot.data());
  } else {
    console.log("No such document!");
  }


    const userData = querySnapshot.data() as IFollowers; 

    return {
  followers: userData.followers || [],
  postUserId: userData.postUserId || '', 
};
  
  } catch (error) {
    throw new Error(`Error while getting all followers ${error}`)
  }
  
}
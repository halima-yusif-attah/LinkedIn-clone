import { db } from "@/firebase/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { collection, getDocs } from "firebase/firestore";



export async function getAllFollowings () {
    auth().protect();
    const user  = await currentUser();

    try {
    const querySnapshot = await getDocs(collection(db, `users/${user?.id}/followings`));

  const followers = querySnapshot.docs.map(doc => doc.data())
  return followers;
  } catch (error) {
    throw new Error(`Error while getting all follwers ${error}`)
  }
  
}
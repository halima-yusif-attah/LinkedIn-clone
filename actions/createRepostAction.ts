"use server"

import { db } from "@/firebase/db";
import { currentUser } from "@clerk/nextjs/server";
import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { revalidatePath } from "next/cache";


// export default async function likePostAction( postId: string ) {
//     const user = await currentUser();

//     if (!user?.id) { throw new Error( 'User not authenticated')}

//     try {
//     const postRef = doc(db, `posts/${user.id}/files/${postId}`) 

//     await updateDoc(postRef, {
//         likes: arrayUnion(user?.id)
//     }) 
//     } catch (error) {
//         throw new Error(`Error while liking a posts: ${error}`)
//     }
 
// }


export default async function createRepostAction (postId: string) {
    const user = await currentUser();

    if (!user?.id) {
      throw new Error("User not authenticated")
    }

    try{
      const postRef = doc(db, `posts/${user.id}/files/${postId}`);
      const postDoc = await getDoc(postRef);
      const postData = postDoc.data();
      
      if (!postData) return;

    await updateDoc(postRef, {
      ...postData,
      updatedAt: serverTimestamp()
    });
    revalidatePath('/')

    } catch(error) {
      throw new Error("failed to repost" + error)
    }

}

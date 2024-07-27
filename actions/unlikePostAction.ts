import { db } from "@/firebase/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject } from "firebase/storage";



export default async function unLikePostAction( postId: string ) {
    const user = await currentUser();

    if (!user?.id) { throw new Error( 'User not authenticated')}

    try {
    const postRef = doc(db, `posts/${user.id}/files/${postId}/likes`) 

    await updateDoc(postRef, {
        likes: arrayRemove(user?.id)
    })
    console.log('Post unliked deleted!');
     
    } catch (error) {
        throw new Error(`Error while unliking a posts: ${error}`)
    }
 
}
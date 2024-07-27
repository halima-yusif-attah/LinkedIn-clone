'use server'

import { db, storage } from "@/firebase/db";
import { currentUser } from "@clerk/nextjs/server";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { revalidatePath } from "next/cache";

export default async function deletePostAction(postId: string) {
    const user = await currentUser();
    console.log('id-delete', postId);
    
    if (!user?.id) {
        alert("User not authenticated")
        return;
    }

    const postRef = ref(storage, `posts/${postId}`)
     
    if (!postRef) {
        throw new Error("Post not found")
    }

    try {
        
        await deleteObject(postRef).then(async () => {
            deleteDoc(doc(db, 'posts', postId))
        })
        revalidatePath('/');
        
    } catch (error) {
        throw new Error(`An errror occured while deleting the post ${error}`)
    }
}

 
"use server"

import { db, storage } from "@/firebase/db";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { revalidatePath } from "next/cache";


export default async function createPostAction(formData: FormData) {
  const user = await currentUser();
 

  if (!user) {
    throw new Error(`User not authenticated`)
  }

  const postInput = formData.get('postInput') as string;
  const image = formData.get('image') as File;
  let image_url: string | null = null;


  if (!postInput) {
    throw new Error(`post input is required`);
  }

  //define user
  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  }

  const docRef = await addDoc(collection(db, `posts`), {
  userDB,
  text: postInput,
  imageUrl: image_url, 
  createdAt: serverTimestamp()
});

const docId = docRef.id;
const imageRef = ref(storage, `posts/${docId}`);

try {
  
    const imageBuffer = await image.arrayBuffer();

    const uploadResult = await uploadBytes(imageRef, imageBuffer);
  
    image_url = await getDownloadURL(uploadResult.ref);
    
    if (image.size > 0) {
      await updateDoc(doc(db, "posts", docId), {
      id: docId,
      imageUrl: image_url,
    });
   
    }else {
      await updateDoc(doc(db, "posts", docId), {
      id: docId,
    });
    }
    revalidatePath('/')
    
} catch (error) {
  console.error(`Error during file upload or document update: ${error}`);
}

  revalidatePath('/')
}

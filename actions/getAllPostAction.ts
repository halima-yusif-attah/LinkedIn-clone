'use server'

import { db } from "@/firebase/db";
import { IPostDocument } from "@/modules/post";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default async  function getAllPostAction() {

  try {
    const querySnapshot = await getDocs(query(collection(db, `posts`), orderBy("createdAt", "desc")));
  const posts:IPostDocument[] = querySnapshot.docs.map(doc => {
    const data = doc.data() as IPostDocument;

    return {
      ...data,
    }
  })

  return posts;
  } catch (error) {
    throw new Error(`Error while getting all posts ${error}`)
  }
  
}




'use server'

// import { AddCommentRequestBody } from "@/app/api/posts/[post_id]/comments/route";
import { db } from "@/firebase/db";
import { ICommentBase } from "@/modules/comments";
// import { ICommentBase } from "@/mongodb/modules/comment";
// import { Post } from "@/mongodb/modules/post";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server"
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export default async function createCommentAction(
    postId: string,
    formData: FormData
) {
  const user = await currentUser()

  const commentInput = formData.get("commentInput") as string; 
 
  if (!postId) alert("Post id is required")
  if (!commentInput) throw new Error("Comment input is required")
  if (!user?.id) throw new Error("User not authenticated")

  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  }


  try {
    await updateDoc(doc(db, 'posts', postId), {
      comments: arrayUnion(
        {
          user: userDB,
          text: commentInput,
        }
      )
     
    })

    revalidatePath('/')
  } catch (error) {
    throw new Error(`An error occurred while adding  comment ${error}`)
  }

}

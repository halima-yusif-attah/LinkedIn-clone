import { IUser } from "@/types/user";
import { IComment, ICommentBase } from "./comments";
import { Timestamp } from "firebase/firestore";

export interface IPostBase {
    userDB: IUser;
    text: string;
    imageUrl?: string; 
    comments?: IComment[];
    likes?: string[];
}

export interface IPost extends IPostBase {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IPostMethods {
    likePost(userId?: string): Promise<void>;
    unlikePost(userId?: string): Promise<void>;
    commentOnPost(comment: ICommentBase): Promise<void>;
    getAllComments(): Promise<IComment[]>;
    removePost(): Promise<void>;
}

interface IPostStatics {
    getAllPosts(): Promise<IPostDocument[]>
}

export interface IPostDocument extends IPost, IPostMethods {}

export interface IPostModel extends IPostStatics {} 


import { IUser } from "@/types/user";


export interface ICommentBase {
    user: IUser;
    text: string;
}

export interface IComment extends ICommentBase {
    createdAt: Date;
    updatedAt: Date
}
 


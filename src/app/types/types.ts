import { FieldValue, Timestamp } from "firebase/firestore";
import { User } from "firebase/auth";

export type Activities = {
    id: string,
    type: "post_published" | "comment_added" | "post_updated" | "milestone",
    title: string,
    message: string,
    time: Timestamp | FieldValue,

}

export type Comment = {
    id?: string;
    postId: string,
    userId: string,
    username: string,
    commentText: string,
    author: string,
    replies?: Array<any>,
    createdAt: Timestamp | FieldValue,

}

export type Posts = {
    id?: number;
    dbID?: string;
    author: string;
    category: string;
    content?: string;
    createdAt?: string | Timestamp | number;
    excerpt: string;
    image?: string;
    likes?: number;
    readTime?: string;
    slug?: string;
    status?: string;
    tags?: string;
    title: string;
    updatedAt?: string | Timestamp;
    views?: number;
    date?: string;
}

export type PostForm = {
    title: string;
    category: string;
    readTime: string;
    image: string;
    content: string;
    excerpt: string;
    tags?: string | undefined;
    status?: string;
}


export interface Auth {
    id: string;
    user: User | null;

}

export interface UserInfoType {
    dbID : string;
    uid: string,
    username: string,
    email: string,
    createdAt: Timestamp,
}
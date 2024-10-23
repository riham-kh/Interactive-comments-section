import { User } from "./user";

export interface Reply {
    id: number,
    parentId: number,
    content: string,
    createdAt: string,
    score: number,
    replyingTo: string,
    user: User
}
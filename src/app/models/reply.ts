import { User } from "./user";
import { Vote } from "./vote";

export interface Reply {
    id: number,
    parentId: number,
    content: string,
    createdAt: string,
    vote: Vote,
    replyingTo: string,
    user: User
}
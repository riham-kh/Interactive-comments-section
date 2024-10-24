import { Reply } from "./reply";
import { User } from "./user";
import { Vote } from "./vote";

export interface Comment {
    id: number,
    content: string,
    createdAt: string,
    vote: Vote,
    user: User,
    replies?: Reply[]
}
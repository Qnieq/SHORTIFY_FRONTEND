import { IStateBase } from "./root.types";

export interface IShortenDeleteState extends IStateBase{
    deleteMessage: string | null
}

export interface IShortenDeleteStore extends IShortenDeleteState {
    shortenDelete: (hash: string) => Promise<void>
}

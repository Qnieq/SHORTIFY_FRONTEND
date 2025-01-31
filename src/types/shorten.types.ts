import { IStateBase } from "./root.types"

export interface IShortenState extends IStateBase {
    shortUrl: string
}

export interface IShortenResponse {
    shortUrl: string
}

export interface IShortenStore extends IShortenState {
    shorten: (originalUrl: string) => Promise<void>
}

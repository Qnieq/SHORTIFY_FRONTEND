import { IStateBase } from "./root.types"

export interface IInfo {
    originalUrl: string
    createdAt: string
    clickCount: number
}

export interface IShortenInfoState extends IStateBase {
    info: IInfo | null
}

export interface IShortenInfoStore extends IShortenInfoState {
    shortenGetInfo: (hash: string) => Promise<void>
}
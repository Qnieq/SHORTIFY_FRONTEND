import { IStateBase } from "./root.types"

export interface IAnalytics {
    clickCount: number
    last5Ips: string[]
}

export interface IShortenAnalyticsState extends IStateBase {
    analytics: IAnalytics | null
}

export interface IShortenAnalyticsStore extends IShortenAnalyticsState {
    shortenGetAnalytics: (hash: string) => Promise<void>
}

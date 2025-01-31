import { create } from "zustand";
import { axiosClassic } from "@/api/interceptors";
import { IAnalytics, IShortenAnalyticsState, IShortenAnalyticsStore } from "@/types/shorten_analytics.types";

const initialState: IShortenAnalyticsState = {
    loading: false,
    success: false,
    error: false,
    analytics: null,
    dataError: null,
};

export const useShortenGetAnalytics = create<IShortenAnalyticsStore>((set) => ({
    ...initialState,

    shortenGetAnalytics: async (hash: string) => {
        set({
            ...initialState,
            loading: true,
            success: false,
            error: false,
            dataError: null
        })
        try {
            const res = await axiosClassic.get<IAnalytics>(
                `analytics/${hash}`
            )
            set({
                ...initialState,
                loading: false,
                success: true,
                analytics: res.data
            })
        } catch (err: any) {
            set({
                ...initialState,
                loading: false,
                success: false,
                error: true,
                dataError: err.message
            });
        }
    },
}))
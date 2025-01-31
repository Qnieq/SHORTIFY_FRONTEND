import { axiosClassic } from "@/api/interceptors";
import { IInfo, IShortenInfoState, IShortenInfoStore } from "@/types/shorten_info.types";
import { create } from "zustand";

const initialState: IShortenInfoState = {
    loading: false,
    success: false,
    error: false,
    dataError: null,
    info: null
};

export const useShortenGetInfo = create<IShortenInfoStore>((set) => ({
    ...initialState,

    shortenGetInfo: async (hash: string) => {
        set({ 
            ...initialState, 
            loading: true, 
            success: false, 
            error: false, 
            dataError: null 
        })
        try {
            const res = await axiosClassic.get<IInfo>(
                `info/${hash}`
            )
            set({ 
                ...initialState, 
                loading: false, 
                success: true, 
                info: res.data
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
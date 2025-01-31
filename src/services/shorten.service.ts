import { create } from "zustand";
import { axiosClassic } from "@/api/interceptors";
import { IShortenResponse, IShortenState, IShortenStore } from "@/types/shorten.types";

const initialState: IShortenState = {
    loading: false,
    success: false,
    error: false,
    shortUrl: "",
    dataError: null,
};

export const useShorten = create<IShortenStore>((set) => ({
    ...initialState,

    shorten: async (originalUrl: string) => {
        set({ 
            ...initialState, 
            loading: true, 
            success: false, 
            error: false, 
            dataError: null 
        })
        try {
            const res = await axiosClassic.post<IShortenResponse>(
                '',
                {originalUrl: originalUrl}
            )
            set({ 
                ...initialState, 
                loading: false, 
                success: true, 
                shortUrl: res.data.shortUrl 
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
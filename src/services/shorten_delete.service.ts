import { create } from "zustand";
import { axiosClassic } from "@/api/interceptors";
import { IStateBase } from "@/types/root.types";
import { IShortenDeleteState, IShortenDeleteStore } from "@/types/shorten_delete.types";

const initialState: IShortenDeleteState = {
    loading: false,
    success: false,
    error: false,
    dataError: null,
    deleteMessage: null
};

export const useShortenDelete = create<IShortenDeleteStore>((set) => ({
    ...initialState,

    shortenDelete: async (hash: string) => {
        set({
            ...initialState,
            loading: true,
            success: false,
            error: false,
            dataError: null
        })
        try {
            await axiosClassic.delete(
                `delete/${hash}`
            )
            set({
                ...initialState,
                loading: false,
                success: true,
                deleteMessage: 'Short URL deleted successfully'
            })
        } catch (err: any) {
            set({
                ...initialState,
                loading: false,
                success: false,
                error: true,
                dataError: err.message,
                deleteMessage: 'Failed to delete short URL'
            });
        }
    },
}))
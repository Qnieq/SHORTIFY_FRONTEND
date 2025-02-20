import { axiosClassic } from "@/api/interceptors"
import { useShortenDelete } from "@/services/shorten_delete.service"
import { act, renderHook, waitFor } from "@testing-library/react"

jest.mock("@/api/interceptors")
const mockedAxios = axiosClassic as jest.Mocked<typeof axiosClassic>

describe('useShortenDelete hook test', () => {
    test('success delete', async () => {

        mockedAxios.delete

        const { result } = renderHook(() => useShortenDelete())

        await act(async () => {
            await result.current.shortenDelete('hash')
        })

        await waitFor(() => {
            expect(result.current.deleteMessage).toEqual("Short URL deleted successfully")
            expect(result.current.success).toBe(true)
            expect(result.current.loading).toBe(false)
            expect(result.current.dataError).toBe(null)
            expect(result.current.error).toBe(false)
        })

        expect(mockedAxios.delete).toHaveBeenCalledWith("delete/hash")
    })

    test('failed delete', async () => {

        mockedAxios.delete.mockRejectedValue(new Error("Error delete"))

        const { result } = renderHook(() => useShortenDelete())

        await act(async () => {
            await result.current.shortenDelete('hash')
        })

        await waitFor(() => {
            expect(result.current.deleteMessage).toEqual("Failed to delete short URL")
            expect(result.current.success).toBe(false)
            expect(result.current.loading).toBe(false)
            expect(result.current.dataError).toEqual("Error delete")
            expect(result.current.error).toBe(true)
        })

        expect(mockedAxios.delete).toHaveBeenCalledWith("delete/hash")
    })
})
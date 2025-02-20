import { axiosClassic } from "@/api/interceptors"
import { useShorten } from "@/services/shorten.service"
import { act, renderHook, waitFor } from "@testing-library/react"

jest.mock("@/api/interceptors")
const mockedAxios = axiosClassic as jest.Mocked<typeof axiosClassic>

describe('useShorten hook test', () => {
    test('success post original url', async () => {
        mockedAxios.post.mockResolvedValue({
            data: {
                shortUrl: "hash"
            }
        })

        const { result } = renderHook(() => useShorten())

        await act(async() => {
            await result.current.shorten("https://nextjs.org/docs/pages/building-your-application/testing/jest")
        })

        await waitFor(() => {
            expect(result.current.shortUrl).toEqual("hash")
            expect(result.current.success).toBe(true)
            expect(result.current.loading).toBe(false)
            expect(result.current.dataError).toBe(null)
            expect(result.current.error).toBe(false)
        })

        expect(mockedAxios.post).toHaveBeenCalledWith('', {
            originalUrl: "https://nextjs.org/docs/pages/building-your-application/testing/jest"
        })
    })

    test('failed post original url', async () => {
        mockedAxios.post.mockRejectedValue(new Error("Error to post original url"))

        const { result } = renderHook(() => useShorten())

        await act(async() => {
            await result.current.shorten("https://nextjs.org/docs/pages/building-your-application/testing/jest")
        })

        await waitFor(() => {
            expect(result.current.shortUrl).toBe("")
            expect(result.current.success).toBe(false)
            expect(result.current.loading).toBe(false)
            expect(result.current.dataError).toEqual("Error to post original url")
            expect(result.current.error).toBe(true)
        })

        expect(mockedAxios.post).toHaveBeenCalledWith('', {
            originalUrl: "https://nextjs.org/docs/pages/building-your-application/testing/jest"
        })
    })
})
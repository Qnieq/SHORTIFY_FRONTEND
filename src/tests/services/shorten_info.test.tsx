import { axiosClassic } from "@/api/interceptors"
import { useShortenGetInfo } from "@/services/shorten_info.service"
import { act, renderHook, waitFor } from "@testing-library/react"

jest.mock("@/api/interceptors")
const mockedAxios = axiosClassic as jest.Mocked<typeof axiosClassic>

describe('useShortenGetInfo hook test', () => {
    test('success get info', async () => {
        mockedAxios.get.mockResolvedValue({
            data: {
                originalUrl: "https://nextjs.org/docs/pages/building-your-application/testing/jest",
                createdAt: "20.20.20",
                clickCount: 20
            }
        })

        const { result } = renderHook(() => useShortenGetInfo())

        await act(async() => {
            await result.current.shortenGetInfo("hash")
        })

        await waitFor(() => {
            expect(result.current.info).toEqual({
                originalUrl: "https://nextjs.org/docs/pages/building-your-application/testing/jest",
                createdAt: "20.20.20",
                clickCount: 20
            })
            expect(result.current.success).toBe(true)
            expect(result.current.loading).toBe(false)
            expect(result.current.dataError).toBe(null)
            expect(result.current.error).toBe(false)
        })

        expect(mockedAxios.get).toHaveBeenCalledWith('info/hash')
    })

    test('failed get info', async () => {
        mockedAxios.get.mockRejectedValue(new Error("Error to get info"))

        const { result } = renderHook(() => useShortenGetInfo())

        await act(async() => {
            await result.current.shortenGetInfo("hash")
        })

        await waitFor(() => {
            expect(result.current.info).toBe(null)
            expect(result.current.success).toBe(false)
            expect(result.current.loading).toBe(false)
            expect(result.current.dataError).toEqual("Error to get info")
            expect(result.current.error).toBe(true)
        })

        expect(mockedAxios.get).toHaveBeenCalledWith('info/hash')
    })
})
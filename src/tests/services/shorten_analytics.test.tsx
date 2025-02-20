import { axiosClassic } from "@/api/interceptors";
import { useShortenGetAnalytics } from "@/services/shorten_analytics.service";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";

jest.mock("@/api/interceptors");
const mockedAxios = axiosClassic as jest.Mocked<typeof axiosClassic>;

describe('useShortenGetAnalytics hook', () => {
    test('fetch data on success', async () => {
        mockedAxios.get.mockResolvedValue({
            data: { clickCount: 6, last5Ips: [] },
        });

        const { result } = renderHook(() => useShortenGetAnalytics())

        await act(async () => {
            await result.current.shortenGetAnalytics("hash");
        });

        // Ожидаем обновления состояния
        await waitFor(() => {
            expect(result.current.analytics).toEqual({ clickCount: 6, last5Ips: [] });
            expect(result.current.loading).toBe(false);
            expect(result.current.success).toBe(true);
            expect(result.current.error).toBe(false);
        });

        expect(mockedAxios.get).toHaveBeenCalledWith("analytics/hash");
    })

    test('fetch data on failed', async () => {

        mockedAxios.get.mockRejectedValue(new Error("Error"));

        const { result } = renderHook(() => useShortenGetAnalytics())

        await act(async () => {
            await result.current.shortenGetAnalytics("hash");
        });

        // Ожидаем обновления состояния
        await waitFor(() => {
            expect(result.current.analytics).toEqual({});
            expect(result.current.loading).toBe(false);
            expect(result.current.success).toBe(false);
            expect(result.current.error).toBe(true);
            expect(result.current.dataError).toBe("Error");
        });

        expect(mockedAxios.get).toHaveBeenCalledWith("analytics/hash");
    })
})
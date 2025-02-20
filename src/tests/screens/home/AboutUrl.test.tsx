import { AboutUrl } from "@/components/screens/Home/AboutUrl"
import { useShortenGetAnalytics } from "@/services/shorten_analytics.service"
import { useShortenDelete } from "@/services/shorten_delete.service"
import { useShortenGetInfo } from "@/services/shorten_info.service"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

jest.mock("@/services/shorten_info.service", () => ({
    useShortenGetInfo: jest.fn()
}))
jest.mock("@/services/shorten_analytics.service", () => ({
    useShortenGetAnalytics: jest.fn()
}))
jest.mock("@/services/shorten_delete.service", () => ({
    useShortenDelete: jest.fn()
}))

describe('test aboutUrl component with zustand hooks', () => {
    test('get info', async () => {

        const getInfo = jest.fn();

        (useShortenGetInfo as unknown as jest.Mock).mockReturnValue({
            info: {
                originalUrl: "https://nextjs.org/docs/pages/building-your-application/testing/jest",
                createdAt: "20.202.20",
                clickCount: 10
            },
            loading: false,
            success: true,
            dataError: null,
            error: false,
            shortenGetInfo: getInfo
        })

        const { container } = render(<AboutUrl />)

        const input = screen.getByPlaceholderText("Check URL");

        fireEvent.change(input, { target: { value: "http://localhost:3005/shorten/hash" } })

        expect(input).toHaveValue("http://localhost:3005/shorten/hash")

        const buttonGetInfo = screen.getByText("Get Info")

        fireEvent.click(buttonGetInfo)

        await waitFor(() => {
            const paragraphOriginalURL = screen.getByText("Original URL:", { exact: false }).closest("p");
            const paragraphCreatedAt = screen.getByText("Created At:", { exact: false }).closest("p")
            const paragraphClickCount = container.querySelector("#clickCountInfo")?.closest("p")

            expect(paragraphOriginalURL).toHaveTextContent("https://nextjs.org/docs/pages/building-your-application/testing/jest");
            expect(paragraphCreatedAt).toHaveTextContent("20.202.20");
            expect(paragraphClickCount).toHaveTextContent("10");
        })
    })

    test('get analytics', async () => {
        const getAnalytics = jest.fn();
    
        (useShortenGetAnalytics as unknown as jest.Mock).mockReturnValue({
            analytics: { clickCount: 4, last5Ips: ["IPs"] },
            loading: false,
            success: true,
            dataError: null,
            error: false,
            shortenGetAnalytics: getAnalytics
        });
    
        const { container } = render(<AboutUrl />);
    
        const input = screen.getByPlaceholderText("Check URL");
    
        fireEvent.change(input, { target: { value: "http://localhost:3005/shorten/hash" } });
    
        expect(input).toHaveValue("http://localhost:3005/shorten/hash");
    
        const buttonGetAnalytics = screen.getByText("Get Analytics");
    
        fireEvent.click(buttonGetAnalytics);
    
        await waitFor(() => {
            const paragraphLastIps = screen.getByText("Last 5 IPs:", { exact: false }).closest("p");
            const paragraphClickCount = container.querySelector("#clickCountAnalytics")?.closest("p");
    
            expect(paragraphLastIps).toHaveTextContent("IPs");
            expect(paragraphClickCount).toHaveTextContent("4");
        });
    });

    test('delete short url', async () => {
        const deleteUrl = jest.fn();

        (useShortenDelete as unknown as jest.Mock).mockReturnValue({
            loading: false,
            success: false,
            error: false,
            dataError: null,
            deleteMessage: "Short URL deleted successfully",
            shortenDelete: deleteUrl
        });

        render(<AboutUrl />);
    
        const input = screen.getByPlaceholderText("Check URL");
    
        fireEvent.change(input, { target: { value: "http://localhost:3005/shorten/hash" } });
    
        expect(input).toHaveValue("http://localhost:3005/shorten/hash");

        const buttonDeleteUrl = screen.getByText("Delete Short URL");
    
        fireEvent.click(buttonDeleteUrl);

        await waitFor(() => {
            const deleteMessage = screen.getByText("Short URL deleted successfully")

            expect(deleteMessage).toBeInTheDocument()
        })
    })
})


describe('test aboutUrl component with zustand hooks errors', () => {

    test('get info error', async () => {

        const getInfo = jest.fn();

        (useShortenGetInfo as unknown as jest.Mock).mockReturnValue({
            info: null,
            loading: false,
            success: false,
            dataError: "error",
            error: true,
            shortenGetInfo: getInfo
        })

        render(<AboutUrl />)

        const input = screen.getByPlaceholderText("Check URL");

        fireEvent.change(input, { target: { value: "http://localhost:3005/shorten/hash" } })

        expect(input).toHaveValue("http://localhost:3005/shorten/hash")

        const buttonGetInfo = screen.getByText("Get Info")

        fireEvent.click(buttonGetInfo)

        await waitFor(() => {
            const errorMessage = screen.getByText("Failed to get info about URL")

            expect(errorMessage).toBeInTheDocument()
        })
    })

    test('get analytics error', async () => {
        const getAnalytics = jest.fn();
    
        (useShortenGetAnalytics as unknown as jest.Mock).mockReturnValue({
            analytics: null,
            loading: false,
            success: false,
            dataError: "error",
            error: true,
            shortenGetAnalytics: getAnalytics
        });
    
        render(<AboutUrl />);
    
        const input = screen.getByPlaceholderText("Check URL");
    
        fireEvent.change(input, { target: { value: "http://localhost:3005/shorten/hash" } });
    
        expect(input).toHaveValue("http://localhost:3005/shorten/hash");
    
        const buttonGetAnalytics = screen.getByText("Get Analytics");
    
        fireEvent.click(buttonGetAnalytics);
    
        await waitFor(() => {
            const errorMessage = screen.getByText("Failed to get analytics about URL")

            expect(errorMessage).toBeInTheDocument()
        });
    });
})
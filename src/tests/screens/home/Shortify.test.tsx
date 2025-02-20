import { Shortify } from "@/components/screens/Home/Shortify";
import { useShorten } from "@/services/shorten.service"
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("@/services/shorten.service", () => ({
    useShorten: jest.fn()
}))

beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", {
        value: {
            writeText: jest.fn().mockResolvedValue(undefined), // возвращаем промис
            readText: jest.fn().mockResolvedValue("clipboard content"),
        },
        writable: true,
    });
});

describe('test shortify component with zustand hook', () => {
    test('get short url', async () => {
        const getShortUrl = jest.fn();

        (useShorten as unknown as jest.Mock).mockReturnValue({
            shortUrl: "hash",
            loading: false,
            success: false,
            error: false,
            dataError: null,
            shorten: getShortUrl
        })

        const { container } = render(<Shortify />)

        const inputOriginalUrl = screen.getByPlaceholderText("Enter original URL")

        fireEvent.change(inputOriginalUrl, { target: { value: "https://www.awwwards.com/websites/" } })

        expect(inputOriginalUrl).toHaveValue("https://www.awwwards.com/websites/")

        const buttonShortifyUrl = screen.getByText("Shortify URL")

        fireEvent.click(buttonShortifyUrl)

        await waitFor(() => {
            const inputWithShortUrl = container.querySelector("#shortUrl")

            expect(inputWithShortUrl).toHaveValue("http://localhost:3005/shorten/hash")

            const copyButton = screen.getByText("Short URL (click to copy):", { exact: false })

            fireEvent.click(copyButton)

            expect(navigator.clipboard.writeText).toHaveBeenCalledWith("http://localhost:3005/shorten/hash")
        })

    })
})
import { Heading } from "@/components/UI/Heading";
import { useShorten } from "@/services/shorten.service";
import { useState } from "react";
import { toast } from "sonner";
import { useClipboard } from "use-clipboard-copy";

export function Shortify() {

    const [originalUrl, setOriginalUrl] = useState('');

    const clipboard = useClipboard();

    const shorten = useShorten((state) => state)

    const copyLink = (e: any) => {
        clipboard.copy(e)

        toast.success("Success copying")
    }

    return (
        <div className="flex flex-col items-center justify-center gap-[30px] w-full">
            <Heading text='Shortify' color='#fff' align='center' weight='semibold' />
            <div className='flex items-center justify-center gap-[10px]'>
                <input
                    type="text"
                    placeholder="Enter original URL"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    className="w-80 p-2 border border-gray-300 rounded-md text-black"
                />
                <button
                    onClick={() => shorten.shorten(originalUrl)}
                    className="ml-3 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Shortify URL
                </button>
            </div>
            {shorten.shortUrl && (
                <button onClick={copyLink} className='w-[320px] flex flex-col items-center cursor-pointer'>
                    Short URL (click to copy):
                    <input
                        id="shortUrl"
                        ref={clipboard.target}
                        value={`http://localhost:3005/shorten/${shorten.shortUrl}`}
                        className="text-blue-500 underline w-full bg-transparent border-none outline-none pointer-events-none" readOnly
                    />
                </button>
            )}
        </div>
    );
}

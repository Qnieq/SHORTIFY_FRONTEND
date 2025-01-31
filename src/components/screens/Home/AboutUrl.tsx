import { useShortenGetAnalytics } from "@/services/shorten_analytics.service";
import { useShortenDelete } from "@/services/shorten_delete.service";
import { useShortenGetInfo } from "@/services/shorten_info.service";
import { useState } from "react";
import { Info } from "./Info";

export function AboutUrl() {

    const [checkUrl, setCheckUrl] = useState('');

    const shortenInfo = useShortenGetInfo((state) => state)
    const shortenAnalytics = useShortenGetAnalytics((state) => state)
    const shortenDelete = useShortenDelete((state) => state)

    return (
        <div className="flex flex-col items-center gap-[20px] mb-5">
            <h5 className='text-white font-poppins text-[1.5rem]'>
                Get info about ur url
            </h5>
            <input
                type="text"
                placeholder="Check URL"
                value={checkUrl}
                onChange={(e) => setCheckUrl(e.target.value)}
                className="w-80 p-2 border border-gray-300 rounded-md text-black"
            />
            {checkUrl.length > "http://localhost:3005/shorten/".length &&
                <div className="flex gap-[10px]">
                    <button
                        onClick={() => shortenInfo.shortenGetInfo(checkUrl.split('http://localhost:3005/shorten/')[1])}
                        className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Get Info
                    </button>
                    <button
                        onClick={() => shortenAnalytics.shortenGetAnalytics(checkUrl.split('http://localhost:3005/shorten/')[1])}
                        className="p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                    >
                        Get Analytics
                    </button>
                    <button
                        onClick={() => shortenDelete.shortenDelete(checkUrl.split('http://localhost:3005/shorten/')[1])}
                        className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Delete Short URL
                    </button>
                </div>
            }
            <Info />
        </div>
    );
}

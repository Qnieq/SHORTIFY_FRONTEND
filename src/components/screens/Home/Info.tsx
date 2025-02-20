import { useShortenGetAnalytics } from "@/services/shorten_analytics.service";
import { useShortenDelete } from "@/services/shorten_delete.service";
import { useShortenGetInfo } from "@/services/shorten_info.service";

export function Info() {

    const shortenInfo = useShortenGetInfo((state) => state)
    const shortenAnalytics = useShortenGetAnalytics((state) => state)
    const shortenDelete = useShortenDelete((state) => state)

    return (
        <div className='flex flex-col items-start'>
            {shortenInfo.info ? (
                <div className="mb-5">
                    <h3 className="text-lg font-semibold  text-[#74fd34]">Info</h3>
                    <p>Original URL: {shortenInfo.info.originalUrl}</p>
                    <p>Created At: {shortenInfo.info.createdAt}</p>
                    <p id="clickCountInfo">Click Count: {shortenInfo.info.clickCount}</p>
                </div>
            ) : shortenInfo.error &&
            (
                <div className="mb-5">
                    <h3 className="text-lg font-poppins font-semibold text-[#f10000]">Failed to get info about URL</h3>
                </div>
            )
            }
        
            {shortenAnalytics && shortenAnalytics.analytics ? (
                <div className="">
                    <h3 className="text-lg font-semibold text-purple-500">Analytics</h3>
                    <p id="clickCountAnalytics">Click Count: {shortenAnalytics.analytics.clickCount}</p>
                    <p>Last 5 IPs: {shortenAnalytics.analytics.last5Ips.join(', ')}</p>
                </div>
            ) : shortenAnalytics && shortenAnalytics.error &&
            (
                <div className="">
                    <h3 className="text-lg font-poppins font-semibold text-[#f10000]">Failed to get analytics about URL</h3>
                </div>
            )
            }
            {shortenDelete && shortenDelete.deleteMessage && <p className="mt-2 text-gray-700">{shortenDelete.deleteMessage}</p>}
        </div>
    );
}

'use client'

import React, { useState } from 'react';
import axios from 'axios';

interface IInfo {
    originalUrl: string
    createdAt: string
    clickCount: number
}

interface IAnalytics {
    clickCount: number
    last5Ips: string[]
}

export default function Home() {
    const [originalUrl, setOriginalUrl] = useState('');
    
    const [shortUrl, setShortUrl] = useState('');

    const [info, setInfo] = useState<IInfo | null>(null);
    const [analytics, setAnalytics] = useState<IAnalytics | null>(null);
    const [deleteMessage, setDeleteMessage] = useState('');

    const handleShorten = async () => {
        const response = await axios('http://localhost:3005/shorten', {
            data: { originalUrl },
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });
        setShortUrl(response.data.shortUrl);
    };

    const handleGetInfo = async () => {
        const response = await axios(`http://localhost:3005/shorten/info/${shortUrl}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        });
        setInfo(response.data);
    };

    const handleGetAnalytics = async () => {
        const response = await axios(`http://localhost:3005/shorten/analytics/${shortUrl}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        });
        setAnalytics(response.data);
    };

    const handleDelete = async () => {
        const response = await axios(`http://localhost:3005/shorten/delete/${shortUrl}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE"
        });
        if (response.status === 200) {
            setDeleteMessage('Short URL deleted successfully');
        } else {
            setDeleteMessage('Failed to delete short URL');
        }
    };

    return (
        <div className="p-5 font-sans">
            <h1 className="text-2xl font-bold mb-5">Shortify</h1>

            <div className="mb-5">
                <input
                    type="text"
                    placeholder="Enter original URL"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    className="w-80 p-2 border border-gray-300 rounded-md text-black"
                />
                <button
                    onClick={handleShorten}
                    className="ml-3 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Shortify URL
                </button>
            </div>

            {shortUrl && (
                <div className="mb-5">
                    <p>
                        Short URL: <a href={`http://localhost:3005/shorten/${shortUrl}`} className="text-blue-500 underline">{`http://localhost:3005/shorten/${shortUrl}`}</a>
                    </p>
                </div>
            )}

            <div className="mb-5">
                <button
                    onClick={handleGetInfo}
                    className="mr-3 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Get Info
                </button>
                <button
                    onClick={handleGetAnalytics}
                    className="p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                >
                    Get Analytics
                </button>
            </div>

            {info && (
                <div className="mb-5">
                    <h3 className="text-lg font-semibold">Info</h3>
                    <p>Original URL: {info.originalUrl}</p>
                    <p>Created At: {info.createdAt}</p>
                    <p>Click Count: {info.clickCount}</p>
                </div>
            )}

            {analytics && (
                <div className="mb-5">
                    <h3 className="text-lg font-semibold">Analytics</h3>
                    <p>Click Count: {analytics.clickCount}</p>
                    <p>Last 5 IPs: {analytics.last5Ips.join(', ')}</p>
                </div>
            )}

            <div className="mb-5">
                <button
                    onClick={handleDelete}
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Delete Short URL
                </button>
                {deleteMessage && <p className="mt-2 text-gray-700">{deleteMessage}</p>}
            </div>
        </div>
    );
}

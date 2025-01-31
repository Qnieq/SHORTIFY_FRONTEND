'use client'

import React from 'react';
import { AboutUrl } from './AboutUrl';
import { Shortify } from './Shortify';

export default function Home() {


    return (
        <div className="flex flex-col items-center justify-center gap-[40px] w-full h-screen font-poppins">
            <Shortify />
            <AboutUrl />
        </div>
    );
}

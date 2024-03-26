import React from 'react';

// TOOD: Need to sync with team member regarding Pulse Loader Skeletion

export default async function Loading() {
    return;
    <>
        <h1>Example 1</h1>
        <section className="rounded flex h-[40px] w-[800px] animate-pulse items-center justify-around bg-slate-300 md:content-center"></section>

        <h1>Example 2</h1>
        <section>
            <div className="animate-pulse space-y-[4px] p-[4px]">
                <div className="rounded h-[32px] w-full bg-slate-300"></div>
                <div className="space-y-[2px]">
                    <div className="rounded h-[4px] w-[600px] bg-slate-300"></div>
                    <div className="rounded h-[4px] w-[300px] bg-slate-300"></div>
                </div>
            </div>
        </section>

        <h1>Example 3</h1>
        <section className="flex h-[200px] w-[800px] items-center justify-around md:content-center">
            <div className="flex h-[200px] animate-pulse flex-row items-center justify-center space-x-m">
                <div className="h-xl w-xl rounded-full bg-slate-300 "></div>
                <div className="flex flex-col space-y-m">
                    <div className="h-[8px] w-[200px] rounded-m bg-slate-300 "></div>
                    <div className="h-[8px] w-[200px] rounded-m bg-slate-300 "></div>
                </div>
            </div>
        </section>
    </>;
}

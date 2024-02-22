'use client';

import React from 'react';

export default function SkeletonPost() {
    // TODO: TBD
    return (
        <>
            <h3>Post</h3>
            <section className="flex h-[200px] w-[680px] items-center justify-around md:content-center">
                <div className="flex h-[200px] animate-pulse flex-row items-center justify-center space-x-m rounded-m border-[2px] border-slate-300 p-m">
                    <div className="h-xl w-xl rounded-full bg-slate-300 "></div>
                    <div className="flex flex-col space-y-m">
                        <div className="h-[14px] w-[200px] rounded-m bg-slate-300 "></div>
                        <div className="h-[8px] w-[200px] rounded-m bg-slate-300 "></div>
                        <div className="h-[24px] w-[300px] rounded-m bg-slate-300 "></div>
                        <div className="flex w-full flex-row space-x-xs ">
                            <div className="h-[16px] w-[100px] rounded-m bg-slate-300 "></div>
                            <div className="h-[16px] w-[100px] rounded-m bg-slate-300 "></div>
                            <div className="h-[16px] w-[100px] rounded-m bg-slate-300 "></div>
                        </div>
                    </div>
                </div>
            </section>

            <h3>User</h3>
            <section className="flex h-[220px] w-[200px] items-center justify-around rounded-m border-[2px] border-slate-300 md:content-center">
                <div className="flex h-full w-full animate-pulse flex-col items-center justify-center space-y-m p-m">
                    <div className="h-xl w-xl rounded-full bg-slate-300 "></div>
                    <div className="h-[8px] w-full rounded-m bg-slate-300 "></div>
                    <div className="h-[8px] w-full rounded-m bg-slate-300 "></div>
                    <div className="h-[30px] w-full rounded-xs bg-slate-300 "></div>
                </div>
            </section>

            <h3>Sample 2</h3>
            <section className="flex h-[200px] w-[680px] items-center justify-around md:content-center">
                <div className="w-full animate-pulse space-y-[4px] py-[4px]">
                    <div className="rounded h-[32px] w-full bg-slate-300"></div>
                    <div className="space-y-[2px]">
                        <div className="rounded h-[4px] w-2/3 bg-slate-300"></div>
                        <div className="rounded h-[4px] w-2/3 bg-slate-300"></div>
                        <div className="rounded h-[4px] w-2/3 bg-slate-300"></div>
                    </div>
                </div>
            </section>

            <h3>Sample 3</h3>
            <section className="rounded flex h-[40px] w-full animate-pulse items-center justify-around bg-slate-300 md:w-[680px] md:content-center"></section>
        </>
    );
}

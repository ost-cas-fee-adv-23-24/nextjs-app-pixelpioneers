import clsx from 'clsx';
import React from 'react';

export default function UserSkeleton() {
    // const skeletonAvatarText = 'rounded h-[4px] w-2/3 bg-slate-300';
    const skeletonText = 'w-full rounded-m bg-slate-300';

    // TODO: Need to evaluate skeleton
    return (
        <>
            <section className="flex h-[220px] w-[216px] items-center justify-around rounded-m border-slate-300 md:content-center">
                <div className="flex h-full w-full animate-pulse flex-col items-center justify-center space-y-m p-m">
                    <div className="h-xl w-xl rounded-full bg-slate-300 "></div>
                    <div className={clsx(skeletonText, 'h-[12px]')}></div>
                    <div className={clsx(skeletonText, 'h-[8px] w-1/3')}></div>
                    <div className={clsx(skeletonText, 'h-[30px] w-1/2')}></div>
                </div>
            </section>

            {/* <h3>Sample 1</h3>
            <section className="flex h-[200px] w-[680px] items-center justify-around md:content-center">
                <div className="w-full animate-pulse space-y-[4px] py-[4px]">
                    <div className="rounded h-[32px] w-full bg-slate-300"></div>
                    <div className="space-y-[2px]">
                        <div className={skeletonAvatarText}></div>
                        <div className={skeletonAvatarText}></div>
                        <div className={skeletonAvatarText}></div>
                    </div>
                </div>
            </section>

            <h3>Sample 2</h3>
            <section className="rounded flex h-[40px] w-full animate-pulse items-center justify-around bg-slate-300 md:w-[680px] md:content-center"></section> */}
        </>
    );
}

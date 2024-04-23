import clsx from 'clsx';
import React from 'react';

export default function MessageSingleSkeleton({ className }: { className: string }) {
    const skeletonButton = 'h-[28px] w-1/4 rounded-m bg-slate-300 ';
    const skeletonText = 'rounded-m w-full bg-slate-300';

    return (
        <section className={clsx(className, 'flex justify-around md:content-center')}>
            <div className="flex w-full animate-pulse flex-row items-start  space-x-m rounded-m border-slate-300 p-m">
                <div className="h-[50px] w-[50px] flex-none rounded-full bg-slate-300 "></div>
                <div className="flex w-full flex-col space-y-m">
                    <div className={clsx(skeletonText, 'h-[14px] w-1/2')}></div>
                    <div className="flex w-full flex-row space-x-xs ">
                        <div className={skeletonButton}></div>
                        <div className={skeletonButton}></div>
                    </div>
                    <div className={clsx(skeletonText, 'h-[88px] w-1/2')}></div>
                    <div className={clsx(skeletonText, 'h-[24px] w-1/2')}></div>
                    <div className="flex w-full flex-row space-x-xs ">
                        <div className={skeletonButton}></div>
                        <div className={skeletonButton}></div>
                        <div className={skeletonButton}></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

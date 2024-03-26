import clsx from 'clsx';
import React from 'react';

export default function PostSkeleton() {
    const skeletonButton = 'h-[28px] w-[100px] rounded-m bg-slate-300 ';
    const skeletonText = 'rounded-m bg-slate-300';

    return (
        <section className="flex h-[200px] w-[680px] justify-around md:content-center">
            <div className="flex h-full animate-pulse flex-row items-start  space-x-m rounded-m border-slate-300 p-m">
                <div className="h-xl w-xl rounded-full bg-slate-300 "></div>
                <div className="flex flex-col space-y-m">
                    <div className={clsx(skeletonText, 'h-[14px] w-[200px]')}></div>
                    <div className={clsx(skeletonText, 'h-[8px] w-[200px]')}></div>
                    <div className={clsx(skeletonText, 'h-[24px] w-[300px]')}></div>
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

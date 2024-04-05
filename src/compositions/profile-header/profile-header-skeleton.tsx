import clsx from 'clsx';
import React from 'react';

export default function ProfileHeaderSkeleton({ classNames }: { classNames: string }) {
    const skeletonButton = 'h-[28px] w-full rounded-m bg-slate-300 ';
    const skeletonText = 'rounded-m bg-slate-300';

    return (
        <section className={clsx(classNames, 'flex justify-around md:content-center')}>
            <div className="flex h-full w-full animate-pulse flex-col items-start space-x-m rounded-m border-slate-300 p-m">
                <div className="flex w-full flex-col space-y-m">
                    <div className={clsx(skeletonText, 'h-[44px] w-full')}></div>
                    <div className={clsx(skeletonText, 'h-[44px] w-full')}></div>

                    <div className="flex w-full flex-row">
                        <div className="flex w-full flex-col space-y-m pr-m">
                            <div className={skeletonButton} />
                            <div className={skeletonButton} />
                            <div className={skeletonButton} />
                        </div>
                        <div className="h-[140px] w-[140px] flex-none rounded-full bg-slate-300"></div>
                    </div>
                    <div className="flex w-1/3 flex-row space-x-xs ">
                        <div className={skeletonButton} />
                    </div>
                    <div className={clsx(skeletonText, 'mx-0 h-[64px] w-1/2')}></div>
                </div>
            </div>
        </section>
    );
}

import clsx from 'clsx';
import React from 'react';

export default function UserSkeleton() {
    const skeletonText = 'w-full rounded-m bg-slate-300';
    return (
        <section className="flex h-[220px] w-[216px] items-center justify-around rounded-m border-slate-300 md:content-center">
            <div className="flex h-full w-full animate-pulse flex-col items-center justify-center space-y-m p-m">
                <div className="h-xl w-xl rounded-full bg-slate-300 "></div>
                <div className={clsx(skeletonText, 'h-[12px]')}></div>
                <div className={clsx(skeletonText, 'h-[8px] w-1/3')}></div>
                <div className={clsx(skeletonText, 'h-[30px] w-1/2')}></div>
            </div>
        </section>
    );
}

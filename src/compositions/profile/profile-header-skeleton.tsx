import React from 'react';

export default function ProfileHeaderSkeleton() {
    return (
        <section className="flex min-h-[460px] w-full animate-pulse flex-col gap-m border-slate-300 md:w-container">
            <div className="relative">
                <div className="h-[200px] w-full bg-gradient-to-r from-tertiary-500 to-primary-500 md:h-[320px] md:rounded-m"></div>
                <div className="absolute bottom-[-25px] right-[24px] md:bottom-[-70px] md:right-[30px]">
                    <div className="h-[96px] w-[96px] flex-none rounded-full bg-slate-300 outline outline-[6px] outline-secondary-100 md:h-[160px] md:w-[160px]"></div>
                </div>
            </div>
            <div className="mx-m h-[40px] w-1/3 rounded-m bg-slate-300 md:mx-0" />
            <div className="mx-m h-[60px]  rounded-m bg-slate-300 md:mx-0" />
        </section>
    );
}

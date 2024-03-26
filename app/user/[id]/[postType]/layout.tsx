import React from 'react';

export default function UserLayout({
    children,
    posts,
}: {
    children: React.ReactNode;
    posts: React.ReactNode;
}) {
    return (
        <section className="flex w-full flex-col items-center gap-l md:w-[680px]">
            {children}
            {posts}
        </section>
    );
}

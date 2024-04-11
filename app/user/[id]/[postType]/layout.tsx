import React from 'react';

export default function UserLayout({
    children,
    posts,
}: {
    children: React.ReactNode;
    posts: React.ReactNode;
}) {
    return (
        <section className="flex w-full flex-col gap-l md:w-[680px] md:px-0">
            {children}
            {posts}
        </section>
    );
}

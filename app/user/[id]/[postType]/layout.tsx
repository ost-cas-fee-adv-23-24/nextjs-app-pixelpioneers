import React from 'react';

export default function UserLayout({
    children,
    posts,
}: {
    children: React.ReactNode;
    posts: React.ReactNode;
}) {
    return (
        <section className="mx-m flex w-full flex-col gap-l px-m md:w-[680px] md:px-0">
            {children}
            {posts}
        </section>
    );
}

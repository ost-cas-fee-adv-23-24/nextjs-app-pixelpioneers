import React from 'react';

export default function UserLayout({
    user,
    children,
    posts,
}: {
    user: React.ReactNode;
    children: React.ReactNode;
    posts: React.ReactNode;
}) {
    return (
        <section className="mx-m flex w-full flex-col items-center gap-l px-m md:w-[680px] md:px-0">
            {user}
            {children}
            {posts}
        </section>
    );
}

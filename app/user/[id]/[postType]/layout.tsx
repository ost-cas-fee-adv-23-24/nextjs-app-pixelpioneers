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
        <section className="flex w-full flex-col items-center gap-l md:w-[680px]">
            {user}
            {children}
            {posts}
        </section>
    );
}

import React from 'react';

export default function UserLayout({
    children,
    posts,
}: {
    children: React.ReactNode;
    posts: React.ReactNode;
}) {
    return (
        <section className="flex w-full flex-col gap-l md:w-container">
            {children}
            {posts}
        </section>
    );
}

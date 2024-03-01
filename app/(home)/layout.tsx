import React from 'react';

export default function HomeLayout({
    children,
    posts,
}: {
    children: React.ReactNode;
    posts: React.ReactNode;
}) {
    return (
        <>
            {children}
            {posts}
        </>
    );
}

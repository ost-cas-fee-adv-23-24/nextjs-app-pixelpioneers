import React from 'react';

export default function HomeLayout({
    children,
    createPost,
    posts,
}: {
    children: React.ReactNode;
    createPost: React.ReactNode;
    posts: React.ReactNode;
}) {
    return (
        <div className="mt-m flex flex-col gap-s md:mt-0">
            <section className="flex w-full flex-col gap-l self-center md:w-container">
                {children}
                {createPost}
            </section>
            <section className="flex w-full flex-col md:w-auto md:px-0">{posts}</section>
        </div>
    );
}

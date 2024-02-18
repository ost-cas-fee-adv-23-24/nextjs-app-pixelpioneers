/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'cdn.dnaindia.com',
            },
        ],
    },
};

module.exports = nextConfig;

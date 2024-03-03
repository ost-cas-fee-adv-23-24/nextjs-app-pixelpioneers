/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
            },
            {
                // TODO: what is this for?
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

module.exports = nextConfig;

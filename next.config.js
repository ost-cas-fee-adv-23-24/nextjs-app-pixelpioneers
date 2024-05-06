const nextWithSerwist = async () => {
    /** @type {import("next").NextConfig} */
    const nextConfig = {
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'storage.googleapis.com',
                },
            ],
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
            dangerouslyAllowSVG: false,
            contentDispositionType: 'attachment',
            contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        },
    };

    const withSerwist = (await import('@serwist/next')).default({
        swSrc: 'app/sw.ts',
        swDest: 'public/sw.js',
    });

    return withSerwist(nextConfig);
};

module.exports = nextWithSerwist();

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.dummyjson.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'dummyjson.com',
                port: '',
                pathname: '/**',
            },
        ],
    },

};

export default nextConfig;

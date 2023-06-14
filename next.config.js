/** @type {import('next').NextConfig} */
const withVideos = require('next-videos')
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'hzvtlwbfqvmrppbgpopu.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**'
            }
        ],

    }
};

module.exports = nextConfig, withVideos()

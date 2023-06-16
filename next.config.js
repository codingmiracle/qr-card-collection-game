/** @type {import('next').NextConfig} */
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

module.exports = nextConfig

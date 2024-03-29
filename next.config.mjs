/** @type {import('next').NextConfig} */

import withPWA from "@ducanh2912/next-pwa";

const nextConfig = {
    reactStrictMode: true,
    experimental:{
        appDir: true
    }
};

export default withPWA({
    dest: "public"
})(nextConfig);

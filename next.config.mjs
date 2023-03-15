/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";

const nextConfig = {
    reactStrictMode: true,
    experimental:{
        appDir: true
    }
};

export default withPWA({
    dest: "public"
})(nextConfig);

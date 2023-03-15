import React from "react";
import type { Metadata } from "next";

import { Navigation } from "../components/navigation";
import { Modal } from "../components/modal";

import "../styles/globals.css";

interface RootLayoutProps{
    children: React.ReactNode;
}

const appTitle = "Astronomy Picture of the Day";
const appDescription = "Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.";
const appUrl = "https://apod.bradlove.dev";

const metadata: Metadata = {
    title: appTitle,
    description: appDescription,
    openGraph: {
        title: appTitle,
        url: appUrl,
        type: "website",
        siteName: appTitle
    },
    twitter: {
        card: "summary",
        title: appTitle,
        images: "https://apod.bradlove.dev/icons/icon-192x192.png",
        site: appUrl,
        description: appDescription
    },
    applicationName: appTitle,
    appleWebApp: {
        title: appTitle,
        capable: true,
        statusBarStyle: "default"
    },
    robots: {
        index: true
    },
    themeColor: "#272935",
    manifest: "/manifest.json",
    colorScheme: "dark"
}

const RootLayout = ({ children }: RootLayoutProps): React.ReactElement => (
    <html data-theme="dracula" lang="en">
        <body>
            <Navigation />
            { children }
            <Modal />
        </body>
    </html>
);

export { metadata };
export default RootLayout;

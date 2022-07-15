import React from "react";
import Head from "next/head";

import "../styles/globals.css";

import { Navigation } from "../components/navigation";

import type { AppProps } from "next/app";

const MyApp = ({
    Component,
    pageProps
}: AppProps): React.ReactElement => (
    <div className="grid">
        <Head>
            <title>
                { "Astronomy Picture of the Day" }
            </title>
            {/* eslint-disable-next-line max-len -- description */}
            <meta content="Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer." name="description" />
            <link href="/favicon.svg" rel="icon" />
            <meta content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover" name="viewport" />

            <meta content="Astronomy Picture of the Day" name="application-name" />
            <meta content="yes" name="apple-mobile-web-app-capable" />
            <meta content="default" name="apple-mobile-web-app-status-bar-style" />
            <meta content="Astronomy Picture of the Day" name="apple-mobile-web-app-title" />
            <meta content="telephone=no" name="format-detection" />
            <meta content="yes" name="mobile-web-app-capable" />
            <meta content="/icons/browserconfig.xml" name="msapplication-config" />
            <meta content="#272935" name="msapplication-TileColor" />
            <meta content="no" name="msapplication-tap-highlight" />
            <meta content="#272935" name="theme-color" />

            <link href="/icons/icon-192x192.png" rel="apple-touch-icon" />
            <link href="/icons/icon-192x192.png" rel="apple-touch-icon" sizes="152x152" />
            <link href="/icons/icon-192x192.png" rel="apple-touch-icon" sizes="180x180" />
            <link href="/icons/icon-192x192.png" rel="apple-touch-icon" sizes="167x167" />

            <link href="/manifest.json" rel="manifest" />
            <link color="#272935" href="/icons/icon-192x192.png" rel="mask-icon" />
            <link href="/favicon.svg" rel="shortcut icon" />

            <meta content="summary" name="twitter:card" />
            <meta content="https://apod.bradlove.dev/" name="twitter:url" />
            <meta content="Astronomy Picture of the Day" name="twitter:title" />
            {/* eslint-disable-next-line max-len -- description */}
            <meta content="Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer." name="twitter:description" />
            <meta content="https://apod.bradlove.dev/icons/icon-192x192.png" name="twitter:image" />
            <meta content="website" property="og:type" />
            <meta content="Astronomy Picture of the Day" property="og:title" />
            {/* eslint-disable-next-line max-len -- description */}
            <meta content="Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer." property="og:description" />
            <meta content="Astronomy Picture of the Day" property="og:site_name" />
            <meta content="https://apod.bradlove.dev/" property="og:url" />
            <meta content="https://apod.bradlove.dev/icons/icon-192x192.png" property="og:image" />
        </Head>
        <Navigation />
        <Component { ...pageProps } />
    </div>
);

export default MyApp;

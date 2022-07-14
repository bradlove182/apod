import React from "react";
import Head from "next/head";

import "../styles/globals.css";

import { Navigation } from "../components/navigation";

import style from "./_app.module.css";

import type { AppProps } from "next/app";

const MyApp = ({
    Component,
    pageProps
}: AppProps): React.ReactElement => (
    <div className={ style.app }>
        <Head>
            <title>
                { "Astronomy Picture of the Day" }
            </title>
            <link href="/favicon.svg" rel="icon" />
            <meta content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover" name="viewport" />

            <meta content="PWA App" name="application-name" />
            <meta content="yes" name="apple-mobile-web-app-capable" />
            <meta content="default" name="apple-mobile-web-app-status-bar-style" />
            <meta content="PWA App" name="apple-mobile-web-app-title" />
            <meta content="Best PWA App in the world" name="description" />
            <meta content="telephone=no" name="format-detection" />
            <meta content="yes" name="mobile-web-app-capable" />
            <meta content="/icons/browserconfig.xml" name="msapplication-config" />
            <meta content="#2B5797" name="msapplication-TileColor" />
            <meta content="no" name="msapplication-tap-highlight" />
            <meta content="#000000" name="theme-color" />

            <link href="/icons/touch-icon-iphone.png" rel="apple-touch-icon" />
            <link href="/icons/touch-icon-ipad.png" rel="apple-touch-icon" sizes="152x152" />
            <link href="/icons/touch-icon-iphone-retina.png" rel="apple-touch-icon" sizes="180x180" />
            <link href="/icons/touch-icon-ipad-retina.png" rel="apple-touch-icon" sizes="167x167" />

            <link href="/icons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
            <link href="/icons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
            <link href="/manifest.json" rel="manifest" />
            <link color="#5bbad5" href="/icons/safari-pinned-tab.svg" rel="mask-icon" />
            <link href="/favicon.ico" rel="shortcut icon" />

            <meta content="summary" name="twitter:card" />
            <meta content="https://yourdomain.com" name="twitter:url" />
            <meta content="PWA App" name="twitter:title" />
            <meta content="Best PWA App in the world" name="twitter:description" />
            <meta content="https://yourdomain.com/icons/android-chrome-192x192.png" name="twitter:image" />
            <meta content="@DavidWShadow" name="twitter:creator" />
            <meta content="website" property="og:type" />
            <meta content="PWA App" property="og:title" />
            <meta content="Best PWA App in the world" property="og:description" />
            <meta content="PWA App" property="og:site_name" />
            <meta content="https://yourdomain.com" property="og:url" />
            <meta content="https://yourdomain.com/icons/apple-touch-icon.png" property="og:image" />
        </Head>
        <Navigation />
        <Component { ...pageProps } />
    </div>
);

export default MyApp;

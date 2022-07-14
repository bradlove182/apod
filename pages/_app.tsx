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
        </Head>
        <Navigation />
        <Component { ...pageProps } />
    </div>
);

export default MyApp;

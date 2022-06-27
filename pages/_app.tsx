import React from "react";

import "../styles/globals.css";

import { Navigation } from "../components/navigation";

import type { AppProps } from "next/app";

const MyApp = ({
    Component,
    pageProps
}: AppProps): React.ReactElement => (
    <React.Fragment>
        <Navigation />
        <Component { ...pageProps } />
    </React.Fragment>
);

export default MyApp;

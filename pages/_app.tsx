import React from "react";

import "../styles/globals.css";
import { Navigation } from "../components/navigation";

import style from "./_app.module.css";


import type { AppProps } from "next/app";

const MyApp = ({
    Component,
    pageProps
}: AppProps): React.ReactElement => (
    <div className={ style.app }>
        <Navigation />
        <Component { ...pageProps } />
    </div>
);

export default MyApp;

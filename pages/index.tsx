import React from "react";
import Head from "next/head";

import type { NextPage } from "next";

const Home: NextPage = () => (
    <div>
        <Head>
            <title>
                { "Apod - Home" }
            </title>
        </Head>
        { "Home" }
    </div>
);

export default Home;

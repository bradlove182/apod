import React from "react";
import Head from "next/head";

import { getPicture } from "../data/api/picture";
import { dateToString } from "../utils/date";

import type {
    GetStaticProps,
    NextPage
} from "next";
import type { Picture } from "../data/api/picture/types";

const Home: NextPage<Picture> = ({
    title,
    url
}) => (
    <div>
        <Head>
            <title>
                { "Astronmy Picture of the Day" }
            </title>
        </Head>
        <h1>
            { title }
        </h1>
        <img alt={ title } src={ url } />
    </div>
);

export const getStaticProps: GetStaticProps = async () => {

    const picture = await getPicture({
        date: dateToString(new Date())
    });

    return {
        props: {
            ...picture
        },
        revalidate: 60
    };

};

export default Home;

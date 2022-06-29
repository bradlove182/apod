import React from "react";
import Head from "next/head";

import { getPicture } from "../data/api/picture";
import { dateToString } from "../utils/date";

import type {
    GetStaticProps,
    NextPage
} from "next";
import type { Picture } from "../data/api/picture/types";

export interface HomePageProps{
    picture: Picture;
}

export const Home: NextPage<HomePageProps> = ({
    picture
}) => (
    <div
        className="h-100 bg-cover bg-center grid content-end p-16"
        style={ {
            backgroundImage: `url(${ picture.url })`
        } }
    >
        <Head>
            <title>
                { "Astronomy Picture of the Day" }
            </title>
        </Head>
        <div className="absolute top-0 left-0 h-screen w-screen z-0 bg-gradient-to-t from-black via-transparent" />
        <div className="relative grid grid-cols-2 grid-rows-1 z-10">
            <div className="col-span-1 col-start-1 prose">
                <h1>
                    { picture.title }
                </h1>
            </div>
        </div>
    </div>
);

export const getStaticProps: GetStaticProps = async () => {

    const today = new Date();

    const picture = await getPicture({
        date: dateToString(today)
    });

    return {
        props: {
            picture
        },
        revalidate: 60
    };

};

export default Home;

import React from "react";
import Head from "next/head";

import { getPictures } from "../data/api/picture";
import { dateToString } from "../utils/date";

import type {
    GetStaticProps,
    NextPage
} from "next";
import type { Picture } from "../data/api/picture/types";

export interface HomePageProps{
    today: Picture;
    yesterday: Picture;
}

export const Home: NextPage<HomePageProps> = ({
    today,
    yesterday
}) => (
    <div
        className="h-screen bg-cover bg-center grid content-end p-16"
        style={ {
            backgroundImage: `url(${ today.url })`
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
                    { today.title }
                </h1>
            </div>
            <div className="col-span-1 col-start-2s">
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure>
                        <div
                            className="h-full w-32 bg-center bg-cover"
                            style={ {
                                backgroundImage: `url(${ yesterday.url })`
                            } }
                        />
                    </figure>
                    <div className="card-body">
                        <div className="card-actions justify-between items-center">
                            <a className="btn btn-primary" href={ `/${ yesterday.date }` }>
                                { ">" }
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
);

export const getStaticProps: GetStaticProps = async () => {

    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 1);

    const pictures = await getPictures({
        endDate: dateToString(end),
        startDate: dateToString(start)
    });

    return {
        props: {
            today: pictures[1],
            yesterday: pictures[0]
        },
        revalidate: 60
    };

};

export default Home;

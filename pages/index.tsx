import React, { useEffect } from "react";
import Head from "next/head";
import { DateTime } from "luxon";

import { PictureOfTheDay } from "../components/picture";
import { getPicture } from "../data/api/picture";
import useStore from "../store";

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
}) => {

    const setDate = useStore((state) => state.setDate);

    useEffect(() => {

        setDate(DateTime.utc().toJSDate());

    }, [setDate]);

    return (
        <React.Fragment>
            <Head>
                <title>
                    { "Astronomy Picture of the Day" }
                </title>
            </Head>
            <PictureOfTheDay picture={ picture } />
        </React.Fragment>
    );

};

export const getStaticProps: GetStaticProps = async () => {

    const picture = await getPicture({
        date: DateTime.utc().toISODate()
    });

    return {
        props: {
            picture
        },
        revalidate: 60
    };

};

export default Home;

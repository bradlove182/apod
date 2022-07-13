import React, { useEffect } from "react";
import Head from "next/head";
import { DateTime } from "luxon";
import { camelCase } from "change-case";

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

    }, []);

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

    let picture = {};

    const response = await getPicture({
        date: DateTime.utc().toISODate()
    });

    Object.keys(response).map((key) => key).forEach((key) => {
        picture = {
            ...picture,
            [camelCase(key)]: response[key]
        };
    });

    return {
        props: {
            picture
        },
        revalidate: 60
    };

};

export default Home;

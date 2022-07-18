
import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DateTime } from "luxon";

import {
    getPicture,
    getPictures
} from "../../data/api/picture";
import { PictureOfTheDay } from "../../components/picture";
import { PictureOfTheDayFallback } from "../../components/picture/fallback";
import useStore from "../../store";

import type { Picture } from "../../data/api/picture/types";
import type {
    GetStaticPaths,
    GetStaticProps,
    NextPage
} from "next";

interface PicturePageProps{
    picture: Picture;
}

export const PicturePage: NextPage<PicturePageProps> = ({
    picture
}) => {

    const router = useRouter();

    const setDate = useStore((state) => state.setDate);

    useEffect(() => {

        if(router.isFallback){
            return;
        }

        setDate(DateTime.fromISO(picture.date).toJSDate());

    }, [router.isFallback, picture]);

    if(router.isFallback){
        return (
            <PictureOfTheDayFallback />
        );
    }

    return (
        <React.Fragment>
            <Head>
                <title>
                    { picture.title }
                </title>
            </Head>
            <PictureOfTheDay picture={ picture } />
        </React.Fragment>
    );

};

export const getStaticPaths: GetStaticPaths = async () => {

    const end = DateTime.utc().toISODate();
    const start = DateTime.utc().minus({ days: 7 }).toISODate();

    const pictures: Picture[] = await getPictures({
        endDate: end,
        startDate: start
    });

    const paths = pictures.map((pic) => ({
        params: {
            date: pic.date
        }
    }));

    return {
        fallback: true,
        paths
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

    let picture = {} as Picture;

    picture = await getPicture({
        date: String(params!.date)
    });

    if(!picture.date){

        return {
            notFound: true
        };

    }

    return {
        props: {
            picture
        }
    };

};

export default PicturePage;

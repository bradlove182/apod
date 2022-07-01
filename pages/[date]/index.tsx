
import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DateTime } from "luxon";

import {
    getPicture,
    getPictures
} from "../../data/api/picture";
import { dateToString } from "../../utils/date";
import { PictureOfTheDay } from "../../components/picture";
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

        if(!router.isFallback){

            setDate(DateTime.fromISO(picture.date).toJSDate());

        }


    }, [router.isFallback]);

    if(router.isFallback){
        return (
            <div>
                { "Loading" }
            </div>
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

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 7);

    const pictures = await getPictures({
        endDate: dateToString(end),
        startDate: dateToString(start)
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

    const picture = await getPicture({
        date: String(params!.date)
    });

    return {
        props: {
            picture
        }
    };

};

export default PicturePage;

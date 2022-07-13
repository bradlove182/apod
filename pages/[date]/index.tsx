
import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DateTime } from "luxon";
import { camelCase } from "change-case";

import {
    getPicture,
    getPictures
} from "../../data/api/picture";
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

    let picture = {};

    if(params?.date){

        const response = await getPicture({
            date: String(params.date)
        });

        Object.keys(response).map((key) => key).forEach((key) => {
            picture = {
                ...picture,
                [camelCase(key)]: response[key]
            };
        });

    }

    return {
        props: {
            picture
        }
    };

};

export default PicturePage;

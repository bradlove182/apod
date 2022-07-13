
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

    const pictures: Picture[] = process.env.NODE_ENV === "development" ? [{
        copyright: "Jose J. Chambo",
        date: "2022-06-30",
        // eslint-disable-next-line max-len -- bru
        explanation: "Imaged on June 20 2022, comet C/2017 K2 (PanSTARRS) shares this wide telescopic field of view with open star cluster IC 4665 and bright star Beta Ophiuchi, near a starry edge of the Milky Way. On its maiden voyage to the inner Solar System from the dim and distant Oort cloud, this comet PanSTARRS was initially spotted over five years ago, in May 2017. Then it was the most distant active inbound comet ever found, discovered when it was some 2.4 billion kilometers from the Sun. That put it between the orbital distances of Uranus and Saturn. Hubble Space Telescope observations indicated the comet had a large nucleus less than 18 kilometers in diameter.  Now visible in small telescopes C/2017 K2 will make its closest approach to planet Earth on July 14 and closest approach to the Sun this December. Its extended coma and developing tail are seen here at a distance of some 290 million kilometers, a mere 16 light-minutes away.",
        hdurl: "https://apod.nasa.gov/apod/image/2206/2017K2_2022-06-20_media.jpg",
        mediaType: "image",
        serviceVersion: "v1",
        title: "Comet C/2017 K2 (PanSTARRS)",
        url: "https://apod.nasa.gov/apod/image/2206/2017K2_2022-06-20_media1024.jpg"
    }] : await getPictures({
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


import React from "react";

import {
    getPicture,
    getPictures
} from "../../data/api/picture";
import { dateToString } from "../../utils/date";

import type { Picture } from "../../data/api/picture/types";
import type {
    GetStaticPaths,
    GetStaticProps,
    NextPage
} from "next";

export const PicturePage: NextPage<Picture> = ({
    title
}) => (
    <div>
        { title }
    </div>
);

export const getStaticPaths: GetStaticPaths = async () => {

    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 10);

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

export const getStaticProps: GetStaticProps = async (context) => {

    const { params } = context;

    const picture = await getPicture({
        date: String(params!.date)
    });

    return {
        props: {
            ...picture
        }
    };

};

export default PicturePage;

import React from "react";

import { getPicture } from "../../data/api/picture";
import { PictureOfTheDay } from "../../components/picture";
import { Metadata } from "next";

const generateMetadata = async ({ params }: { params: { date: string } }): Promise<Metadata> => {

    const picture = await getPicture({
        date: params.date
    });

    return {
        title: picture.title,
        description: picture.explanation,
        openGraph: {
            title: picture.title,
            images: picture.url,
            description: picture.explanation
        },
        twitter: {
            card: "summary",
            title: picture.title,
            images: "https://apod.bradlove.dev/icons/icon-192x192.png",
            site: "https://apod.bradlove.dev/",
            description: picture.explanation
        },
    }

};

const Page = async ({ params }: { params: { date: string } }): Promise<React.ReactElement> => {

    const picture = await getPicture({
        date: params.date
    });

    return (
        <PictureOfTheDay picture={ picture } />
    );

};

export { generateMetadata };
export default Page;

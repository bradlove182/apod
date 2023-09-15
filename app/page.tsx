import React from "react";
import { DateTime } from "luxon";

import { getPicture } from "../data/api/picture";
import { PictureOfTheDay } from "../components/picture";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const generateMetadata = async (): Promise<Metadata> => {
    const picture = await getPicture({
        date: DateTime.utc().toISODate()!,
    });

    if (!picture.title) {
        return {};
    }

    return {
        title: picture.title,
        description: picture.explanation,
        openGraph: {
            title: picture.title,
            images: picture.url,
            description: picture.explanation,
        },
        twitter: {
            card: "summary",
            title: picture.title,
            images: picture.url,
            site: "https://apod.bradlove.dev/",
            description: picture.explanation,
        },
    };
};

const Page = async (): Promise<React.ReactElement> => {
    const picture = await getPicture({
        date: DateTime.utc().toISODate(),
    });

    if (!picture) {
        notFound();
    }

    return <PictureOfTheDay picture={picture} />;
};

export { generateMetadata };
export default Page;

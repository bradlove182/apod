import React from "react";

import { getPicture } from "../../data/api/picture";
import { PictureOfTheDay } from "../../components/picture";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const generateMetadata = async ({
    params,
}: {
    params: { date: string };
}): Promise<Metadata> => {
    const picture = await getPicture({
        date: params.date,
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

const Page = async ({
    params,
}: {
    params: { date: string };
}): Promise<React.ReactElement> => {
    const picture = await getPicture({
        date: params.date,
    });

    if (!picture.title) {
        notFound();
    }

    return <PictureOfTheDay picture={picture} />;
};

export { generateMetadata };
export default Page;

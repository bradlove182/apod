import React from "react";

import { getPicture } from "../../data/api/picture";
import { PictureOfTheDay } from "../../components/picture";

const Page = async ({ params }: { params: { date: string } }): Promise<React.ReactElement> => {

    const picture = await getPicture({
        date: params.date
    });

    return (
        <PictureOfTheDay picture={ picture } />
    );

};

export default Page;

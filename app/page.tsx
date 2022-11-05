
import React from "react";
import { DateTime } from "luxon";

import { getPicture } from "../data/api/picture";
import { PictureOfTheDay } from "../components/picture";

const Page = async (): Promise<React.ReactElement> => {

    const picture = await getPicture({
        date: DateTime.utc().toISODate()
    });

    return (
        <PictureOfTheDay picture={ picture } />
    );

};

export default Page;


import { DateTime } from "luxon";
import React from "react";

import { getPicture } from "../data/api/picture";

const Head = async (): Promise<React.ReactElement> => {

    const picture = await getPicture({
        date: DateTime.utc().toISODate()
    });

    return (
        <React.Fragment>
            <meta content={ picture.url } property="og:image" />
            <meta content={ picture.title } property="og:title" />
            <meta content={ picture.explanation } property="og:description" />
        </React.Fragment>
    );
};

export default Head;


import React from "react";

import { getPicture } from "../../data/api/picture";

const Head = async ({ params }: { params: { date: string } }): Promise<React.ReactElement> => {

    const picture = await getPicture({
        date: params.date
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

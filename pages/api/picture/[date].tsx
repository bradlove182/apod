

import { getPicture } from "../../../data/api/picture";

import type {
    NextApiRequest,
    NextApiResponse
} from "next";
import type { Picture } from "../../../data/api/picture/types";

const handler = async (request: NextApiRequest, response: NextApiResponse<Picture>): Promise<void> => {

    const { date } = request.query;

    const data = await getPicture({
        date: String(date)
    });

    response.status(200).json(data);
};

export default handler;


import type {
    NextApiRequest,
    NextApiResponse
} from "next";
import type { Picture } from "../../../data/api/picture/types";

const handler = async (request: NextApiRequest, response: NextApiResponse<Picture>): Promise<void> => {

    const data = await fetch(`
        https://api.nasa.gov/planetary/apod?api_key=${ String(process.env.NASA_OPEN_API_KEY) }
    `);

    const json = await data.json() as Picture;

    response.status(200).json(json);
};

export default handler;

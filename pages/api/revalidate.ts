import type {
    NextApiRequest,
    NextApiResponse
} from "next";

type Response = Partial<{
    message: "Error Revalidating" | "Invalid Token";
    revalidated: boolean;
}>;

export default async function handler(request: NextApiRequest, response: NextApiResponse<Response>): Promise<void>{

    if(request.query.secret !== process.env.APOD_REVALIDATE){
        response.status(401).json({ message: "Invalid Token" });
        return;
    }

    try{

        await response.revalidate("/");
        response.status(200).json({ revalidated: true });
        return;

    }catch{

        response.status(500).json({ message: "Error Revalidating" });

    }
}

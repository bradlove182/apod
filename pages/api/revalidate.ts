import type {
    NextApiRequest,
    NextApiResponse
} from "next";

type Response = "Error revalidating" | { revalidated: boolean };

export default async function handler(request: NextApiRequest, response: NextApiResponse<Response>): Promise<void>{
    if(request.method === "POST"){

        try{
            const { authorization } = request.headers;

            if(authorization === `Bearer ${ process.env.APOD_REVALIDATE! }`){
                await response.revalidate("/");
                response.status(200).json({ revalidated: true });
            }

        }catch{

            response.status(500).send("Error revalidating");

        }

    }else{

        response.setHeader("Allow", "POST");
        response.status(405).end("Method Not Allowed");

    }
}

import { stringify } from "query-string";
import { snakeCase } from "change-case";


export const get = async <RequestType extends Record<string, unknown>, ResponseType>(props: RequestType): Promise<ResponseType> => {

    let query = {};
    const keys = Object.keys(props).map((key) => key);

    keys.forEach((key) => {
        query = {
            ...query,
            [snakeCase(key)]: props[key]
        };
    });

    const response = await fetch(`
        https://api.nasa.gov/planetary/apod?api_key=${ String(process.env.NASA_OPEN_API_KEY) }&${ stringify(query) }
    `);

    return await response.json() as ResponseType;

};

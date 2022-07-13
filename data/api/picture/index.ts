
import { camelCase } from "change-case";

import { get } from "..";

import type {
    GetPicture,
    GetPictures,
    Picture
} from "./types";

export const getPicture = async (props: GetPicture): Promise<Picture> => {

    let picture = {} as Picture;

    const response = await get<GetPicture, Picture>(props);

    Object.keys(response).map((key) => key).forEach((key) => {
        picture = {
            ...picture,
            [camelCase(key)]: response[key]
        };
    });

    return picture;

};

export const getPictures = async (props: GetPictures): Promise<Picture[]> => get<GetPictures, Picture[]>(props);



import { get } from "..";

import type {
    GetPicture,
    GetPictures,
    Picture
} from "./types";

export const getPicture = async (props: GetPicture): Promise<Picture> => get<GetPicture, Picture>(props);

export const getPictures = async (props: GetPictures): Promise<Picture[]> => get<GetPictures, Picture[]>(props);


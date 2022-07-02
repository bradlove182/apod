
import React from "react";

import type { Picture } from "../../data/api/picture/types";

export interface PictureOfTheDayProps{
    picture: Picture;
}

export const PictureOfTheDay: React.ComponentType<PictureOfTheDayProps> = ({
    picture
}) => (
    <div
        className="h-full bg-cover bg-center grid content-end p-16 z-1 relative"
        style={ {
            backgroundImage: `url(${ picture.hdurl })`
        } }
    >
        <div className="absolute top-0 left-0 right-0 bottom-0 z-0 bg-gradient-to-t from-black via-transparent" />
        <div className="relative grid grid-cols-2 grid-rows-1 z-1">
            <div className="col-span-1 col-start-1 prose">
                <h1>
                    { picture.title }
                </h1>
                <p>
                    { picture.explanation }
                </p>
            </div>
        </div>
    </div>
);


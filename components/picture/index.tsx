
import React, {
    useEffect,
    useRef,
    useState
} from "react";

import { PictureActions } from "./actions";

import type { Picture } from "../../data/api/picture/types";

export interface PictureOfTheDayProps{
    picture: Picture;
}

export const PictureOfTheDay: React.ComponentType<PictureOfTheDayProps> = ({
    picture
}) => {

    const [dimensions, setDimensions] = useState<{
        width: number;
        height: number;
    }>({
        height: 1080,
        width: 1920
    });
    const image = useRef<HTMLImageElement>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        setLoading(true);
        const loadImage = new Image();
        loadImage.src = picture.url;

        loadImage.addEventListener("load", () => {
            if(image.current){
                image.current.src = loadImage.src;
                setDimensions({
                    height: loadImage.height,
                    width: loadImage.width
                });
                setLoading(false);
            }
        });

    }, [picture.url]);

    return (
        <div className="grid auto-rows-min">
            <div
                className={ [
                    "relative bg-base-300 flex align-center justify-center relative overflow-hidden",
                    loading ? "animate-pulse" : ""
                ].filter(Boolean).join(" ") }
                style={ {
                    height: `${ dimensions.height / dimensions.width * 100 }vh`,
                    transition: "height .3s ease-out"
                } }
            >
                <div
                    className={ [
                        "absolute h-full w-full z-0 bg-cover bg-center blur-lg",
                        loading ? "hidden" : "visible"
                    ].filter(Boolean).join(" ") }
                    style={ image.current ? {
                        backgroundImage: `url(${ image.current.src })`
                    } : {} }
                />
                <img
                    alt={ picture.title }
                    className={ [
                        "z-10",
                        loading ? "hidden" : "visible"
                    ].filter(Boolean).join(" ") }
                    loading="lazy"
                    ref={ image }
                />
                <div className="absolute bottom-0 left-0 w-full">
                    <div className="container mx-auto flex justify-end p-2">
                        <PictureActions />
                    </div>
                </div>
            </div>
            <div className="container mx-auto my-8 p-2">
                <div className="prose">
                    <h1>
                        { picture.title }
                    </h1>
                    {
                        picture.copyright ? (
                            <div className="flex gap-2">

                                <span className="badge">
                                    { `Image Credit & Copyright: ${ picture.copyright }` }
                                </span>
                            </div>
                        ) : undefined
                    }
                    <p>
                        { picture.explanation }
                    </p>
                </div>
                <pre>
                    {
                        JSON.stringify(picture, undefined, 4)
                    }
                </pre>
            </div>
        </div>
    );

};


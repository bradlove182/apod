
import React, {
    useEffect,
    useRef,
    useState
} from "react";

import { PictureActions } from "./actions";

import type { Picture } from "../../data/api/picture/types";

const calculateDimensions = (width: number, height: number): number => {

    const response = (width > height ? height / width : width / height) * 100;

    return response > 66.6 ? 66.6 : response;

};

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
    const frame = useRef<HTMLIFrameElement>(null);
    const image = useRef<HTMLImageElement>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const currentFrame = frame.current;

        setLoading(true);

        if(picture.mediaType === "image"){

            const newImage = new Image();
            newImage.src = picture.url;

            const loadImage = (): void => {
                if(image.current){
                    image.current.src = newImage.src;
                    setDimensions({
                        height: newImage.height,
                        width: newImage.width
                    });
                    setLoading(false);
                }
            };

            newImage.addEventListener("load", loadImage);

            return () => {
                newImage.removeEventListener("load", loadImage);
            };

        }

        const loadFrame = (): void => {
            setDimensions({
                height: window.innerWidth / 1.25,
                width: window.innerWidth
            });
            setLoading(false);
        };

        currentFrame?.addEventListener("load", loadFrame);

        return () => {
            currentFrame?.removeEventListener("load", loadFrame);
        };


    }, [picture.url, picture.mediaType]);

    return (
        <div className="grid auto-rows-min">
            <div
                className={ [
                    "relative bg-base-300 flex align-center justify-center relative overflow-hidden",
                    loading ? "bg-gradient-to-r from-base-300 via-neutral to-base-300 background-animate" : ""
                ].filter(Boolean).join(" ") }
                style={ {
                    height: `${ calculateDimensions(dimensions.width, dimensions.height) }vh`,
                    transition: "height .3s ease-out"
                } }
            >
                {
                    picture.mediaType === "image" ? (
                        <React.Fragment>
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
                                    "z-10 ",
                                    loading ? "hidden" : "visible"
                                ].filter(Boolean).join(" ") }
                                height={ dimensions.height }
                                loading="lazy"
                                ref={ image }
                                style={ {
                                    objectFit: "contain"
                                } }
                                width={ dimensions.width }
                            />
                        </React.Fragment>
                    ) : (
                        // eslint-disable-next-line react/iframe-missing-sandbox -- Unsafe I know
                        <iframe
                            height="100%"
                            ref={ frame }
                            src={ picture.url }
                            width="100%"
                        />
                    )


                }
            </div>
            <div className="container mx-auto my-8 p-2">
                <div className="prose md:prose-lg">
                    <h1>
                        { picture.title }
                    </h1>
                    {
                        picture.copyright ? (
                            <div className="flex gap-2">
                                <span className="badge">
                                    { `Credit & Copyright: ${ picture.copyright }` }
                                </span>
                            </div>
                        ) : undefined
                    }
                    <p>
                        { picture.explanation }
                    </p>
                    <PictureActions picture={ picture } />
                </div>
            </div>
        </div>
    );

};


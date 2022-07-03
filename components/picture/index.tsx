
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

    const image = useRef<HTMLImageElement>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const loadImage = new Image();
        loadImage.src = picture.url;

        loadImage.addEventListener("load", () => {
            if(image.current){
                image.current.src = loadImage.src;
                setLoading(false);
            }
        });

    }, []);

    return (
        <div className="grid auto-rows-min">
            <div className="relative bg-base-300 flex align-center justify-center h-[56.25vh] relative">
                {
                    loading ? "Loading" : (
                        <React.Fragment>
                            <img alt={ picture.title } loading="lazy" ref={ image } />
                            <div className="absolute bottom-0 left-0 w-full">
                                <div className="container mx-auto flex justify-end p-2">
                                    <PictureActions />
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }
            </div>
            <div className="container mx-auto my-8 p-2">
                <div className="prose">
                    <div className="flex space-between">
                        <h1>
                            { picture.title }
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        {
                            picture.copyright ? (
                                <span className="badge">
                                    { `Copyright: ${ picture.copyright }` }
                                </span>
                            ) : undefined
                        }
                    </div>
                    <p>
                        { picture.explanation }
                    </p>
                </div>
            </div>
        </div>
    );

};


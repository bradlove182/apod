
import React, {
    useEffect,
    useRef,
    useState
} from "react";

import { PictureActions } from "./actions";

import type { Picture } from "../../data/api/picture/types";

export interface PictureOfTheDayProps{
    pictures: Picture[];
}

export const PictureOfTheDay: React.ComponentType<PictureOfTheDayProps> = ({
    pictures
}) => {

    const image = useRef<HTMLImageElement>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const loadImage = new Image();
        loadImage.src = pictures[0].url;

        loadImage.addEventListener("load", () => {
            if(image.current){
                image.current.src = loadImage.src;
                setLoading(false);
            }
        });

    }, []);

    return (
        <div className="grid auto-rows-min">
            <div className="relative bg-base-300 flex align-center justify-center h-[56.25vh] relative overflow-hidden">
                {
                    loading ? "Loading" : undefined
                }
                <div
                    className="absolute h-full w-full z-0 bg-cover bg-center blur-lg" style={ image.current ? {
                        backgroundImage: `url(${ image.current.src })`
                    } : {} }
                />
                <img
                    alt={ pictures[0].title }
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
                <div className="grid grid-cols-2 gap-16">
                    <div className="prose">
                        <h1>
                            { pictures[0].title }
                        </h1>
                        {
                            pictures[0].copyright ? (
                                <div className="flex gap-2">

                                    <span className="badge">
                                        { `Image Credit & Copyright: ${ pictures[0].copyright }` }
                                    </span>
                                </div>
                            ) : undefined
                        }
                        <p>
                            { pictures[0].explanation }
                        </p>
                    </div>
                    {
                        pictures[1] ? (
                            <div className="card bg-base-200 h-min shadow-xl lg:card-side">
                                <figure>
                                    <img alt={ pictures[1].title } src={ pictures[1].url } width="20%" />
                                </figure>
                                <div className="card-body">
                                    <span className="badge">
                                        { "Yesterday" }
                                    </span>
                                    <h2 className="card-title">
                                        { pictures[1].title }
                                    </h2>
                                    <p>
                                        { pictures[1].explanation.slice(0, 120) }
                                    </p>
                                </div>
                            </div>
                        ) : undefined
                    }

                </div>
            </div>
        </div>
    );

};


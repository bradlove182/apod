
import React from "react";

export const PictureOfTheDayFallback: React.ComponentType = () => (
    <div className="grid auto-rows-min">
        <div
            className="
                    relative
                    bg-base-300
                    flex
                    align-center
                    justify-center
                    overflow-hidden
                    bg-gradient-to-r
                    from-base-300
                    via-neutral
                    to-base-300
                    background-animate
                "
            style={ {
                height: "66.6vh",
                width: "100%"
            } }
        />
        <div className="container mx-auto my-8 p-2">
            <div className="prose md:prose-lg">
                <h1 className="
                    bg-gradient-to-r
                    from-base-300
                    via-neutral
                    to-base-300
                    background-animate
                    h-12
                    rounded-lg
                "
                />
                <span className="
                    bg-gradient-to-r
                    from-base-300
                    via-neutral
                    to-base-300
                    background-animate
                    h-4
                    rounded-lg
                    w-32
                    block
                "
                />
                <p className="
                    bg-gradient-to-r
                    from-base-300
                    via-neutral
                    to-base-300
                    background-animate
                    h-4
                    rounded-lg
                "
                />
                <p className="
                    bg-gradient-to-r
                    from-base-300
                    via-neutral
                    to-base-300
                    background-animate
                    h-4
                    w-2/3
                    rounded-lg
                "
                />
                <p className="
                    bg-gradient-to-r
                    from-base-300
                    via-neutral
                    to-base-300
                    background-animate
                    h-4
                    w-1/2
                    rounded-lg
                "
                />
                <p className="
                    bg-gradient-to-r
                    from-base-300
                    via-neutral
                    to-base-300
                    background-animate
                    btn
                    btn-square
                "
                />
            </div>
        </div>
    </div>
);


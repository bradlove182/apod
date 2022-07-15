
import React, { useCallback } from "react";

import type { Picture } from "../../../data/api/picture/types";

export interface PictureActionsProps{
    picture: Picture;
}

export const PictureActions: React.ComponentType<PictureActionsProps> = ({
    picture
}) => {

    const share = useCallback(() => {

        const data = {
            text: picture.explanation,
            title: picture.title,
            url: window.location.href
        };

        void navigator.share(data);

    }, [picture]);

    return (
        <React.Fragment>
            <div className="gap-2 flex relative z-20">
                <div className="tooltip tooltip-left" data-tip="Share Image">
                    <button aria-label="Share Image" className="btn btn-square btn-sm" onClick={ share } type="button">
                        <svg
                            fill="none"
                            height="20"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                        </svg>
                    </button>
                </div>
                <div className="tooltip tooltip-left" data-tip="Download Image">
                    <a aria-label="Download Image" className="btn btn-square btn-sm" href={ picture.hdurl } rel="noreferrer" target="_blank">
                        <svg
                            fill="none"
                            height="20"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                        </svg>
                    </a>
                </div>
            </div>
        </React.Fragment>
    );

};

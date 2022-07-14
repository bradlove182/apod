
import React from "react";

import type { Picture } from "../../../data/api/picture/types";

export interface PictureActionsProps{
    picture: Picture;
}

export const PictureActions: React.ComponentType<PictureActionsProps> = ({
    picture
}) => (
    <React.Fragment>
        <div className="gap-2 flex relative z-20">
            <div className="tooltip tooltip-right" data-tip="Download Image">
                <a aria-label="Download Image" className="btn btn-square" href={ picture.hdurl } rel="noreferrer" target="_blank">
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

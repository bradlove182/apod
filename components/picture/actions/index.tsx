
import React from "react";

import { DownloadIcon } from "../../../icons";

import type { Picture } from "../../../data/api/picture/types";


export interface PictureActionsProps{
    picture: Picture;
}

export const PictureActions: React.ComponentType<PictureActionsProps> = ({
    picture
}) => (
    <div className="gap-2 flex relative z-20">
        <div className="tooltip tooltip-left" data-tip="Download Image">
            <a aria-label="Download Image" className="btn btn-square btn-sm" href={ picture.hdurl } rel="noreferrer" target="_blank">
                <DownloadIcon />
            </a>
        </div>
    </div>
);


import React, {
    useCallback,
    useRef
} from "react";

import {
    DownloadIcon,
    ShareIcon
} from "../../../icons";
import { ShareModal } from "../share-modal";

import type { Picture } from "../../../data/api/picture/types";


export interface PictureActionsProps{
    picture: Picture;
}

export const PictureActions: React.ComponentType<PictureActionsProps> = ({
    picture
}) => {

    const shareToggle = useRef<HTMLInputElement>(null);

    const handleShareToggle = useCallback(() => {

        if(shareToggle.current){

            shareToggle.current.checked = true;

        }

    }, []);

    return (
        <React.Fragment>
            <div className="gap-2 flex relative z-20">
                <div className="tooltip tooltip-left" data-tip="Share Image">
                    <button aria-label="Share Image" className="btn btn-square btn-sm" onClick={ handleShareToggle } type="button">
                        <ShareIcon />
                    </button>
                </div>
                <div className="tooltip tooltip-left" data-tip="Download Image">
                    <a aria-label="Download Image" className="btn btn-square btn-sm" href={ picture.hdurl } rel="noreferrer" target="_blank">
                        <DownloadIcon />
                    </a>
                </div>
            </div>
            <ShareModal picture={ picture } ref={ shareToggle } />
        </React.Fragment>
    );

};

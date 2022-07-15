
import React, {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

import {
    DownloadIcon,
    FacebookIcon,
    LinkedInIcon,
    MailIcon,
    ShareIcon,
    TwitterIcon
} from "../../../icons";

import type { Picture } from "../../../data/api/picture/types";


export interface PictureActionsProps{
    picture: Picture;
}

export const PictureActions: React.ComponentType<PictureActionsProps> = ({
    picture
}) => {

    const shareToggle = useRef<HTMLInputElement>(null);
    const [shareLink, setShareLink] = useState<string>("");

    const handleShareToggle = useCallback(() => {

        if(shareToggle.current){

            shareToggle.current.checked = true;

        }

    }, []);

    useEffect(() => {

        setShareLink(window.location.href);

    }, [picture]);

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
            <input aria-hidden="true" className="modal-toggle hidden" id="share-modal" ref={ shareToggle } type="checkbox" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box relative">
                    <div className="prose">
                        <h3 className="text-center mb-4">
                            { "Share" }
                        </h3>
                    </div>
                    <div className="gap-2 flex relative justify-center">
                        <a
                            aria-label="Share Facebook"
                            className="btn btn-square"
                            href={ `https://www.facebook.com/sharer.php?u=${ shareLink }` }
                            rel="noreferrer"
                            target="_blank"
                        >
                            <FacebookIcon />
                        </a>
                        <a
                            aria-label="Share Twitter"
                            className="btn btn-square"
                            href={ `https://twitter.com/share?url=${ shareLink }&text=${ picture.title }` }
                            rel="noreferrer"
                            target="_blank"
                        >
                            <TwitterIcon />
                        </a>
                        <a
                            aria-label="Share LinkedIn"
                            className="btn btn-square"
                            href={ `https://www.linkedin.com/shareArticle?mini=true&url=${ shareLink }` }
                            rel="noreferrer"
                            target="_blank"
                        >
                            <LinkedInIcon />
                        </a>
                        <a
                            aria-label="Share Email"
                            className="btn btn-square"
                            href={ `mailto:?&subject=Astronomy Picture of the Day: ${ picture.title }&body=${ picture.explanation } - ${ shareLink }` }
                            rel="noreferrer"
                            target="_blank"
                        >
                            <MailIcon />
                        </a>
                    </div>
                    <div className="modal-action">
                        <label className="btn btn-ghost btn-block" htmlFor="share-modal">
                            {"Close"}
                        </label>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

};


import React, {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

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
            <input aria-hidden="true" className="modal-toggle hidden" id="share-modal" ref={ shareToggle } type="checkbox" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box relative">
                    <div className="prose">
                        <h3>
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
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                        <a
                            aria-label="Share Twitter"
                            className="btn btn-square"
                            href={ `https://twitter.com/share?url=${ shareLink }&text=${ picture.title }` }
                            rel="noreferrer"
                            target="_blank"
                        >

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
                                <path d="
                                    M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3
                                    4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z
                                "
                                />
                            </svg>
                        </a>
                    </div>
                    <div className="modal-action">
                        <label className="btn btn-ghost" htmlFor="share-modal">
                            {"Close"}
                        </label>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

};

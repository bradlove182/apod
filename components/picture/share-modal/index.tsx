
import React, {
    forwardRef,
    useEffect,
    useState
} from "react";

import {
    FacebookIcon,
    LinkedInIcon,
    MailIcon,
    TwitterIcon
} from "../../../icons";

import type { Picture } from "../../../data/api/picture/types";

interface ShareModalProps{
    picture: Picture;
}

const ShareModal = forwardRef<HTMLInputElement, ShareModalProps>(({
    picture
}, reference) => {

    const [shareLink, setShareLink] = useState<string>("");

    useEffect(() => {

        setShareLink(window.location.href);

    }, [picture]);

    return (
        <React.Fragment>
            <input aria-hidden="true" className="modal-toggle hidden" id="share-modal" ref={ reference } type="checkbox" />
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
});

ShareModal.displayName = "ShareModal";

export type { ShareModalProps };
export { ShareModal };

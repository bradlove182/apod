
import React, {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Calendar } from "../calendar";
import {
    ApodIcon,
    InfoIcon
} from "../../icons";

import { NavigationActions } from "./actions";


export const Navigation: React.ComponentType = () => {

    const modalToggle = useRef<HTMLInputElement>(null);
    const infoToggle = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleModalToggle = useCallback(() => {

        if(modalToggle.current){

            modalToggle.current.checked = true;

        }

    }, []);

    const handleInfoToggle = useCallback(() => {

        if(infoToggle.current){

            infoToggle.current.checked = true;

        }

    }, []);

    const handleRouteChange = useCallback(() => {

        if(modalToggle.current){

            modalToggle.current.checked = false;

        }

        if(infoToggle.current){

            infoToggle.current.checked = false;

        }

        setLoading((previous) => !previous);

    }, []);

    useEffect(() => {

        router.events.on("routeChangeStart", handleRouteChange);
        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off("routeChangeStart", handleRouteChange);
            router.events.off("routeChangeComplete", handleRouteChange);
        };

    }, [
        handleRouteChange,
        router
    ]);

    return (
        <React.Fragment>
            <div className="sticky backdrop-blur bg-opacity-90 inset-0 bg-base-100 z-50">
                <nav className="navbar m-auto container">
                    <div className="navbar-start">
                        <div className="tooltip tooltip-bottom sm:tooltip-right" data-tip="Today">
                            <Link href="/">
                                <button
                                    aria-label="Today's Astronomy Image"
                                    className="btn btn-tertiary btn-square"
                                    disabled={ loading }
                                    type="button"
                                >
                                    <ApodIcon />
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <NavigationActions
                            handleModalToggle={ handleModalToggle }
                            loading={ loading }
                        />
                    </div>
                    <div className="navbar-end">
                        <div className="tooltip tooltip-bottom sm:tooltip-left" data-tip="Info">
                            <button
                                aria-label="Astronomy Picture of the Day"
                                className="btn btn-square"
                                disabled={ loading }
                                onClick={ handleInfoToggle }
                                type="button"
                            >
                                <InfoIcon />
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
            <input aria-hidden="true" className="modal-toggle hidden" id="calander-modal" ref={ modalToggle } type="checkbox" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box relative">
                    <Calendar />
                    <div className="modal-action">
                        <label className="btn btn-ghost btn-block" htmlFor="calander-modal">
                            {"Close"}
                        </label>
                    </div>
                </div>
            </div>
            <input aria-hidden="true" className="modal-toggle hidden" id="info-modal" ref={ infoToggle } type="checkbox" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box relative">
                    <div className="prose">
                        <h3>
                            { "Astronomy Picture of the Day" }
                        </h3>
                        <p>
                            { /* eslint-disable-next-line max-len -- bra */ }
                            { "Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer." }
                        </p>
                    </div>
                    <div className="modal-action">
                        <a className="btn btn-link" href="https://www.bradlove.dev/" rel="noreferrer" target="_blank">
                            { "Bradley Love" }
                        </a>
                        <a className="btn btn-link" href="https://api.nasa.gov/" rel="noreferrer" target="_blank">
                            { "APOD API" }
                        </a>
                        <label className="btn btn-ghost" htmlFor="info-modal">
                            {"Close"}
                        </label>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

};


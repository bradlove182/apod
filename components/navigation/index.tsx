
import React, {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { DateTime } from "luxon";

import { Calendar } from "../calendar";
import useStore from "../../store";

import { NavigationActions } from "./actions";

export const Navigation: React.ComponentType = () => {

    const modalToggle = useRef<HTMLInputElement>(null);
    const infoToggle = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const nextDate = useStore((state) => state.nextDate);
    const previousDate = useStore((state) => state.previousDate);
    const setDate = useStore((state) => state.setDate);
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

    const handleNextDate = useCallback(() => {

        setDate(DateTime.fromISO(nextDate.toISODate()).toJSDate());

        void router.push(`/${ nextDate.toISODate() }`);

    }, [
        nextDate,
        router,
        setDate
    ]);

    const handlePreviousDate = useCallback(() => {

        setDate(DateTime.fromISO(previousDate.toISODate()).toJSDate());

        void router.push(`/${ previousDate.toISODate() }`);

    }, [
        previousDate,
        router,
        setDate
    ]);

    const handleRouteChange = useCallback(() => {

        if(modalToggle.current){

            modalToggle.current.checked = false;

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
            <div className="sticky backdrop-blur bg-opacity-90 top-0 bg-base-100 z-50">
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
                                        <circle cx="12" cy="12" r="5" />
                                        <line x1="12" x2="12" y1="1" y2="3" />
                                        <line x1="12" x2="12" y1="21" y2="23" />
                                        <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
                                        <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
                                        <line x1="1" x2="3" y1="12" y2="12" />
                                        <line x1="21" x2="23" y1="12" y2="12" />
                                        <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
                                        <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <NavigationActions
                            handleModalToggle={ handleModalToggle }
                            handleNextDate={ handleNextDate }
                            handlePreviousDate={ handlePreviousDate }
                            loading={ loading }
                        />
                    </div>
                    <div className="navbar-end">
                        <div className="tooltip tooltip-bottom sm:tooltip-left" data-tip="Information">
                            <button
                                aria-label="Astronomy Picture of the Day"
                                className="btn btn-square"
                                disabled={ loading }
                                onClick={ handleInfoToggle }
                                type="button"
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
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" x2="12" y1="16" y2="12" />
                                    <line x1="12" x2="12.01" y1="8" y2="8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
            <input aria-hidden="true" className="modal-toggle hidden" id="calander-modal" ref={ modalToggle } type="checkbox" />
            <input aria-hidden="true" className="modal-toggle hidden" id="info-modal" ref={ infoToggle } type="checkbox" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box relative">
                    <Calendar />
                    <div className="modal-action">
                        <label className="btn btn-ghost" htmlFor="calander-modal">
                            {"Close"}
                        </label>
                    </div>
                </div>
            </div>
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


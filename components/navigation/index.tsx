
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
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
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
                        <button className="btn btn-primary btn-square" disabled={ loading } type="button">
                            <svg
                                fill="currentColor"
                                height="20"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                // eslint-disable-next-line max-len -- no
                                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                />
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>
            <input className="modal-toggle" id="calander-modal" ref={ modalToggle } type="checkbox" />
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
        </React.Fragment>
    );

};


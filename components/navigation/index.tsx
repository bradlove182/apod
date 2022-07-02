
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

export const Navigation: React.ComponentType = () => {

    const modalToggle = useRef<HTMLInputElement>(null);
    const modalButton = useRef<HTMLButtonElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const currentDate = useStore((state) => state.currentDate);
    const nextDate = useStore((state) => state.nextDate);
    const previousDate = useStore((state) => state.previousDate);
    const maxDate = useStore((state) => state.maxDate);
    const minDate = useStore((state) => state.minDate);
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

    }, [nextDate]);

    const handlePreviousDate = useCallback(() => {

        setDate(DateTime.fromISO(previousDate.toISODate()).toJSDate());

        void router.push(`/${ previousDate.toISODate() }`);

    }, [previousDate]);

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

    }, []);

    return (
        <React.Fragment>
            <nav className="navbar bg-base-100 z-10 container m-auto relative">
                <div className="navbar-start">
                    <Link href="/">
                        <button className="btn btn-tertiary btn-square" disabled={ loading } type="button">
                            <svg
                                fill="none"
                                height="24"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </button>
                    </Link>
                </div>
                <div className="navbar-center">
                    <div className="btn-group flex">
                        <button
                            className="btn btn-square"
                            disabled={ previousDate < minDate || loading }
                            onClick={ handlePreviousDate }
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
                                <line x1="19" x2="5" y1="12" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                        </button>
                        <button
                            className="btn modal-button relative overflow-hidden"
                            disabled={ loading }
                            onClick={ handleModalToggle }
                            ref={ modalButton }
                            type="button"
                        >
                            { currentDate.toISODate() }
                            <progress
                                className={ [
                                    "progress",
                                    "h-0.5",
                                    "progress-primary",
                                    "w-100",
                                    "absolute",
                                    "bottom-0",
                                    "left-0",
                                    "right-0",
                                    "rounded-none",
                                    loading ? "visible" : "hidden"
                                ].filter(Boolean).join(" ") }
                            />
                        </button>
                        <button
                            className="btn btn-square"
                            disabled={ nextDate > maxDate || loading }
                            onClick={ handleNextDate }
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
                                <line x1="5" x2="19" y1="12" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </div>
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
            </nav>
        </React.Fragment>
    );

};


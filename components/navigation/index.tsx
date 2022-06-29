
import React, {
    useCallback,
    useEffect,
    useRef
} from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Calendar } from "../calendar";
import useStore from "../../store";
import { dateToString } from "../../utils/date";

export const Navigation: React.ComponentType = () => {

    const modalToggle = useRef<HTMLInputElement>(null);
    const modalButton = useRef<HTMLButtonElement>(null);
    const currentDate = useStore((state) => state.currentDate);
    const router = useRouter();

    const handleModalToggle = useCallback(() => {

        if(modalToggle.current){

            modalToggle.current.checked = true;

        }

    }, []);

    const handleRouteChange = useCallback(() => {

        if(modalButton.current?.classList.contains("loading")){

            modalButton.current.classList.remove("loading");
            return;

        }

        modalButton.current?.classList.add("loading");

    }, []);

    useEffect(() => {

        router.events.on("routeChangeStart", handleRouteChange);
        router.events.on("routeChangeComplete", handleRouteChange);

        const unsubscribe = useStore.subscribe((state) => state.currentDate, (date) => {

            void router.push(`/${ dateToString(date) }`);

            if(modalToggle.current){
                modalToggle.current.checked = false;
            }

        });

        return () => {
            unsubscribe();
            router.events.off("routeChangeStart", handleRouteChange);
            router.events.off("routeChangeComplete", handleRouteChange);
        };

    }, []);

    return (
        <React.Fragment>
            <nav className="navbar bg-base-100 z-10 px-16 relative">
                <div className="navbar-start">
                    <Link href="/">
                        <button className="btn btn-ghost" type="button">
                            { "APOD" }
                        </button>
                    </Link>
                </div>
                <div className="navbar-center">
                    <div className="btn-group flex">
                        <button className="btn btn-square" type="button">
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
                        <button className="btn modal-button gap-2" onClick={ handleModalToggle } ref={ modalButton } type="button">
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
                                <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
                                <line x1="16" x2="16" y1="2" y2="6" />
                                <line x1="8" x2="8" y1="2" y2="6" />
                                <line x1="3" x2="21" y1="10" y2="10" />
                            </svg>
                            { dateToString(currentDate) }
                        </button>
                        <button className="btn btn-square" type="button">
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
                    <Link href="/">
                        <button className="btn btn-primary btn-square" type="button">

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
                                    // eslint-disable-next-line max-len --- bru
                                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                />
                            </svg>
                        </button>
                    </Link>
                </div>
                <input className="modal-toggle" id="my-modal-3" ref={ modalToggle } type="checkbox" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label className="btn btn-sm btn-circle absolute right-2 top-2" htmlFor="my-modal-3">
                            {"✕"}
                        </label>
                        <Calendar />
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );

};


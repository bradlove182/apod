
import React from "react";
import Link from "next/link";

import { ApodIcon } from "../../icons";

import { NavigationActions } from "./actions";
import { NavigationInformation } from "./information";


export const Navigation: React.ComponentType = () => (
    <React.Fragment>
        <div className="sticky backdrop-blur bg-opacity-90 inset-0 bg-base-100 z-50">
            <nav className="navbar m-auto container">
                <div className="navbar-start">
                    <div className="tooltip tooltip-bottom sm:tooltip-right" data-tip="Today">
                        <Link href="/">
                            <button
                                aria-label="Today's Astronomy Image"
                                className="btn btn-tertiary btn-square"
                                type="button"
                            >
                                <ApodIcon />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="navbar-center">
                    <NavigationActions
                        loading={ false }
                    />
                </div>
                <div className="navbar-end">
                    <NavigationInformation />
                </div>
            </nav>
        </div>
    </React.Fragment>
);


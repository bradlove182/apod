
"use client";

import React, { useCallback } from "react";

import { InfoIcon } from "../../../icons";
import useStore from "../../../store";

export const NavigationInformation: React.ComponentType = () => {

    const setModal = useStore((state) => state.setModal);

    const handleInformationModalToggle = useCallback(() => {

        setModal("information");

    }, []);

    return (
        <div className="tooltip tooltip-bottom sm:tooltip-left" data-tip="Info">
            <button
                aria-label="Astronomy Picture of the Day"
                className="btn btn-square"
                onClick={ handleInformationModalToggle }
                type="button"
            >
                <InfoIcon />
            </button>
        </div>
    );
};

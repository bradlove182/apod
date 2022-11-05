
"use client";

import React from "react";

import useStore from "../../store";

import { CalendarModal } from "./calendar";
import { InformationModal } from "./information";

export type Modals = "calendar" | "information" | undefined;

export const Modal: React.ComponentType = () => {

    const modal = useStore((state) => state.modal);

    return (
        <div className={ [
            "modal",
            "modal-bottom",
            "sm:modal-middle",
            modal ? "modal-open" : "modal-closed"
        ].filter(Boolean).join(" ") }
        >
            {
                ((): React.ReactElement => {

                    if(modal === "calendar"){
                        return <CalendarModal />;
                    }

                    if(modal === "information"){
                        return <InformationModal />;
                    }

                    return <React.Fragment />;

                })()
            }
        </div>
    );

};


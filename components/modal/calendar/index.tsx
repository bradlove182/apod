
"use client";

import React, { useCallback } from "react";

import useStore from "../../../store";
import { Calendar } from "../../calendar";

export const CalendarModal: React.ComponentType = () => {

    const setModal = useStore((state) => state.setModal);

    const handleCloseModal = useCallback(() => {

        setModal(undefined);

    }, []);

    return (
        <div className="modal-box relative">
            <Calendar />
            <div className="modal-action">
                <button className="btn btn-ghost btn-block" onClick={ handleCloseModal } type="button">
                    {"Close"}
                </button>
            </div>
        </div>
    );

};


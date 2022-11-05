
"use client";

import React, { useCallback } from "react";

import useStore from "../../../store";

export const InformationModal: React.ComponentType = () => {

    const setModal = useStore((state) => state.setModal);

    const handleCloseModal = useCallback(() => {

        setModal(undefined);

    }, []);

    return (
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
                <button className="btn btn-ghost" onClick={ handleCloseModal } type="button">
                    {"Close"}
                </button>
            </div>
        </div>
    );

};


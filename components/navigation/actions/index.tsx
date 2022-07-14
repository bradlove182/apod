
import React from "react";

import useStore from "../../../store";

export interface NavigationActionsProps{
    handlePreviousDate: () => void;
    handleNextDate: () => void;
    handleModalToggle: () => void;
    loading: boolean;
}

export const NavigationActions: React.ComponentType<NavigationActionsProps> = ({
    handlePreviousDate,
    handleModalToggle,
    handleNextDate,
    loading
}) => {

    const currentDate = useStore((state) => state.currentDate);
    const nextDate = useStore((state) => state.nextDate);
    const previousDate = useStore((state) => state.previousDate);
    const maxDate = useStore((state) => state.maxDate);
    const minDate = useStore((state) => state.minDate);

    return (
        <div className="btn-group flex">
            <button
                aria-disabled={ nextDate > maxDate || loading }
                aria-label="Yesterday's astronomy image"
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
                aria-label={ "Open calendar to select new date" }
                className="btn modal-button relative overflow-hidden"
                disabled={ loading }
                onClick={ handleModalToggle }
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
                aria-disabled={ nextDate > maxDate || loading }
                aria-label={ "Tomorrow's astronomy image" }
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
    );
};

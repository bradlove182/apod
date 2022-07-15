
import React from "react";

import useStore from "../../../store";
import {
    ArrowLeftIcon,
    ArrowRightIcon
} from "../../../icons";

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
                <ArrowLeftIcon />
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
                <ArrowRightIcon />
            </button>
        </div>
    );
};

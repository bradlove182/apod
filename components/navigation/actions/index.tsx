
"use client";

import React, {
    useCallback,
    useEffect
} from "react";
import { useRouter, usePathname } from "next/navigation";

import useStore from "../../../store";
import {
    ArrowLeftIcon,
    ArrowRightIcon
} from "../../../icons";
import { DateTime } from "luxon";

export interface NavigationActionsProps{
    loading: boolean;
}

export const NavigationActions: React.ComponentType<NavigationActionsProps> = ({
    loading
}) => {

    const router = useRouter();
    const pathName = usePathname();
    const currentDate = useStore((state) => state.currentDate);
    const nextDate = useStore((state) => state.nextDate);
    const previousDate = useStore((state) => state.previousDate);
    const maxDate = useStore((state) => state.maxDate);
    const minDate = useStore((state) => state.minDate);
    const setDate = useStore((state) => state.setDate);
    const setModal = useStore((state) => state.setModal);

    useEffect(() => {

        router.prefetch(`/${ previousDate.toISODate() }`);

        if(!(nextDate > maxDate)){

            router.prefetch(`/${ nextDate.toISODate() }`);

        }

    }, [
        nextDate,
        maxDate,
        previousDate
    ]);

    const handlePreviousDate = useCallback(() => {

        setDate(previousDate.toJSDate());
        router.push(`/${ previousDate.toISODate() }`);

    }, [previousDate]);

    const handleNextDate = useCallback(() => {

        setDate(nextDate.toJSDate());
        router.push(`/${ nextDate.toISODate() }`);

    }, [nextDate]);

    const handleToggleCalendarModal = useCallback(() => {

        setModal("calendar");

    }, []);

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
                onClick={ handleToggleCalendarModal }
                type="button"
            >
                { currentDate.toISODate() }
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

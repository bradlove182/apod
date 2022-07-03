
import { DateTime } from "luxon";
import React, { useCallback } from "react";
import Calander from "react-calendar";
import shallow from "zustand/shallow";
import { useRouter } from "next/router";

import useStore from "../../store";

export const Calendar: React.ComponentType = () => {

    const router = useRouter();
    const [
        currentDate,
        minDate,
        maxDate,
        setDate
    ] = useStore((state) => [
        state.currentDate,
        state.minDate,
        state.maxDate,
        state.setDate
    ], shallow);

    const handleOnClick = useCallback((date: Date) => {

        const pathDate = DateTime.fromJSDate(date).toISODate();

        setDate(date);

        void router.push(`/${ pathDate }`);

    }, []);

    return (
        <Calander
            locale="EN"
            maxDate={ DateTime.fromISO(maxDate.toISODate()).toJSDate() }
            minDate={ minDate.toJSDate() }
            next2Label={
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
                    <polyline points="13 17 18 12 13 7" />
                    <polyline points="6 17 11 12 6 7" />
                </svg>
            }
            nextLabel={
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
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            }
            onClickDay={ handleOnClick }
            prev2Label={

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
                    <polyline points="11 17 6 12 11 7" />
                    <polyline points="18 17 13 12 18 7" />
                </svg>
            }
            prevLabel={
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
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            }
            value={ currentDate.toJSDate() }
        />
    );

};


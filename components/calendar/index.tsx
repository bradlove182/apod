
import { DateTime } from "luxon";
import React, { useCallback } from "react";
import Calander from "react-calendar";
import shallow from "zustand/shallow";
import { useRouter } from "next/router";

import useStore from "../../store";
import {
    ChevronLeft,
    ChevronRight,
    DoubleChevronLeft,
    DoubleChevronRight
} from "../../icons";

import style from "./index.module.css";


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

    }, [
        router,
        setDate
    ]);

    return (
        <Calander
            className={ style.calendar }
            locale="EN"
            maxDate={ DateTime.fromISO(maxDate.toISODate()).toJSDate() }
            minDate={ minDate.toJSDate() }
            next2Label={ <DoubleChevronRight /> }
            nextLabel={ <ChevronRight /> }
            onClickDay={ handleOnClick }
            prev2Label={ <DoubleChevronLeft /> }
            prevLabel={ <ChevronLeft /> }
            value={ currentDate.toJSDate() }
        />
    );

};


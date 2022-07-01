
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
            onClickDay={ handleOnClick }
            value={ currentDate.toJSDate() }
        />
    );

};


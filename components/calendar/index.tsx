import { DateTime } from "luxon";
import React, { useCallback } from "react";
import Calander from "react-calendar";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/navigation";

import useStore from "../../store";
import {
    ChevronLeft,
    ChevronRight,
    DoubleChevronLeft,
    DoubleChevronRight,
} from "../../icons";

import style from "./index.module.css";

export const Calendar: React.ComponentType = () => {
    const router = useRouter();
    const [currentDate, minDate, maxDate] = useStore(
        (state) => [state.currentDate, state.minDate, state.maxDate],
        shallow
    );
    const setModal = useStore((state) => state.setModal);
    const setCurrentDate = useStore((state) => state.setDate);

    const handleOnClick = useCallback((date: Date) => {
        const pathDate = DateTime.fromJSDate(date).toISODate();

        setModal(undefined);

        setCurrentDate(date);
        router.push(`/${pathDate}`);
    }, []);

    return (
        <Calander
            className={style.calendar}
            locale="EN"
            maxDate={DateTime.fromISO(maxDate.toISODate()!).toJSDate()}
            minDate={minDate.toJSDate()}
            next2Label={<DoubleChevronRight />}
            nextLabel={<ChevronRight />}
            onClickDay={handleOnClick}
            prev2Label={<DoubleChevronLeft />}
            prevLabel={<ChevronLeft />}
            value={currentDate.toJSDate()}
        />
    );
};

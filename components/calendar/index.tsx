
import React from "react";
import Calander from "react-calendar";
import shallow from "zustand/shallow";

import useStore from "../../store";

export const Calendar: React.ComponentType = () => {

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

    return (
        <Calander
            locale="EN"
            maxDate={ maxDate }
            minDate={ minDate }
            onClickDay={ setDate }
            value={ currentDate }
        />
    );

};


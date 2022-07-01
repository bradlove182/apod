
import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { DateTime } from "luxon";

interface AppState{
    previousDate: DateTime;
    currentDate: DateTime;
    nextDate: DateTime;
    minDate: DateTime;
    maxDate: DateTime;
    setDate: (date: Date) => void;
}

const useStore = create<AppState>()(
    subscribeWithSelector((set) => ({
        currentDate: DateTime.utc(),
        maxDate: DateTime.utc(),
        minDate: DateTime.utc(1995, 6, 16),
        nextDate: DateTime.utc().plus({ day: 1 }),
        previousDate: DateTime.utc().minus({ day: 1 }),
        setDate: (date: Date): void => {
            const currentDate = DateTime.fromISO(DateTime.fromJSDate(date).toISODate());
            const nextDate = currentDate.plus({ day: 1 });
            const previousDate = currentDate.minus({ day: 1 });
            set(() => ({
                currentDate,
                nextDate,
                previousDate
            }));
        }
    }))
);

useStore.subscribe((state) => state.currentDate, (date) => {

    console.log(date);

});

export default useStore;

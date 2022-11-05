
import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { DateTime } from "luxon";

import type { Modals } from "../components/modal";

interface AppState{
    modal: Modals;
    loading: boolean;
    previousDate: DateTime;
    currentDate: DateTime;
    nextDate: DateTime;
    minDate: DateTime;
    maxDate: DateTime;
    setDate: (date: Date) => void;
    setLoading: (loading: boolean) => void;
    setModal: (modal: Modals) => void;
}

const useStore = create<AppState>()(
    subscribeWithSelector((set) => ({
        currentDate: DateTime.fromISO(DateTime.utc().toISODate()),
        loading: false,
        maxDate: DateTime.fromISO(DateTime.utc().toISODate()),
        minDate: DateTime.utc(1995, 6, 16),
        modal: undefined,
        nextDate: DateTime.fromISO(DateTime.utc().toISODate()).plus({ day: 1 }),
        previousDate: DateTime.fromISO(DateTime.utc().toISODate()).minus({ day: 1 }),
        setDate: (date: Date): void => {
            const currentDate = DateTime.fromISO(DateTime.fromJSDate(date).toISODate());
            const nextDate = currentDate.plus({ day: 1 });
            const previousDate = currentDate.minus({ day: 1 });
            set(() => ({
                currentDate,
                nextDate,
                previousDate
            }));
        },
        setLoading: (loading): void => {
            set(() => ({
                loading
            }));
        },
        setModal: (modal: Modals): void => {
            set(() => ({
                modal
            }));
        }
    }))
);

export default useStore;

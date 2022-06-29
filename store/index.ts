
import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface AppState{
    previousDate: Date;
    currentDate: Date;
    nextDate: Date;
    minDate: Date;
    maxDate: Date;
    setDate: (date: Date) => void;
}

const currentDate = new Date();
const nextDate = new Date();
const previousDate = new Date();
nextDate.setDate(currentDate.getDate() + 1);
previousDate.setDate(currentDate.getDate() - 1);

const useStore = create<AppState>()(
    subscribeWithSelector((set) => ({
        currentDate,
        maxDate: currentDate,
        minDate: new Date("1995/06/16"),
        nextDate,
        previousDate,
        setDate: (date: Date): void => {

            const nDate = new Date();
            const pDate = new Date();
            nDate.setDate(date.getDate() + 1);
            pDate.setDate(date.getDate() - 1);
            set(() => ({
                currentDate: date,
                nextDate: nDate,
                previousDate: pDate
            }));
        }
    }))
);

export default useStore;

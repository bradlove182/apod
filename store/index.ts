
import create from "zustand";

export interface AppState{
    previousDate: Date;
    currentDate: Date;
    nextDate: Date;
    setDate: (date: Date) => void;
}

export const useStore = create<AppState>()((set, get) => ({
    currentDate: new Date(),
    nextDate: new Date(get().currentDate.getDate() + 1),
    previousDate: new Date(get().currentDate.getDate() - 1),
    setDate: (date: Date): void => {

        const nextDate = new Date();
        const previousDate = new Date();
        nextDate.setDate(date.getDate() + 1);
        previousDate.setDate(date.getDate() - 1);
        set(() => ({
            currentDate: date,
            nextDate,
            previousDate
        }));
    }
}));

export default useStore;

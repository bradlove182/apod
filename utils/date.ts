
import { DateTime } from "luxon";

export const dateToString = (date: Date): string => DateTime.fromJSDate(date).toString().slice(0, 10);

export const currentDate = (): string => dateToString(new Date());

export const dateRange = (startDate: Date, endDate: Date): string[] => {

    const dates = [];
    const date = new Date(startDate.getTime());

    // eslint-disable-next-line no-unmodified-loop-condition -- its fine
    while(date <= endDate){

        dates.push(dateToString(date));
        date.setDate(date.getDate() + 1);

    }

    return dates;

};

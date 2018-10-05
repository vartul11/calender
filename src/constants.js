import { getHourText } from './utilities'

export const hours = new Array(24).fill('').map((hour, index) => {
    return {
        text: `${getHourText(index)}`,
        value: index
    }
});
export const daysInWeek = 7;
export const hourHeight = 51;


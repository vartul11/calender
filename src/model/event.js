import { getMSFromDayStart } from '../utilities'

class Event {
    summary;
    startTime;
    endTime;
    constructor(event) {
        this.summary = event.summary;
        this.startTime = (event.start.dateTime.getTime() - getMSFromDayStart(event.start.dateTime)) / (1000 * 60 * 60);
        this.endTime = (event.end.dateTime.getTime() - getMSFromDayStart(event.start.dateTime)) / (1000 * 60 * 60);
    }
}

export { Event };
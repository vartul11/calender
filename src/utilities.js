function addZero(i) {
    if (i < 10) {
        i = `0${i}`;
    }
    return i;
}

function getHourText(hour) {
    let exactHour = Math.floor(hour);
    let meridian = '';
    if (exactHour >= 12) {
        exactHour -= 12;
        meridian = 'pm';
    } else {
        meridian = 'am';
    }
    exactHour = exactHour === 0 ? 12 : exactHour;
    exactHour = addZero(exactHour);
    return `${exactHour} ${meridian}`
}
function getHourTextWithMinutes(hour) {
    let exactHour = Math.floor(hour);
    let minutes = addZero((hour - exactHour) * 60);
    let meridian = '';
    if (exactHour >= 12) {
        exactHour -= 12;
        meridian = 'pm';
    } else {
        meridian = 'am';
    }
    exactHour = exactHour === 0 ? 12 : exactHour;
    exactHour = addZero(exactHour);
    return `${exactHour}:${minutes} ${meridian}`
}

// gives formatted date in format dd-mm-yyy
function getFormatedDate(date) {
    var day = date.getDate();
    day = day < 10 ? '0' + day : day;
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    return `${day}-${month}-${year}`;
}
// give the time in ms from date start.
function getMSFromDayStart(date) {
    let start;
    if (date) {
        start = new Date(date);
    } else {
        start = new Date();
    }
    start.setHours(0, 0, 0, 0);
    return start.getTime();
}


export { getHourTextWithMinutes, getHourText, getFormatedDate, getMSFromDayStart };
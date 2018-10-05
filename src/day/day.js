import { getHourTextWithMinutes, getFormatedDate } from '../utilities'
import { hours, hourHeight } from '../constants'
import React from 'react';
import './day.css';
function EventHTML(props) {
    const divStyle = {
        height: (props.event.endTime - props.event.startTime) * hourHeight + 'px',
        top: (props.event.startTime) * hourHeight + 'px',
    }
    return <div className="active" style={divStyle}>
        <div> {props.event.summary}</div>
        <div> {props.event.startTime ? getHourTextWithMinutes(props.event.startTime) + '-' : ''} {props.event.endTime ? getHourTextWithMinutes(props.event.endTime) : ''}</div>
    </div>;
}

function Day(props) {
    const events = props.event.map((e) => {
        return <EventHTML event={e} />
    })

    const hoursMapped = hours.map((hour) => {
        let divStyle = {
            height: (hourHeight - 1) + 'px'
        }
        return (
            <div className="hour" style={divStyle} key={hour.value}>
                <div className="half-hour-break" ></div>
            </div>
        );
    });
    return (

        <div className="day" >
            <div className="day-name">{props.day} </div>
            <div className={"hour-container " + (props.day === getFormatedDate(new Date()) ? 'is-today' : '')}>
                {events}
                {hoursMapped}
            </div>
        </div >
    );
}

export { Day }
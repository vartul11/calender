import { Week } from '../week/week';
import { hours, hourHeight } from '../constants'
import './calender.css';
import React from 'react';

export function Calender(props) {
    const hoursNames = hours.map((hour) => {
        let divStyle = {
            height: hourHeight + 'px'
        };
        return (
            <span key={hour.value} className="hour-name" style={divStyle} > {hour.text} </span >
        );
    });

    return (
        <div className="calender clearfix" >
            <div className="hour-name-wrapper" >
                {hoursNames}
            </div>
            <div className="week-wrapper" >
                <Week
                    startDate={props.startDate}
                    events={props.events}
                />
            </div>
        </div>
    );
}
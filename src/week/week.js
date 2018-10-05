import { Day } from '../day/day';
import './week.css';
import React from 'react';
import { getFormatedDate, getMSFromDayStart } from '../utilities'
import { daysInWeek, hourHeight } from '../constants'

export class Week extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                top: (((new Date().getTime() - getMSFromDayStart()) / (1000 * 3600)) * hourHeight + 28) + 'px'
            }
        }
        setInterval(() => {
            this.setState({
                style: {
                    top: (((new Date().getTime() - getMSFromDayStart()) / (1000 * 3600)) * hourHeight + 28) + 'px'
                }
            })
        }, 1000 * 60)
    }

    render() {
        const startTime = this.props.startDate.getTime();
        const days = new Array(daysInWeek)
            .fill('')
            .map((value, index) => {
                let date = getFormatedDate(new Date(startTime + index * 1000 * 3600 * 24));
                return <Day
                    key={index}
                    event={this.props.events[date] || []}
                    day={date}
                />;
            });
        return (
            <div className="week" >
                <hr className="current-time" style={this.state.style} />
                {days}
            </div>
        );
    }
}
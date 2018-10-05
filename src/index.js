import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { getFormatedDate } from './utilities'
import { SignInButton } from './google-api/sign-in-button';
import googleCalenderApp from './google-api/google-api';
import { Event } from './model/event';
import { daysInWeek } from './constants'
import { Calender } from './calender/calender';


function parseItems(items) {
    let itemDateMap = {};
    items.map((event) => {
        let startTime = event.start.dateTime;
        let endTime = event.end.dateTime;
        let endDay = event.end.date;
        let startDay = event.start.date;

        if (!endDay) {
            endDay = getFormatedDate(new Date(endTime));
        }
        if (!startDay) {
            startDay = getFormatedDate(new Date(startTime));
        }
        if (!itemDateMap[startDay]) {
            itemDateMap[startDay] = [];
        }
        if (!itemDateMap[endDay]) {
            itemDateMap[endDay] = [];
        }


        if (startDay !== endDay) {
            itemDateMap[startDay].push(new Event({
                summary: event.summary,
                start: {
                    dateTime: new Date(event.start.dateTime)
                },
                end: {
                    dateTime: new Date(new Date(startTime).setHours(23, 59, 59, 1000))
                }
            }))
            itemDateMap[endDay].push(new Event({
                summary: event.summary,
                start: {
                    dateTime: new Date(new Date(endTime).setHours(0, 0, 0, 0))
                },
                end: {
                    dateTime: new Date(event.end.dateTime)
                }
            }))
        } else {
            itemDateMap[startDay].push(new Event({
                summary: event.summary,
                start: {
                    dateTime: new Date(startTime)
                },
                end: {
                    dateTime: new Date(endTime)
                }
            }
            ))
        }
        return event;
    });
    return itemDateMap;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.startDate = new Date();
        this.endDate = (new Date(this.startDate.getTime() + (daysInWeek * 24 * 60 * 60 * 1000)));

        this.state = {
            signedIn: false,
            startDate: this.startDate,
            endDate: this.endDate,
            events: []
        };

        this.signedInStateChanged = this.signedInStateChanged.bind(this);
        this.loadEvents = this.loadEvents.bind(this);
        googleCalenderApp.onLoad(() => {
            this.signedInStateChanged(googleCalenderApp.sign);
            googleCalenderApp.listenSign(this.signedInStateChanged);
        });
    }
    loadEvents() {
        googleCalenderApp.listUpcomingEvents(this.state.startDate, this.state.endDate).then((events) => {
            let items = parseItems(events.items.slice());

            this.setState({
                events: items
            })
        });
    }
    signedInStateChanged(state) {
        this.setState({
            signedIn: state
        });
        if (this.state.signedIn) {
            this.loadEvents();
        }
    }


    render() {

        return (
            <div className="main-container">
                <img alt='...' className="img-logo" src="./logo.png" />
                <img alt='...' className="img-header" src="./header.png" />
                <SignInButton
                    signedIn={this.state.signedIn}
                    signedInStateChanged={this.signedInStateChanged} />
                <Calender
                    signedIn={this.state.signedIn}
                    startDate={this.state.startDate}
                    events={this.state.events}
                />
                <img alt='...' className="img-footer" src="./footer.png" />
            </div>
        );
    }
}



render(
    <App />,
    document.getElementById('root')
);

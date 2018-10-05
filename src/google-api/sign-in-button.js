import React from 'react';
import googleCalenderApp from './google-api';

export class SignInButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(event, name) {
        if (name === 'sign-in') {
            googleCalenderApp.handleAuthClick()
        } else if (name === 'sign-out') {
            googleCalenderApp.handleSignoutClick()
        }
    }

    render() {
        return (
            <div className="btn">
                {!this.props.signedIn ? <button
                    onClick={(e) => this.handleItemClick(e, 'sign-in')}
                >Sync with calender</button> :
                    <button
                        onClick={(e) => this.handleItemClick(e, 'sign-out')}
                    >Sign Out
                </button>}
            </div>
        );
    }
}
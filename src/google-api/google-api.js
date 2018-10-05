import { config } from '../client_id';
class GoogleCalenderApp {
    constructor() {
        this.sign = false;
        this.gapi = null;
        this.onLoadCallback = null;
        this.calendar = 'primary';
        this.updateSigninStatus = this.updateSigninStatus.bind(this);
        this.initClient = this.initClient.bind(this);
        this.handleSignoutClick = this.handleSignoutClick.bind(this);
        this.handleAuthClick = this.handleAuthClick.bind(this);
        this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
        this.listenSign = this.listenSign.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.handleClientLoad();
    }
    updateSigninStatus(isSignedIn) {
        this.sign = isSignedIn;
    }
    initClient() {
        this.gapi = window['gapi'];
        const that = this;
        this.gapi.client.init(config).then(() => {
            that.gapi.auth2.getAuthInstance().isSignedIn.listen(that.updateSigninStatus);
            that.updateSigninStatus(that.gapi.auth2.getAuthInstance().isSignedIn.get());
            if (that.onLoadCallback) {
                that.onLoadCallback();
            }
        });
    }
    handleClientLoad() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        document.body.appendChild(script);
        const that = this;
        script.onload = () => {
            window['gapi'].load('client:auth2', that.initClient);
        };
    }
    handleAuthClick() {
        if (this.gapi) {
            this.gapi.auth2.getAuthInstance().signIn();
        }
        else {
            console.log("Error: this.gapi not loaded");
        }
    }
    listenSign(callback) {
        if (this.gapi) {
            return this.gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
        }
        else {
            console.log("Error: this.gapi not loaded");
        }
    }
    onLoad(callback) {
        if (this.gapi) {
            callback();
        }
        else {
            this.onLoadCallback = callback;
        }
    }
    handleSignoutClick() {
        if (this.gapi) {
            this.gapi.auth2.getAuthInstance().signOut();
        }
        else {
            console.log("Error: this.gapi not loaded");
        }
    }
    listUpcomingEvents(start, end) {
        if (this.gapi) {
            return this.gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': start.toISOString(),
                'timeMax': end.toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'orderBy': 'startTime'
            }).then((response) => {
                return response.result;
            });
        }
        else {
            console.log("Error: this.gapi not loaded");
            return false;
        }
    }
}
const googleCalenderApp = new GoogleCalenderApp();
export default googleCalenderApp;
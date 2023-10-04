import { google } from "googleapis";

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_PRIVATE_KEY= "866c0e943bcc11d842a11f5cb2705d2ad15e4fe7"
const GOOGLE_CLIENT_EMAIL = "calendar-key@calander-400905.iam.gserviceaccount.com"
const GOOGLE_PROJECT_NUMBER = "991767224013"
const GOOGLE_CALENDAR_ID = "8e275a0180e1c21faaf9e39ba06406c31c79a46a45707727bb26365f886331d3@group.calendar.google.com"
// const GOOGLE_PRIVATE_KEY= process.env.GOOGLE_PRIVATE_KEY
// const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
// const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER
// const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID

const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
);

const calendar = google.calendar({
    version: 'v3',
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient
});

export const calender_integration = (req, res) => {
  
    calendar.events.list({
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (error, result) => {
      if (error) {
        res.send(JSON.stringify({ error: error }));
      } else {
        if (result.data.items.length) {
          res.send(JSON.stringify({ events: result.data.items }));
        } else {
          res.send(JSON.stringify({ message: 'No upcoming events found.' }));
        }
      }
    });
  };
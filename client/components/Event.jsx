import React, { useState, useEffect } from 'react';
import EventAttendees from './EventAttendees.jsx';
import Content from './Content.jsx';
import { ListGroup, Container, Row, Jumbotron, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

export default function Event(props) {
  const gapi = window.gapi;

  const handleClick = (e) => {
    e.preventDefault();

    console.log('google api key', process.env.Google_Calendar_API);
    console.log('google client id', process.env.Client_ID);

    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: 'AIzaSyB6yrukbK84V5RazOUd1AJvTn5qMcoeoxs',
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
        clientId:
          '580748962931-63i8t6oie0r8d4k4gnaf8rrjfuk4jh0o.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/calendar.events',
      });

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar!'));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          console.log('signed in');

          var event = {
            summary: props.eventtitle,
            location: props.eventlocation,
            description: props.eventdetails,
            start: {
              dateTime: props.raweventstarttime,
              timeZone: 'America/Los_Angeles',
            },
            end: {
              dateTime: props.raweventendtime,
              timeZone: 'America/Los_Angeles',
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
          };
          console.log('EVENT object', event);

          // var event = {
          //   summary: 'Google I/O 2015',
          //   location: '800 Howard St., San Francisco, CA 94103',
          //   description:
          //     "A chance to hear more about Google's developer products.",
          //   start: {
          //     dateTime: '2015-05-28T09:00:00-07:00',
          //     timeZone: 'America/Los_Angeles',
          //   },
          //   end: {
          //     dateTime: '2015-05-28T17:00:00-07:00',
          //     timeZone: 'America/Los_Angeles',
          //   },
          //   recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
          //   attendees: [
          //     { email: 'lpage@example.com' },
          //     { email: 'sbrin@example.com' },
          //   ],
          //   reminders: {
          //     useDefault: false,
          //     overrides: [
          //       { method: 'email', minutes: 24 * 60 },
          //       { method: 'popup', minutes: 10 },
          //     ],
          //   },
          // };

          const request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });

          request.execute(function (event) {
            window.open(event.htmlLink, '_blank');
            // appendPre('Event created: ' + event.htmlLink);
          });
          // })
          //       .then(
          //         (response) => {
          //           console.log(response.result);
          //         },
          //         (reason) => {
          //           console.log('Error: ' + reason.result.error.message);
          //         }
          //       );
          //   };

          //   gapi.load('client'.start);
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <>
      <b className="hr anim"></b>
      <div className="event">
        <Container>
          <Jumbotron fluid>
            <Container className="eventJumbotron">
              <h1>{props.eventtitle}</h1>
              <h4>
                {props.eventstarttime} - {props.eventendtime}
              </h4>
              <h4>
                Location <FontAwesomeIcon icon={faLocationArrow} size="1x" /> :{' '}
                {props.eventlocation}
              </h4>
              <p>{props.eventdetails}</p>
              <Button
                variant="info"
                // type="submit"
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Add to Google Calendar
              </Button>
            </Container>
          </Jumbotron>

          <Container>
            <EventAttendees {...props} userUpdate={props.userUpdate} />
          </Container>
          <Content {...props} />
        </Container>
      </div>
    </>
  );
}

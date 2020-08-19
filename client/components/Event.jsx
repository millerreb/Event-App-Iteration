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

    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: process.env.Google_Calendar_API,
        discoveryDocs: ['https://people.googleapis.com/$discovery/rest'],
        clientId: process.env.Client_ID,
        scope: 'https://www.googleapis.com/auth/calendar.events',
      });

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar!'));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: props.eventtitle,
            location: props.eventlocation,
            description: props.eventdetails,
            start: {
              dateTime: props.eventstarttime,
              timeZone: 'America/Los_Angeles',
            },
            end: {
              dateTime: props.eventendtime,
              timeZone: 'America/Los_Angeles',
            },
            // recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
            // attendees: [
            //   { email: 'lpage@example.com' },
            //   { email: 'sbrin@example.com' },
            // ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
          };

          const request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });

          request.execute(function (event) {
            // window.open(event.htmlLink, '_blank');
            appendPre('Event created: ' + event.htmlLink);
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

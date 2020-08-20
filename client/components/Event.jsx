import React from 'react';
import EventAttendees from './EventAttendees.jsx';
import Content from './Content.jsx';
import { Container, Jumbotron, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

export default function Event(props) {
  const handleClick = (e) => {
    e.preventDefault();

    const eventDetails = props;
    console.log(eventDetails);

    fetch('http://localhost:3000/api/calendar', {
      method: 'POST',
      body: JSON.stringify(eventDetails),
      headers: { 'Content-Type': 'application/json' },
      // credentials: 'include',
    })
      .then((response) => response.json())
      .then((link) => window.open(link, '_blank'));
  };

  return (
    <div>
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
    </div>
  );
}

import React from 'react';
import EventAttendees from './EventAttendees.jsx';
import Content from './Content.jsx';
import { Container, Jumbotron } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

export default function Event(props) {
  // fix for feed date display
  let dateDisplay = new Date(props.eventdate).toDateString();

  return (
    <div>
      <b className="hr anim"></b>
      <div className="event">
        <Container>
          <Jumbotron fluid>
            <Container className='eventJumbotron'>
              <h1>{props.eventtitle}</h1>
              <h4>{dateDisplay}</h4>
              <h4>Location <FontAwesomeIcon icon={faLocationArrow} size="1x" /> : {props.eventlocation}</h4>
              <p>Details: "{props.eventdetails}"</p>
            </Container>
          </Jumbotron>

          <Container>
            <EventAttendees
              {...props}
              userUpdate={props.userUpdate}
            />
          </Container>
          <Content {...props} />
        </Container>
      </div>
    </div>
  );
}
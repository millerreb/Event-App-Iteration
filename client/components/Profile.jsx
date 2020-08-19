import React from "react";
import { Card } from 'react-bootstrap';

export default function Profile(props) {
  return (
    <div className="profile">
        <img src={(props.profilephoto) ? props.profilephoto : 'https://www.sideshow.com/storage/product-images/905032/gandalf-the-grey_the-lord-of-the-rings_square.jpg'} />
        <Card.Body>
          <Card.Title>{props.username ? props.username : 'Please log in' }</Card.Title>
          <Card.Text>
            { props.firstname && `Hi, ${props.firstname}!` }
          </Card.Text>
        </Card.Body>
    </div>
  );
}
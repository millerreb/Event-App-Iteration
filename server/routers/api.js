const express = require('express');

const router = express.Router();
const path = require('path');
const fileController = require('../controllers/fileController');
const cookieController = require('../controllers/cookieController');
const eventController = require('../controllers/eventController');
const loginController = require('../controllers/loginController');

// EXISING USER LOGIN

router.get('/login', loginController.oAuth, (req, res) => {
  // res.send('ok');
  res.set('Access-Control-Allow-Origin', '*');
  res.redirect(res.locals.url);
});

router.get(
  '/login/google',
  loginController.afterConsent,
  cookieController.setSSIDCookie,
  fileController.createUser, // if username already exists, return next() => getUser // if not, create user in SQL database
  // fileController.getUser,
  // eventController.getFullEvents,
  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    // const responseObj = {
    //   users: res.locals.allUserInfo,
    //   events: res.locals.allEventsInfo
    // };
    res.redirect('http://localhost:8080/');
  }
);

// REVISIT WEBSITE AFTER LEAVING, OR VISITING SOMEONE ELSE'S PROFILE PAGE

router.get(
  '/info',
  cookieController.isLoggedIn, // this is really only is applicable for the same user
  fileController.getUser,
  eventController.allEvents,
  eventController.filterForUser,
  // eventController.getFullEvents,   //ALL COMMENTED OUT OBSOLETE - KEPT IN CASE NEEDED LATER - REPLACED BY .allEvents and .filterForUser
  // eventController.getAllAttendees,
  // eventController.getUserDetail,
  // eventController.consolidation,
  (req, res) => {
    const responseObj = {
      users: res.locals.allUserInfo,
      events: res.locals.allEventsInfo,
    };
    console.log('responseObj: ', responseObj);
    res.set('Access-Control-Allow-Origin', '*');
    return res.status(200).json(responseObj);
  }
);

// LOGGING OUT

router.use(
  '/logout', // SWITCH THIS TO POST REQUEST!!
  cookieController.removeCookie,
  (req, res) => {
    return res.redirect('http://localhost:8080/');
  }
);

// CREATE A NEW EVENT

router.post(
  '/create',
  fileController.verifyUser,
  fileController.getUser,
  eventController.createEvent,
  eventController.addNewEventToJoinTable,
  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json('Event succcessfully created.');
  }
);

// ADD USER TO AN EXISTING EVENT

router.post(
  '/add',
  fileController.getUser,
  eventController.verifyAttendee,
  eventController.addAttendee,
  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json('User successfully added as attendee.');
  }
);

router.get('/events', eventController.allEvents, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).json(res.locals.allEventsInfo);
});

router.post(
  '/regularSignIn',
  loginController.regularSignIn,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json({ cookie: res.locals.token });
  }
);

router.post(
  '/regularSignUp',
  loginController.regularSignUp,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json({ cookie: res.locals.token });
  }
);

// Add event to Google Calendar
router.post('/calendar', eventController.addToCalendar, (req, res) => {
  res.status(200).json(res.locals.link);
});

module.exports = router;

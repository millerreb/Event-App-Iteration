const { google } = require('googleapis');
const db = require('../models/models.js');
const queries = require('../utils/queries');
const jwt = require('jsonwebtoken');

const loginController = {};

loginController.oAuth = async (req, res, next) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.Client_ID,
    process.env.Client_Secret,
    'http://localhost:3000/api/login/google'
  );

  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/classroom.profile.photos',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/calendar.events',
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    response_type: 'code',
    prompt: 'consent',
  });

  res.locals.url = url;
  return next();
};
// creates Oauth token
loginController.afterConsent = (req, res, next) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.Client_ID,
    process.env.Client_Secret,
    'http://localhost:3000/api/login/google'
  );

  oauth2Client
    .getToken(req.query.code)
    .then((data) => {
      const { tokens } = data;
      oauth2Client.setCredentials(tokens);
      res.locals.token = tokens.id_token;
      return next();
    })
    .catch((err) => {
      if (err) console.log('afterConsent .catch block: ', err);
    });
};

loginController.regularSignIn = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const queryString1 = queries.userInfo;
  const queryValues1 = [email];

  db.query(queryString1, queryValues1).then((data) => {
    console.log('data.rows is:', data.rows);
    if (!data.rows.length) {
      console.log('cannot find user in db');
      res
        .status(400)
        .json({ message: 'cannot find user, please sign up or OAuth' });
    } else if (data.rows[0].password !== password.toString()) {
      console.log('password does not match in db');
      res.status(400).json({ message: 'password does not match' });
    } else {
      // do something to get the token
      // res.locals.token = tokens.id_token;
      const token = jwt.sign(data.rows[0], 'spider');
      console.log('token created and it is: ', token);
      res.locals.token = token;
      console.log('match!');
      next();
    }
  });
};

loginController.regularSignUp = (req, res, next) => {
  const { email, password, firstname, lastname, profilephoto } = req.body;
  console.log(req.body);
  const queryString1 = queries.userInfo;
  const queryValues1 = [email];

  const queryString2 = `
		INSERT INTO users
		(username, firstname, lastname, profilephoto, password)
		VALUES($1, $2, $3, $4, $5)
		RETURNING *
		;
		`;
  const queryValues2 = [email, firstname, lastname, profilephoto, password];

  db.query(queryString1, queryValues1)
    .then((data) => {
      console.log('data.rows is:', data.rows);
      if (!data.rows.length) {
        console.log('data.rows is empty and about to create one');
        db.query(queryString2, queryValues2)
          .then((data) => {
            res.locals.username = data.rows[0].username;
            console.log('NEW USER: ', res.locals.username);
            // res.locals.token = tokens.id_token; need to set a token for future use
            const token = jwt.sign(data.rows[0], 'spider');
            console.log('token created and it is: ', token);
            res.locals.token = token;
            return next();
          })
          .catch((err) =>
            next({
              log: `Error occurred with queries.addUser OR fileController.createUser middleware: ${err}`,
              message: {
                err: 'An error occurred with adding new user to the database.',
              },
            })
          );
      } else {
        return next();
      }
    })
    .catch((err) =>
      next({
        log: `Error occurred with queries.userInfo OR fileController.createUser middleware: ${err}`,
        message: {
          err:
            'An error occurred when checking user information from database.',
        },
      })
    );
};

module.exports = loginController;

const { Pool } = require('pg');

const PG_URI =
  'postgres://esejcrfy:BFAIJw0L8_r9m8xHq3absRAxVZLpWCc3@drona.db.elephantsql.com:5432/esejcrfy';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

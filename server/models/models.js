const { Pool } = require('pg');

// get this to work with environment variable:
const PG_URI = 'postgres://mugiexzu:v02_lETiuwy8Bi3A8O6V4ix2O50fsTs-@raja.db.elephantsql.com:5432/mugiexzu';
// process.env.PG_URI

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

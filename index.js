const express = require('express');
require('dotenv').config();
const pool = require('./db/dbConnectoin');

const app = express();

pool
  .query('SELECT NOW()')
  .then(res => console.log('✅ DB Connected:', res.rows[0]))
  .catch(err => console.error('❌ Error:', err.message));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));

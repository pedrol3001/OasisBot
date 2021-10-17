require('dotenv/config');

const root_dir = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

module.exports = { root_dir };

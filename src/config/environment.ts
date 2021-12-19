require('dotenv/config');

const root_dir = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

export { root_dir };

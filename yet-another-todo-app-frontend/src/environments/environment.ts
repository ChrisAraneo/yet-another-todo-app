import 'zone.js/plugins/zone-error';

const scheme = 'http';
const host = 'localhost';
const port = 9339;

export const environment = {
  production: false,
  api: {
    host: host,
    port: port,
    origin: `${scheme}://${host}:${port}`,
  },
};

import 'zone.js/plugins/zone-error';
import * as _json from './environment.json';

const json = _json; // Workaround for: 'Error: Should not import the named export (...)'

const api = {
  host: json.host,
  port: json.port,
  origin: `${json.scheme}://${json.host}:${json.port}`,
};

export const environment = {
  production: false,
  api,
};

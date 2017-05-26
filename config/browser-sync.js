import { port } from './server';
import { des } from './paths';

export default {
  port: port,
  // proxy    : 'http://localhost:' + portServer,
  ui: {
    port: port + 1
  },
  // file     : [paths.dest + '/**/*.*'],
  ghostMode: false,
  logPrefix: 'Browsersync',
  server: des
};

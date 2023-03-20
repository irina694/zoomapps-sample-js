import { URL } from 'url';

if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv');
    dotenv.config();
}

const config = process.env;

console.log('config in Config.js:');
console.log(config);

const deps = [
    'ZM_CLIENT_ID',
    'ZM_CLIENT_SECRET',
    'ZM_REDIRECT_URL',
    'SESSION_SECRET',
];

config['ZM_CLIENT_ID'] = 'FXHTxaDxToqJ1JOxWwg7NQ';
config['ZM_CLIENT_SECRET'] = 'TSjJSkh1Up2ryYqG2byrNxffkNBC64IB';
config['ZM_REDIRECT_URL'] =
    'https://powerful-lowlands-24092.herokuapp.com/auth';
config['APP_NAME'] = 'zoomapps-sample-js';
config['SESSION_SECRET'] =
    '61ac5b72d67e222ee8534fb211583ddb43bf3b5ebec9374693c144a12dec4e7f';

// Check that we have all our config dependencies
let hasMissing = !config;
console.log('hasMissing: ', hasMissing);

for (const dep in deps) {
    console.log('dep', dep);

    const conf = deps[dep];
    const str = config[conf];

    console.log('conf: ', conf);
    console.log('srt: ', str);

    if (!str || typeof str !== 'string') {
        console.error(`${conf} is required`);
        hasMissing = true;
    }
}

if (hasMissing) throw new Error('Missing required .env values...exiting');

try {
    new URL(config.ZM_REDIRECT_URL);
} catch (e) {
    throw new Error(`Invalid ZM_REDIRECT_URL: ${e.message}`);
}

export const zoomApp = {
    host: config.ZM_HOST || 'https://zoom.us',
    clientId: config.ZM_CLIENT_ID,
    clientSecret: config.ZM_CLIENT_SECRET,
    redirectUrl: config.ZM_REDIRECT_URL,
    sessionSecret: config.SESSION_SECRET,
};

console.log('Zoom App:');
console.log(zoomApp);

// Zoom App Info
export const appName = config.APP_NAME || 'zoom-app';
export const redirectUri = zoomApp.redirectUrl;

// HTTP
export const port = '49741'; // config.PORT || '3000';

console.log('PORT:', port);

// require secrets are explicitly imported
export default {
    appName,
    redirectUri,
    port,
};

import express from 'express';
import { handleError, sanitize } from '../helpers/routing.js';
import { contextHeader, getAppContext } from '../helpers/cipher.js';
import { getInstallURL } from '../helpers/zoom-api.js';
import session from '../session.js';

const router = express.Router();

/*
 * Home Page - Zoom App Launch handler
 * this route is used when a user navigates to the deep link
 */
router.get('/', async (req, res, next) => {
    try {
        sanitize(req);

        const header = req.header(contextHeader);

        const isZoom = header && getAppContext(header);
        const name = isZoom ? 'Zoom' : 'Browser';

        return res.render('index', {
            isZoom,
            title: `Hello ${name}`,
        });
    } catch (e) {
        next(handleError(e));
    }
});

/*
 * Install Route - Install the Zoom App from the Zoom Marketplace
 * this route is used when a user installs the app from the Zoom Client
 */
router.get('/install', session, async (req, res) => {
    try {
        console.log('Install the Zoom app');

        const { url, state, verifier } = getInstallURL();

        console.log('URL:', url);
        console.log('State: ', state);
        console.log('Type of state', typeof state);
        console.log('verifier: ', verifier);

        // AddURL: https://zoom.us/oauth/authorize?response_type=code&client_id=FXHTxaDxToqJ1JOxWwg7NQ&redirect_uri=https%3A%2F%2Fpowerful-lowlands-24092.herokuapp.com%2Fauth

        const addURL =
            '/auth?response_type=code&client_id=FXHTxaDxToqJ1JOxWwg7NQ&redirect_uri=https%3A%2F%2Fpowerful-lowlands-24092.herokuapp.com%2Fauth';
        console.log('Add URL (from Zoom Apps):', addURL);

        req.session.state = state;
        req.session.verifier = verifier;
        // res.redirect(url.href);
        res.redirect(addURL); // From the Zoom Apps Activation Page
    } catch (e) {
        console.log('Error in /install route: ', e);
    }
});

export default router;

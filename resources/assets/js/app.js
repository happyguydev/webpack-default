import 'jquery';
import iFrameResize from 'iframe-resizer/js/iframeResizer';

//Import Router
import Swiper from 'swiper';
import Router from './util/Router';
require('waypoints/lib/noframework.waypoints');
require('waypoints/lib/shortcuts/sticky');

//Import local dependencies
import common from './routes/common';

window.Swiper = Swiper;
window.iFrameResize = iFrameResize;

const routes = new Router({
    // All pages
    common,
});

// Load Events
routes.loadAllEvents();

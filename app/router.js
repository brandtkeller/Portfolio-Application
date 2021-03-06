import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function() {
  this.route('contact');
  this.route('blog');
  this.route('tutorials');
  this.route('demo');
});

export default Router;

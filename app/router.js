import Ember from 'ember';
import config from 'gworkerd/config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('jobs');
  this.route('job', {path: '/job/:job_id'});
});

export default Router;

import Ember from 'ember';
import ENV from 'gworkerd/config/environment';

export default Ember.Route.extend({
  jobLimit : ENV.APP.initialJobLimit,

  queryParams: {
    readyState: {
      refreshModel: true
    }
  },

  model: function (params) {
    if (params['readyState']) {
      return this.store.peekAll('job').filter((job) => job.get('readyState') === params['readyState']);
    } else {
      return this.store.query('job', {
        limit: this.get('jobLimit')
      });
    }
  }
});
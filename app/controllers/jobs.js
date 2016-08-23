import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['readyState'],

  watchUpdates: Ember.on('init', function () {
    this.feed.on('update', () => {
      if (this.get('readyState')) {
        this.set('model', this.store.peekAll('job').filter((job) => job.get('readyState') === this.get('readyState')));
      } else {
        this.set('model', this.store.peekAll('job'));
      }
    });
  })


});
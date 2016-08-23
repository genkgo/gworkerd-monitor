import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['readyState'],

  watchUpdates: Ember.on('init', function () {
    this.feed.on('update', () => {
      this.set('model', this.store.peekAll('job'));
    });
  })


});
import Ember from 'ember';

export default Ember.Controller.extend({

  login: window.sessionStorage.getItem('password') !== null,
  connected: Ember.computed.alias('feed.connected'),
  password: null,
  server: null,

  shouldStartSocket : Ember.observer('model', function () {
    if (this.get('server') && this.get('server').websockets) {
      this.feed.connect();
    }
  }).observes('server'),

  close : function () {
    this.feed.close();
  }.on('willDestroy')

});
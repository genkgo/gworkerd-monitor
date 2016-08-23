import Ember from 'ember';
import ENV from 'gworkerd/config/environment';

export default Ember.Service.extend(Ember.Evented, {
  socketService: Ember.inject.service('websockets'),
  connected: false,
  initialized: false,
  server: null,

  connect: function () {
    if (this.get('initialized') === true) {
      return;
    }

    this.set('initialized', true);

    var socket = this.get('socketService').socketFor(ENV.APP.data.socket);

    socket.on('open', () => {
      this.set('connected', true);
    }, this);

    socket.on('close', () => {
      this.set('connected', true);
      Ember.run.later(this, function() {
        socket.reconnect();
      }, 1000);
    }, this);

    socket.on('message', (event) => {
      var message = JSON.parse(event.data);

      this.store.pushPayload({
        jobs: [message.job]
      });

      this.trigger('update', message.job);
    }, this);
  },

  close : function () {
    this.get('socketService').closeSocketFor(ENV.APP.data.socket);
  }.on('willDestroy')

});
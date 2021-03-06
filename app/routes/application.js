import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function (controller, model) {
    this._super(controller, model);

    controller.addObserver('login', () => {
      this.fetchServerData();
    });

    this.fetchServerData();
  },

  fetchServerData : function () {
    var appController = this.controllerFor('application');
    if (appController.get('login') === true) {
      Ember.$.ajax({
        url: window.location.pathname + 'api/server',
        type: 'GET',
        beforeSend: (xhr) => {
          xhr.setRequestHeader('X-Password', window.sessionStorage.getItem('password'));
        }
      }).then((server) => {
        appController.set('server', server);
      });
    }
  }
});
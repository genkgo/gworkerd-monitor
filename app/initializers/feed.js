import Feed from 'gworkerd/services/feed';

export function initialize(application) {
  application.register('service:feed', Feed, {
    singleton: true
  });

  application.inject('service:feed', 'store', 'service:store');
  application.inject('controller', 'feed', 'service:feed');
  application.inject('route', 'feed', 'service:feed');
}

export default {
  name: 'feed',
  initialize: initialize
};
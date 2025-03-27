const EventBus = require('@blocklet/sdk/service/eventbus');

const init = () => {
  // listen to events from service and other components
  EventBus.subscribe((event) => {
    console.log('received event from eventbus', event);
  });
};

module.exports = { init };

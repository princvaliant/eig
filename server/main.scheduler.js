'use strict';

Meteor.startup(function() {
  SyncedCron.start();
});

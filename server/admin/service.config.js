'use strict';
/**
 *  OAuth Service Configs
 *  @type {meteor.startup}
 */

Accounts.validateLoginAttempt((attempt) => {
  if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified) {
    throw new Meteor.Error(100002, 'Email not verified');
  }
  return true;
});

Meteor.startup(() => {
  let smtp = {
    username: 'avolos@gmail.com',
    password: 'Pregrsht1Vremena!',
    server: 'smtp.gmail.com',
    port: 465
  };
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' +
    encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Meteor.methods({
  getEnvironment: function() {
    return process.env.NODE_ENV;
  }
});

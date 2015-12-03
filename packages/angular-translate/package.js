Package.describe({
  summary: "Angular Translate"
});

Package.on_use(function (api, where) {
  where = where || ['client'];

  api.use('underscore', where);

  api.add_files('angular-translate.js', where);
  api.add_files('angular-translate-storage-local.js', where);
  api.add_files('angular-translate-loader-partial.js', where);
  api.add_files('angular-translate-storage-cookie.js', where);
});

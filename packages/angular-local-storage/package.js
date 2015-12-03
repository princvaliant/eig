Package.describe({
  summary: "Angular local storage"
});

Package.on_use(function (api, where) {
  where = where || ['client'];

  api.use('underscore', where);

  api.add_files('angular-local-storage.js', where);
});

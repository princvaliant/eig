Package.describe({
  summary: "Angular local storage"
});

Package.on_use(function (api, where) {
  where = where || ['client'];

  api.use('underscore', where);

  api.add_files('angular-file-upload.js', where);
  api.add_files('papaparse.js', where);

});

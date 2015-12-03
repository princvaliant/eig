let exec = Npm.require('child_process').exec;

// Execute aggregation that stores result in separate collections

Scheduler = {
  executeAggregate: function(pipeline) {
    let ret = '';
    let res = '';
    let conn = process.env.MONGO_URL.replace('db://', ' ');
    conn = conn.split((/[\s,?@$:]+/));
    if (process.env.NODE_ENV === 'development') {
      res = conn[0] + ' -u "' + conn[1] + '" -p "' + conn[2] + '" ' + conn[3] + ':' + conn[4];
    } else {
      res = conn[0] + ' -u "' + conn[1] + '" -p "' + conn[2] + '" ' + conn[5] + ':' + conn[6];
    }
    let aggr = res +
      ' --eval \'db.???.aggregate(' + pipeline + ', {allowDiskUse: true})\'';
    exec(aggr, function(error, stdout, stderr) {
      ret = 'stdout: ' + stdout + ' stderr: ' + stderr;
      if (error !== null) {
        ret += 'exec error: ' + error;
      }
    });
  }
};

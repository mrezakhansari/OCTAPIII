const errorLoger = require('../middleware/error-loger')
module.exports = app => {
  require('./vessel')(app);
  require('./register')(app);
  app.use('/', require('./home'));
  app.use('/api/jobCompany',require('./jobCompany'));
  app.use('/app/log', require('./log'));
  app.use('/api/userType', require('./userType'));
  app.use('/api/user', require('./user'));
  app.use('/api/permission', require('./permission'));
  app.use('/api/auth', require('./authentication'));
  app.use('/api/voyage', require('./voyage'));
  app.use('/api/equipment', require('./equipment'));
  app.use('/api/operator', require('./operator'));
  app.use('/api/damage', require('./damage'));
  app.use('/api/act', require('./act'));
  app.use('/api/area', require('./area'));


  app.use(errorLoger);
};

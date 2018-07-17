// Initializes the `myService` service on path `/my-service`
const createService = require('./my-service.class.js');
const hooks = require('./my-service.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/my-service', createService(options));
  const service = app.service('my-service');
  app.use('/getList', function (req, res) {
    service.find({}).then(employeeList => {
      res.send({
        employeeList: employeeList
      });
    });
  });
  app.use('/addList', function (req, res) {
    service.update(1, req.body, {}).then(employeeList => {
      res.send({
        employeeList: employeeList
      });

    });
  });
  app.use('/clearList', function (req, res) {
    service.remove(1, {}).then(employeeList => {
      res.send({
        employeeList: employeeList
      });

    });
  });
  // Get our initialized service so that we can register hooks


  service.hooks(hooks);
};

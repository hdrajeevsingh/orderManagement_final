/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
    this.employeesList = [
      { name: "John Doe", salary: 150 },
      { name: "Richard Roe", salary: 225 }
    ]
  }

  async find (params) {
    return  this.employeesList;
  }

  async get (id, params) {
    return  this.employeesList
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
      this.employeesList.push(data);
      return  this.employeesList;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
   this.employeesList=[];
   return this.employeesList;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;

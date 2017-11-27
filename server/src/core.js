module.exports = {
  pathDefinitions: {
    'jeep': {
      pathHost: 'http://www.jeep.com.br',
      pathJson: '/content/dam/jeep-msc/pt_BR',
      models: {
        'compass': '/csuv/data.json',
        'renegade': '/renegade/data.json',
      }
    }
  },

  getFilePathName: function(brand, model){
    return module.exports.pathDefinitions[brand].pathHost +
           module.exports.pathDefinitions[brand].pathJson +
           module.exports.pathDefinitions[brand].models[model];
  }
};

module.exports = {
  // declaring global variables
  arrFinal: [],
  arrInitialized: false,
  /**
    Extract and filter data from accessory array
  */
  extractData: function(accessoriesData) {
    var objData = {};
    [objData.code, objData.name, objData.desc, objData.price1, objData.price2, objData.type] = accessoriesData;
    objData.versions = accessoriesData.splice(6);
    // initializing array of accessories
    if(!module.exports.arrInitialized) {
      for(let i = 0; i < objData.versions.length; i++) {
        module.exports.arrFinal[i] = [];
      }
      module.exports.arrInitialized = true;
    }
    objData.price1 = parseInt(objData.price1.replace(',','').match(/(\d+)(\.\d+)?/)[1]).toString();
    objData.price2 = objData.price2.replace(',','').match(/(\d+)(\.\d+)?/)[0].toString();
    objData.typeId = module.exports.getTypeId(objData.type);
    return objData;
  },

  /**
    Get accessory type id from type string
  */
  getTypeId: function(type) {
    switch (type) {
      case 'ÁUDIO, VÍDEOS E ELETRÔNICOS':  return 'A01';
      case 'EXTERIORES':  return 'A02';
      case 'ILUMINAÇÃO E ELÉTRICOS':  return 'A03';
      case 'INTERIORES':  return 'A04';
      case 'TRANSPORTES E CARGAS':  return 'A05';
      default:            return '';
    }
  },
  /**
    Processes the file given and returns a list of accessories for each version
  */
  processAccessories: function(filename, callback) {
    // requiring libraries
    var fs = require('fs');

    // open the file
    fs.readFile(filename, 'utf8', function(err, data) {
      if (err) throw err;
      var arrData = data.split(/\n/);
      for(var line of arrData) {
        if(line !== '') {
          // split attributes
          var accessoriesData = line.split(/\;/);
          // extract and filter data
          var objData = module.exports.extractData(accessoriesData);
          // create accessory object
          var obj = {
            "codigo": objData.code.trim(),
            "descricao": objData.desc.trim(),
            "display": true,
            "exclusivos": [],
            "formasPagamento": [
              {
                "condicao": "4x de",
                "valor": objData.price2.trim()
              }
            ],
            "inclusivos": [],
            "kit": false,
            "nome": objData.name.trim(),
            "preco": objData.price1.trim(),
            "subtitulo": "",
            "tipo": objData.type.trim(),
            "tipoId": objData.typeId.trim()
          };
          // insert accessory in the correct order
          for(let i = 0; i < objData.versions.length; i++){
            module.exports.arrFinal[i][objData.versions[i].trim() - 1] = obj;
          }

        }
      }
      callback(module.exports.arrFinal);
    });
  },

  updateAccessories: function(jsonOriginal, newAccessories, versions, callback) {

    var versionsOriginal = jsonOriginal.modelo.versoesList;
    for(let i = 0; i < versionsOriginal.length; i++) {
      var id = versionsOriginal[i].productCode;
      for(let j = 0; j <= versions.length; j++) {
        if(versions[j] == id) {
          versionsOriginal[i].acessoriosView = newAccessories[j];
        }
      }
    }
    jsonOriginal.modelo.versoesList = versionsOriginal;
    callback(jsonOriginal);
  }
};

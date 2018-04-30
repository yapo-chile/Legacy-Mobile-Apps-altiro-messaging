const npmPackage = './package.json';
const npmDevPackage = './build/publish/package.dev.json';
const copyFile = require('./copyFile');
const fs = require('fs');

function prePublish() {
  copyFile(npmPackage, npmDevPackage, function(error) {
    if (error) {
      return console.log(err);
    }
    const finalNpmPackage = '../../package.json';
    let file = require(finalNpmPackage);
    if(Object.keys(file.dependencies).length > 0){
      file.dependencies = {};
      file.engines = {};
      fs.writeFileSync(npmPackage, JSON.stringify(file, null, 2), function (err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(file));
        return console.log('writing to ' + npmPackage);
      });
    }
    return 'package.json doesnt have properties';
  });
}

prePublish();

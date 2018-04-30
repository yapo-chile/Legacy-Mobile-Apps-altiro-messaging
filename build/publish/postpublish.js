const npmPackage = './package.json';
const npmDevPackage = './build/publish/package.dev.json';
const copyFile = require('./copyFile');

function postPublish() {
  copyFile(npmDevPackage, npmPackage, function(error) {
    if (error) {
      return console.log(err);
    }
  });
}

postPublish();

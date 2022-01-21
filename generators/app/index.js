const yosay = require("yosay");
const path = require("path");
const fs = require("fs");

const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  prompting() {
    this.log(yosay("Welcome to the sherman-uniapp generator!"));
    return this.prompt([
      {
        type: "input",
        name: "name",
        message: "The name of your project?",
        default: this.appname
      }
    ]).then(answers => {
      this.answers = answers;
    });
  }

  wirting() {
    const tmpDir = this.templatePath();
    const context = this.answers;
    console.log("tmpDir", tmpDir);
    const tempList = [];

    function fileDisplay(filePath) {
      const files = fs.readdirSync(filePath);
      files.forEach(function(filename) {
        const fileDir = path.join(filePath, filename);
        const stats = fs.statSync(fileDir);
        if (stats.isFile()) {
          tempList.push(fileDir);
        }

        if (stats.isDirectory()) {
          fileDisplay(fileDir);
        }
      });
    }

    fileDisplay(tmpDir);
    tempList.forEach(file => {
      const source = file.replace(this.templatePath() + "/", "");
      this.fs.copyTpl(
        this.templatePath(source),
        this.destinationPath(source),
        context
      );
    });
  }
};

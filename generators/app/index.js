const yosay = require("yosay");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(`Welcome to the ${chalk.red("sherman-uniapp")} generator!`));
    const prompts = [
      {
        type: "input",
        name: "name",
        message: "The name of your project?",
        default: this.appname
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const tmpDir = this.templatePath();
    const context = this.props;
    console.log(tmpDir);
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

  install() {
    this.installDependencies();
  }
};

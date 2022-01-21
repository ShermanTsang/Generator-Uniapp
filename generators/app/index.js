const yosay = require("yosay");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const Generator = require("yeoman-generator");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

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
      this.props = props;
    });
  }

  default() {
    this.log(
      `${chalk.bgGreen(
        "[ Info ]"
      )} find default destination path is ${chalk.blue(this.destinationPath())}`
    );
    this.log(
      `${chalk.bgGreen(
        "[ Info ]"
      )} find generator templates path is ${chalk.blue(this.templatePath())}`
    );
    if (path.basename(this.destinationPath()) !== this.props.name) {
      mkdirp(this.props.name);
      this.log(
        `${chalk.bgGreen("[ Info ]")} create ${chalk.blue(
          this.destinationPath()
        )} director`
      );
      this.destinationRoot(this.destinationPath(this.props.name));
      this.log(
        `${chalk.bgYellow("[ Notice ]")} set destination path to ${chalk.blue(
          this.destinationPath()
        )}`
      );
    }
  }

  writing() {
    const templateFiles = [];

    function fileMapper(filePath) {
      const files = fs.readdirSync(filePath);
      files.forEach(function(filename) {
        const fileDir = path.join(filePath, filename);
        const stats = fs.statSync(fileDir);
        if (stats.isFile()) {
          templateFiles.push(fileDir);
        }

        if (stats.isDirectory()) {
          fileMapper(fileDir);
        }
      });
    }

    fileMapper(this.templatePath());

    templateFiles.forEach(filePath => {
      const fileBarePath = filePath.replace(
        path.normalize(this.templatePath() + "/"),
        ""
      );
      this.fs.copyTpl(
        this.templatePath(fileBarePath),
        this.destinationPath(fileBarePath),
        this.props
      );
    });
  }

  install() {
    this.installDependencies();
  }
};

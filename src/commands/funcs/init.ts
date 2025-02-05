import {Command} from "@oclif/command";
import {prompt} from "inquirer";
import {join, basename} from "path";
const nodePlop = require("node-plop");
const plop = nodePlop(join(__dirname, "..", "..", "..", "src", "plopfile.ts"));
const init = plop.getGenerator("init");

export default class InitCommand extends Command {
  static description = `creates a new empty function
  ...
  Extra documentation goes here
  `;

  public async run() {
    console.log("This utility will help you create a basic function");

    const dirname: string = basename(process.cwd());
    const  questions: any = await prompt([
      {
        name: "pckgName",
        message: "package name",
        type: "input",
        default: dirname
      },
      {
        name: "pckgVersion",
        message: "version",
        type: "input",
        default: "1.0.0"
      },
      {name: "pckgDesc", message: "description", type: "input"},
      {
        name: "entryPoint",
        message: "entry point",
        type: "input",
        default: "handler.ts"
      },
      {name: "author", message: "author", type: "input"},
      {name: "license", message: "license", type: "input", default: "ISC"},
      {
        name: "confirm",
        message: "everything looks good?",
        type: "confirm"
      }
    ]);

    questions.cwd = process.cwd();

    if (!questions.confirm) {
      console.log("Aborted");
    } else {
      /**
       *  @description nodePlop have some issues about typeDef
       *  @example https://github.com/plopjs/node-plop/issues/194
       **/

      init.runActions(questions).then(() => console.log("Done"));
    }
  }
}

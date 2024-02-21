// const yargs = require('yargs/yargs')
// const { hideBin } = require('yargs/helpers')

const chalk = require('chalk')
const { addNote, removeNote, listNotes, readNote } = require("./data");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
// const argv = yargs(hideBin(process.argv)).argv; // for printing object of yargs

// method 1 for command

// yargs(hideBin(process.argv)).command({
//   command: "read",
//   describe: "reading notes",
//   builder: {
//     title: {
//       describe: "reading a note",
//       demandOption: true,
//       type:'string'
//     },
//     name:{
//         describe:"add your surname",
//         demandOption:true,
//         type:'string'
//     }
//   },
//   handler: function (argv) {
//     console.log("your name is", argv.title, argv.name);
//   },
// }).argv; // or .parse()

// method 2 for command

// yargs(hideBin(process.argv)).command(
//   "read",
//   "reading notes",
//   (yargs) => {
//     yargs
//       .option("title", {
//         describe: "reading a note",
//         type: "string",
//         demandOption: true,
//       })
//       .option("name", {
//         describe: "add your surname",
//         type: "string",
//         demandOption: true,
//       });
//   },
//   (argv) => {
//     console.log("your name is", argv.title, argv.name);
//   }
// ).argv; // or .parse()

// ---------------------------------------------------------------------------------------------

// console.log(`\n${chalk.bold('Command Line Interface for notes taking app')}\n`);
// console.log(`> you can read, write, delete and search in this notes app.`)
// console.log(`> use below keywords as arguments: \n`)
// console.log(chalk.blue(`read - read one of the existing notes.\nadd - add note into file\nlist - list all existing notes\nremove - remove a note\n`));
// console.log(`-h --help : to see the list of commands available.`);

// command to add note
yargs(hideBin(process.argv)).command(
  "add",
  "add a note",
  (yargs) => {
    yargs
      .option("title", {
        describe: "title of note",
        type: "string",
        demandOption: true,
      })
      .option("body", {
        describe: "note",
        type: "string",
        demandOption: true,
      });
  },
  (argv) => {
    addNote(argv.title, argv.body);
  }
).help().argv;

// command to remove a note
yargs(hideBin(process.argv)).command(
  "remove",
  "remove a note",
  (yargs) => {
    yargs.option("title", {
      describe: "title of note",
      type: "string",
      demandOption: true,
    });
  },
  (argv) => {
    removeNote(argv.title);
  }
).help().argv;

// command to read a note
yargs(hideBin(process.argv)).command(
  "read",
  "read a note",
  (yargs) => {
    yargs.option("title", {
      describe: "title of note",
      type: "string",
      demandOption: true,
    });
  },
  (argv) => {
    readNote(argv.title);
  }
).help().argv;

// command to list notes
yargs(hideBin(process.argv)).command("list", "list notes", () => {
  listNotes();
}).help().argv;

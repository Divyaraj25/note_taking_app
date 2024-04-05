const fs = require("fs");
const chalk = require("chalk");

// addnote in data.json
const addNote = (title, body) => {
  const loadnotes = loadNotes();

  // method 1 - using filter, complex one
  // for duplicate notes loaded in other array. it traverse whole array if found then also traverse. this is more complex
  // const duplicateNotes = loadnotes.filter((note) => {
  //   return note.title === title;
  // });

  // method 2 - using find
  // to find duplicate note. simpler than traversing the whole array
  const duplicateNote = loadnotes.find((note) => note.title === title);

  // debugger
  // use node inspect notes.js (argvs)
  // use node --inspect--brk notes.js (argvs)
  // go to chrome, open chrome://inspect, click on inspect for this port device

  if (!duplicateNote) {
    loadnotes.push({
      title: title,
      body: body,
    });
    saveNotes(loadnotes);
    console.log(chalk.bgGreen("New note added...."));
  } else {
    console.log(chalk.bgYellow("Title is occupied"));
    console.log(chalk.yellow("please try some new note!"));
  }
};

const removeNote = (title) => {
  const loadnotes = loadNotes();
  // method 1

  //   const filteredNotes = loadnotes.filter((note) => note.title !== title);
  //   console.log(filteredNotes.length);
  //   if (loadnotes.length > filteredNotes.length) {
  //     saveNotes(filteredNotes);
  //     console.log(chalk.bgGreen("Removed successfully!!"));

  //   } else {
  //     console.log(chalk.bgRed("No such note found!"));
  //   }

  // method 2

  const index = loadnotes.findIndex((note) => note.title === title);
  if (index === -1) {
    console.log(chalk.bgRed("No such note found!"));
  } else {
    loadnotes.splice(index, 1);
    saveNotes(loadnotes);
    console.log(chalk.bgGreen("Removed successfully!"));
  }
};

const listNotes = () => {
  const loadnotes = loadNotes();
  if (loadnotes.length > 0) {
    loadnotes.forEach((t) => {
      console.log(
        chalk.green("Title") + " : " + t.title + "\n Body" + " : " + t.body
      );
    });
  } else {
    console.log(chalk.yellow("No notes added or found"));
  }
};

const readNote = (title) => {
  const loadnotes = loadNotes();
  const result = loadnotes.find((t) => t.title === title);
  if (result) {
    console.log(
      chalk.inverse(`Title : ${result.title}`) + "\n" + ` Body : ${result.body}`
    );
  } else {
    console.log(chalk.red.inverse("no search result found"));
  }
};

// to save notes in json file, write the text in json file
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("data.json", dataJSON);
};

// read json file if not created return array in json file
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("data.json");
    return JSON.parse(dataBuffer);
  } catch (e) {
    return [];
  }
};

// exports all functions for use in other files
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};

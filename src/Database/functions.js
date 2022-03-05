const fs = require("fs");
const jsonEditor = require("./jsonEditor.js");
module.exports = {
  create: function create(seed, data, options) {
    if (fs.existsSync(`./db/server/${seed}.json`)) return;
    let object = {};
    if (data && options) object = { data: options };
    fs.writeFile(
      `./db/server/${seed}.json`,
      JSON.stringify(object),
      { encoding: "utf8" },
      (err) => {
        if (err) throw err;
      }
    );
  },
  set: async (seed, name, value) => {
    if (!fs.existsSync(`./db/server/${seed}.json`)) this.create(seed);
    let file = jsonEditor(`./db/server/${seed}.json`);
    file.set(name, value);
    file.save();
  },
  delete: function Delete(seed, name) {
    let file = jsonEditor(`./db/server/${seed}.json`);
    file.unset(name);
    file.save();
  },
  get: function get(seed) {
    if (!fs.existsSync(`./db/server/${seed}.json`)) this.create(seed);
    let data = require(`./db/server/${seed}.json`);
    return data;
  },
};

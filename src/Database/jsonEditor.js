"use strict";

const findValue = require("find-value"),
  setValue = require("set-value"),
  rJson = require("r-json"),
  fs = require("fs"),
  iterateObject = require("iterate-object"),
  os = require("os");

class JsonEditor {
  /**
   * JsonEditor
   *
   * @name JsonEditor
   * @function
   * @param {String} path The path to the JSON file.
   * @param {Object} options An object containing the following fields:
   *
   *  - `stringify_width` (Number): The JSON stringify indent width (default: `2`).
   *  - `stringify_fn` (Function): A function used by `JSON.stringify`.
   *  - `stringify_eol` (Boolean): Whether to add the new line at the end of the file or not (default: `false`)
   *  - `ignore_dots` (Boolean): Whether to use the path including dots or have an object structure (default: `false`)
   *  - `autoave` (Boolean): Save the file when setting some data in it.
   *
   * @returns {JsonEditor} The `JsonEditor` instance.
   */
  constructor(path, options) {
    this.options = options = options || {};
    options.stringify_width = options.stringify_width || 2;
    options.stringify_fn = options.stringify_fn || null;
    options.stringify_eol = options.stringify_eol || false;
    options.ignore_dots = options.ignore_dots || false;
    this.path = path;
    this.data = this.read();
  }

  /**
   * set
   * Set a value in a specific path.
   *
   * @name set
   * @function
   * @param {String} path The object path.
   * @param {Anything} value The value.
   * @param {Object} options The options for set-value (applied only when {ignore_dots} file option is false)
   * @returns {JsonEditor} The `JsonEditor` instance.
   */
  set(path, value, options) {
    if (typeof path === "object") {
      iterateObject(path, (val, n) => {
        setValue(this.data, n, val, options);
      });
    } else if (this.options.ignore_dots) {
      this.data[path] = value;
    } else {
      setValue(this.data, path, value, options);
    }
    if (this.options.autosave) {
      this.save();
    }
    return this;
  }

  /**
   * get
   * Get a value in a specific path.
   *
   * @name get
   * @function
   * @param {String} path
   * @returns {Value} The object path value.
   */
  get(path) {
    if (path) {
      if (this.options.ignore_dots) {
        return this.data[path];
      }
      return findValue(this.data, path);
    }
    return this.toObject();
  }

  /**
   * unset
   * Remove a path from a JSON object.
   *
   * @name unset
   * @function
   * @param {String} path The object path.
   * @returns {JsonEditor} The `JsonEditor` instance.
   */
  unset(path) {
    return this.set(path, undefined);
  }

  /**
   * append
   * Appends a value/object to a specific path.
   * If the path is empty it wil create a list.
   *
   * @name append
   * @function
   * @param {String} path The object path.
   * @param {Anything} value The value.
   * @returns {JsonEditor} The `JsonEditor` instance.
   */
  append(path, value) {
    let data = this.get(path);
    data = data === undefined ? [] : data;
    if (!Array.isArray(data)) {
      throw new Error("The data is not an array!");
    }
    data.push(value);
    this.set(path, data);
    return this;
  }

  /**
   * pop
   * Pop an array from a specific path.
   *
   * @name pop
   * @function
   * @param {String} path The object path.
   * @returns {JsonEditor} The `JsonEditor` instance.
   */
  pop(path) {
    const data = this.get(path);
    if (!Array.isArray(data)) {
      throw new Error("The data is not an array!");
    }
    data.pop();
    this.set(path, data);
    return this;
  }

  /**
   * read
   * Read the JSON file.
   *
   * @name read
   * @function
   * @param {Function} cb An optional callback function which will turn the function into an asynchronous one.
   * @returns {Object} The object parsed as object or an empty object by default.
   */
  read(cb) {
    if (!cb) {
      try {
        return rJson(this.path);
      } catch (e) {
        return {};
      }
    }
    rJson(this.path, function (err, data) {
      data = err ? {} : data;
      cb(null, data);
    });
  }

  /**
   * write
   * Write the JSON file.
   *
   * @name read
   * @function
   * @param {String} The file content.
   * @param {Function} cb An optional callback function which will turn the function into an asynchronous one.
   * @returns {JsonEditor} The `JsonEditor` instance.
   */
  write(content, cb) {
    if (cb) {
      fs.writeFile(this.path, content, cb);
    } else {
      fs.writeFileSync(this.path, content);
    }
    return this;
  }

  /**
   * empty
   * Empty the JSON file content.
   *
   * @name empty
   * @function
   * @param {Function} cb The callback function.
   */
  empty(cb) {
    return this.write("{}", cb);
  }

  /**
   * save
   * Save the file back to disk.
   *
   * @name save
   * @function
   * @param {Function} cb An optional callback function which will turn the function into an asynchronous one.
   * @returns {JsonEditor} The `JsonEditor` instance.
   */
  save(cb) {
    const data = JSON.stringify(
      this.data,
      this.options.stringify_fn,
      this.options.stringify_width,
      this.options.stringify_eol
    );
    this.write(this.options.stringify_eol ? data + os.EOL : data, cb);
    return this;
  }

  /**
   * toObject
   *
   * @name toObject
   * @function
   * @returns {Object} The data object.
   */
  toObject() {
    return this.data;
  }
}

/**
 * editJsonFile
 * Edit a json file.
 *
 * @name editJsonFile
 * @function
 * @param {String} path The path to the JSON file.
 * @param {Object} options An object containing the following fields:
 * @return {JsonEditor} The `JsonEditor` instance.
 */
module.exports = function editJsonFile(path, options) {
  return new JsonEditor(path, options);
};

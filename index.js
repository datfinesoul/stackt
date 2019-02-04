'use strict';

const regexAtLine = new RegExp(/^\s+at (?:([^ ]+) )?\(?([^)]+)\)?$/);
const regexIgnore = new RegExp(/\/node_modules\/|^internal\/|<anonymous>/);
const workingDir = process.cwd();
const regexReplaceDir = new RegExp(workingDir, 'g');

module.exports = (stack, options) => {
  options = Object.assign({
    array: false
    , compact: false
  }, options);
  if (typeof stack === 'string') {
    // padding in front of the 'at'
    const padding = (options.compact === true) ? '' : '    ';
    const output = stack
    .replace(regexReplaceDir, '')
    .split('\n')
    .reduce((lines, line) => {
      // only keeping lines that begin with the 'at'.
      // the duplicative error.message at the top of the stack is stripped
      const core = regexAtLine.exec(line);
      if (
        (core === null)
        || !core[2]
        || !core[2].match(/\//)
        || regexIgnore.exec(core[2])
      ){
        return lines;
      }
      if (core[1]) {
        lines.push(`${padding}at ${core[1]} (${core[2]})`);
      } else {
        lines.push(`${padding}at ${core[2]}`);
      }
      return lines;
    }, [])
    if (options.array) {
      return output;
    }
    return output.join('\n');
  }
  return stack;
};

'use strict';

module.exports = (stack, options) => {
  options = Object.assign({
    array: false
    , compact: false
  }, options);
  if (typeof stack === 'string') {
    const workingDir = process.cwd();
    const padding = (options.compact === true) ? '' : '    ';
    const output = stack
    .split('\n')
    .reduce((lines, line) => {
      const core = line.match(/^\s+at (?:([^ ]+) )?\(?([^)]+)\)?$/);
      if (
        (core === null)
        || (!core[2])
        || (!core[2].match(/\//))
        || (core[2].match(/\/node_modules\/|^internal\/|<anonymous>/))
      ){
        return lines;
      }
      if (core[1]) {
        lines.push(`${padding}at ${core[1]} (${core[2].replace(workingDir, '')})`);
      } else {
        lines.push(`${padding}at ${core[2].replace(workingDir, '')}`);
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

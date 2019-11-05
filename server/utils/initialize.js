const fs = require('fs');

/**
 * Retrieves the content from the volume file after restart
 * @param {string} directory path to dir
 */
const _initizalize = (directory) => {
    let contents = fs.readFileSync(`${directory}/config.json`, {encoding: 'utf8'});
    console.log("Initialized from file. Current state:");
    console.log();
    console.log(contents);
    return JSON.parse(contents);
};

module.exports = _initizalize;
const fs = require('fs');

/**
 * Retrieves the content from the volume file after restart
 * @param {string} directory path to dir
 */
const _initizalize = (directory) => {
    let contents = fs.readFileSync(`${directory}/config.json`, {encoding: 'utf8'});
    try {
        let json = JSON.parse(contents);
        console.log("Initialized from file. Current state:");
        console.log();
        console.log(contents);
        return JSON.parse(contents);
    } catch(e) {
        console.log(e);
    } finally {
        return {
            current: [],
            archive: {}
        };
    }
    
};

module.exports = _initizalize;
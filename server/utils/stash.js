const hash = require('./hash');
const timestamp = require('./timestamp');
const fs = require('fs');

/**
 * Stashes data to a backup file
 * @param {string} data 
 */
const _stash = (data) => new Promise((resolve, reject) => {
    const _data = JSON.stringify(data);
    const dir = process.env.DATA_MOUNTING_POINT || './static';
    const _timestamp = timestamp();
    const file = `${_timestamp} - ${hash(_data, false)}`;
    _log(_timestamp, hash(_data), file);
    fs.appendFileSync(`${dir}/.stash`, `${file}\n---\n` + JSON.stringify(data, null, '  '), (err) => {
        if(err){
            reject(err);
        } else {
            resolve(hash(_data));
        }
    });
});

const _log = (t,h,f) => {
    console.log('Stashing current version:')
    console.log("    time: " + t);
    console.log("    id: " + h);
    console.log("    file: " + f);
}

module.exports = _stash;
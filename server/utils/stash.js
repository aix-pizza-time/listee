const {hash, timestamp} = require('./');
const fs = require('fs');
const glob_data = require('../').data;

/**
 * Stashes data to a backup file
 * @param {string} data 
 */
const _stash = (data = glob_data) => new Promise((resolve, reject) => {
    const _data = JSON.stringify(data);
    const dir = process.env.DATA_MOUNTING_POINT || './static';
    const timestamp = _timestamp();
    const file = `${dir}/.${timestamp}-${hash(_data)}.json`;
    _log(timestamp, hash(_data), file);
    fs.writeFile(file, JSON.stringify(data, null, '  '), (err) => {
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
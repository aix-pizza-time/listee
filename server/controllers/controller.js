let {hash, timestamp, initialize} = require('../utils/');
let _stash = require('../utils/').stash;

data = initialize(process.env.DATA_MOUNTING_POINT || "./static");

stash = () => _stash(data);

const _add = (entry) => new Promise((resolve, reject) => {
    const id = hash(entry);
    if(typeof entry !== 'string'){
        console.log('Received invalid type:')
        console.log(entry);
        reject('Incorrect data type. Only strings are allowed');
    } else {
        if(data['current'][id]){
            // Element already present, retreat!
            reject('Element already present. Will not add it again.');
        } else {
            if(entry.length <= 0){
                reject('Empty names are not allowed. Will not add');
            } else {
                data['current'][id] = entry;
                resolve({id: id, entry: entry});
            }
        }
    }
});

const _rename = (id, newName) => new Promise((resolve, reject) => {
    // stash the current state to avoid obstruction of db
    stash().catch(() => (reject(err)));
    if(typeof id !== 'string' || typeof newName !== 'string'){
        console.log('Received invalid type(s):')
        console.log(id);
        console.log(newName);
        reject('Incorrect data type. Only strings are allowed');
    } else {
        if(!data['current'][id]){
            // Element already present, retreat!
            reject('Element not present. Will not rename');
        } else {
            if(newName.length <= 0){
                reject('Empty names are not allowed. Will not rename');
            } else {
                data['current'][id] = newName;
                resolve({id: id, entry: newName});    
            }
        }
    }

});

const _delete = (id) => new Promise((resolve, reject) => {
    // stash the current state to avoid obstruction of db
    stash().catch(() => (reject(err)));
    if(typeof id !== 'string'){
        console.log('Received invalid type:')
        console.log(id);
        reject('Incorrect data type. Only strings are allowed');
    } else {
        if(!data['current'][id]){
            // Element already present, retreat!
            reject('Element not present. Will not delete');
        } else {
            let old_data = data['current'][id] + '';
            delete data['current'][id];
            resolve({id: id, entry: old_data});
        }
    }
});

/**
 * 'Commit' will copy the entries from the staging (current) zone
 * into a timestamped archive of previous lists.
 * It however does not alter the state of the 'current' list, as 
 * it's not yet dismissable
 */
const _commit = () => new Promise((resolve, reject) => {
    // stash the current state to avoid obstruction of db
    stash().catch(() => (reject(err)));
    if(Object.keys(data['current']).length <= 0){
        reject('Current list has no data. Will not copy');
    } else {
        let cur = data['current'];
        cur[date] = timestamp(false);
        data['archive'][hash(cur)] = cur;
        data['current']['committed'] = true;
        resolve(data['current']);
    }
});

/**
 * Resets the currently only if the list has previously been committed
 * to the index, i.e. by calling POST /api/commit
 */
const _reset = () => new Promise((resolve, reject) => {
    // stash the current state to avoid obstruction of db
    stash().catch(() => (reject(err)));
    if(!data['current']['committed'] && data['current']['committed'] !== true){
        reject('List not committed. Will not reset');
    } else {
        let cur = data['current'];
        data['current'] = {};
        resolve(cur);
    }
});

const _lists = () => new Promise((resolve, reject) => {
    try {
        let keys = Object.keys(data.archive);
        resolve(keys);
    } catch (e) {
        reject(e);
    }
});

const _get = (id = 'current') => new Promise((resolve, reject) => {
    if(id === 'current'){
        resolve(data[id]);
    } else {
        if(data['archive'].hasOwnProperty(id)){
            resolve(data['archive'][id]);
        } else {
            reject('ID not found');
        }
    }
});

module.exports = {
    add: _add,
    rename: _rename,
    delete: _delete,
    commit: _commit,
    reset: _reset,
    lists: _lists,
    get: _get
};
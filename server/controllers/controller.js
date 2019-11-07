let {
  hash,
  timestamp,
  initialize,
  commit
} = require('../utils/');
let _stash = require('../utils/').stash;

data = initialize(process.env.DATA_MOUNTING_POINT || "./static");

const stash = () => new Promise((resolve, reject) => {
  _stash(data).then(_ => resolve()).catch(err => reject(err));
});

Array.prototype.findById = function (id) {
  if (typeof id !== 'string') {
    return null;
  } else {
    return this.find((v) => v.id === id);
  }
};

Array.prototype.findIndexById = function (id) {
  if (typeof id !== 'string') {
    return null;
  } else {
    return this.findIndex((v) => v.id === id);
  }
};

const _add = (entry) => new Promise((resolve, reject) => {
  const id = hash(entry);
  if (typeof entry !== 'string') {
    console.log('Received invalid type:')
    console.log(entry);
    reject('Incorrect data type. Only strings are allowed');
  } else {
    if (data['current'].findById(id)) {
      // Element already present, retreat!
      reject('Element already present. Will not add it again.');
    } else {
      if (entry.length <= 0) {
        reject('Empty names are not allowed. Will not add');
      } else {
        data['current'].push({
          id: id,
          entry: entry
        });
        commit(data);
        resolve({
          id: id,
          entry: entry
        });
      }
    }
  }
});

const _rename = (id, newName) => new Promise((resolve, reject) => {
  // stash the current state to avoid obstruction of db
  stash().catch((err) => (reject(err)));
  if (typeof id !== 'string' || typeof newName !== 'string') {
    console.log('Received invalid type(s):')
    console.log(id);
    console.log(newName);
    reject('Incorrect data type. Only strings are allowed');
  } else {
    if (!data['current'].findById(id)) {
      // Element already present, retreat!
      reject('Element not present. Will not rename');
    } else {
      if (newName.length <= 0) {
        reject('Empty names are not allowed. Will not rename');
      } else {
        data['current'][id] = newName;
        commit(data);
        resolve({
          id: id,
          entry: newName
        });
      }
    }
  }

});

const _delete = (id) => new Promise((resolve, reject) => {
  // stash the current state to avoid obstruction of db
  stash().catch((err) => (reject(err)));
  if (typeof id !== 'string') {
    console.log('Received invalid type:')
    console.log(id);
    reject('Incorrect data type. Only strings are allowed');
  } else {
    if (!data['current'].findById(id)) {
      // Element already present, retreat!
      reject('Element not present. Will not delete');
    } else {
      let index = data['current'].findIndexById(id);
      let old_data = data['current'][index];
      data['current'].splice(index, 1);
      commit(data);
      resolve({
        id: id,
        entry: old_data
      });
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
  stash().catch((err) => (reject(err)));
  if (Object.keys(data['current']).length <= 0) {
    reject('Current list has no data. Will not copy');
  } else {
    let cur = data['current'];
    cur[date] = timestamp(false);
    data['archive'][hash(cur)] = cur;
    data['committed'] = true;
    commit();
    resolve(data['current']);
  }
});

/**
 * Resets the currently only if the list has previously been committed
 * to the index, i.e. by calling POST /api/commit
 */
const _reset = () => new Promise((resolve, reject) => {
  // stash the current state to avoid obstruction of db
  stash().catch((err) => (reject(err)));
  if (!data['committed'] && data['committed'] !== true) {
    reject('List not committed. Will not reset');
  } else {
    let cur = data['current'];
    data['current'] = [];
    commit();
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
  if (id === 'current') {
    resolve(data[id]);
  } else {
    if (data['archive'].hasOwnProperty(id)) {
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
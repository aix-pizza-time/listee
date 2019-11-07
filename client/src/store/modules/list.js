import axios from 'axios';

const host = process.env.production === 'true' ? '' : 'http://localhost:3000';

Array.prototype.findIndexById = function (id) {
  if (typeof id !== 'string') {
    return null;
  } else {
    return this.findIndex((v) => v.id === id);
  }
};


const state = {
  list: {},
  getStatus: null,
  addStatus: null,
  deleteStatus: null,
  renameStatus: null,
  commitStatus: null,
  resetStatus: null,
  committed: false,
};

const getters = {
  list: (state) => {
    return state.list;
  },
  committed: (state) => {
    return state.committed;
  }
};

const actions = {
  getList({commit}) {
    axios.get(`${host}/api/list`)
      .then(({data}) => {
        commit('setGetStatus', 'successful');
        commit('setList', { list: data.currentList });
      }).catch(() => {
        commit('setGetStatus', 'failed');
        commit('setList', { list: [] });
      });
  },

  getCommitState({commit}) {
    axios.get(`${host}/api/committed`)
      .then(({data}) => {
        commit('setGetStatus', 'successful');
        commit('setCommitted', {committed: data.committed});
      }).catch(() => {
        commit('setGetStatus', 'failed');
        commit('setCommitted', false);
      });
  },

  addEntry({commit}, item) {
    // const prevList = [...state.items];
    axios.post(`${host}/api/add`, item)
      .then(({data}) => {
        commit('setAddStatus', 'successful');
        commit('pushEntryToList', data['newEntry']);
      }).catch(() => {
        commit('setAddStatus', 'failed');
      });
  },

  renameEntry({state, commit}, {id, entry}) {
    const prevList = [...state.list];
    commit('setEntry', {id, entry});
    axios.post(`${host}/api/rename/${id}`, {'entry': entry})
      .then(() => {
        commit('setRenameStatus', 'successful');
      }).catch(() => {
        commit('setRenameStatus', 'failed');
        // Roll back
        commit('setList', { list: prevList });
      });
  },

  deleteEntry({commit}, {id}) {
    // const prevList = [...state.list];
    axios.delete(`${host}/api/delete/${id}`)
      .then(() => {
        commit('setDeleteStatus', 'successful');
        commit('removeEntry', {id});
      }).catch(() => {
        commit('setDeleteStatus', 'failed');
      });
  },

  resetList({state, commit}) {
    const prevList = [...state.list];
    commit('setList', { list: [] });
    axios.post(`${host}/api/reset`, {})
      .then(() => {
        commit('setResetStatus', 'successful');
        commit('setCommitted', false);
      }).catch(() => {
        commit('setResetStatus', 'failed');
        // Roll back
        commit('setList', { list: prevList });
      });
  },

  commitList({commit}) {
    // const prevList = [...state.list];
    // commit('setList', { list: {} });
    axios.post(`${host}/api/commit`, {})
      .then(() => {
        commit('setResetStatus', 'successful');
        commit('setCommitted', {committed: true});
      }).catch(() => {
        commit('setResetStatus', 'failed');
        // Roll back
        commit('setCommitted', {committed: false});
      });
  }
};

const mutations = {
  pushEntryToList (state, {id, entry}) {
    state.list.push({id: id, entry: entry});
  },

  setEntry (state, {id, entry}) {
    // console.log(id);
    // console.log(entry);
    let _id = state.list.findIndexById(id);
    state.list.splice(_id, 1, {id: id, entry: entry});
  },

  removeEntry (state, {id}){
    // Primitive solution
    // since this might not work, due to remaining references
    // rather reconstruct the whole object and set it to the state
    // delete state.list[id];
    let i = state.list.findIndexById(id);
    state.list.splice(i, 1);
  },

  setList (state, {list}) {
    state.list = list;
  },

  setGetStatus (state, status){
    state.getStatus = status;
  },
  setAddStatus (state, status){
    state.addStatus = status;
  },
  setRenameStatus (state, status){
    state.renameStatus = status;
  },
  setCommitStatus (state, status){
    state.commitStatus = status;
  },
  setDeleteStatus (state, status){
    state.deleteStatus = status;
  },
  setResetStatus (state, status){
    state.resetStatus = status;
  },

  setCommitted (state, {committed}){
    state.committed = committed;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

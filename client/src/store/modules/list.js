import axios from 'axios';

const host = 'http://localhost:3000';

const state = {
  list: {},
  getStatus: null,
  addStatus: null,
  deleteStatus: null,
  renameStatus: null,
  commitStatus: null,
  resetStatus: null,
};

const getters = {
  list: (state, getters, rootState) => {
    return state.list;
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
        commit('setList', { list: {} });
      });
  },

  addEntry({state, commit}, item) {
    // const prevList = [...state.items];
    axios.post(`${host}/api/add`, item)
      .then(({data}) => {
        commit('setAddStatus', 'successful');
        commit('pushEntryToList', data['newEntry']);
      }).catch((err) => {
        commit('setAddStatus', 'failed');
      });
  },

  renameEntry({state, commit}, {id, entry}) {
    const prevList = [...state.list];
    commit('setEntry', {id, entry});
    axios.post(`${host}/api/rename/${id}`, entry)
      .then(() => {
        commit('setRenameStatus', 'successful');
      }).catch(() => {
        commit('setRenameStatus', 'failed');
        // Roll back
        commit('setList', { list: prevList });
      });
  },

  deleteEntry({state, commit}, {id}) {
    // const prevList = [...state.list];
    console.log(id);
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
    commit('setList', { list: {} });
    axios.post(`${host}/api/reset`, {})
      .then(() => {
        commit('setResetStatus', 'successful');
      }).catch(() => {
        commit('setResetStatus', 'failed');
        // Roll back
        commit('setList', { list: prevList });
      });
  }
};

const mutations = {
  pushEntryToList (state, {id, entry}) {
    state.list[id] = entry;
  },

  setEntry (state, {id, entry}) {
    state.list[id] = entry;
  },

  removeEntry (state, {id}){
    // Primitive solution
    // since this might not work, due to remaining references
    // rather reconstruct the whole object and set it to the state
    // delete state.list[id];
    let reducedList = {};
    Object.keys(state.list).forEach((key) => {
      if(key !== id){
        reducedList[key] = state.list[key];
      }
    });
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

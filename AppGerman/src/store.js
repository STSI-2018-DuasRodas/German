import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: {
      filterStatus: 0,
      sector: '',
      maintenanceType: '',
      searchFilter: '',
    },
    port: 3000,
    host: 'http://localhost',
  },
  mutations: {
    SET_FILTER_STATUS(state, value) {
      state.list.filterStatus = value;
    },

    SET_SEARCH_FILTER(state, value) {
      state.list.searchFilter = value;
    }
  },
  actions: {
    
  },
});

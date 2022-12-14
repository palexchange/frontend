const state = () => {
  return {
    user: null,
    token: null,
    errors: null
  }
};
const getters = {
  all: state => state.posts
};
const actions = {
  login({
    commits
  }, data) {
    this.state.overlay = true;
    this.$axios.$post('/oauth/token', data).then((response) => {
      console.log(response);
      commit('setUser', response.data);
      this.$axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.access_token;
      this.state.overlay = false;
      let user = response.data;
      localStorage.user_data = JSON.stringify({
        user
      });
    }).catch(err => {
      this.state.overlay = false;

      commit('setErrors', err);
    });
  },
  loadUserFromSocialToken({
    commit
  }, data) {
    console.log(data);
    this.state.overlay = true;
    this.$axios.defaults.headers.common['Authorization'] = "Bearer " + data;
    this.$axios.post('/auth/me', {
      token: data
    }, {

    }).then((response) => {
      commit('setUser', response.data);
      this.state.overlay = false;
      let user = response.data;
      localStorage.user_data = JSON.stringify({
        user
      });
    }).catch(err => {
      this.state.overlay = false;

      commit('setErrors', err);
    });
  },
  me({
    commit
  }) {
    this.$axios.get('/auth/me').then((response) => {
      commit('setUser', response.data);
    }).catch(err => {
      console.log(err);
    });
  },
  refresh({
    commit
  }) {
    console.log("refreshing .. ");
    this.$axios.post('/auth/refresh').then((response) => {
      commit('setToken', response.data);
      let refresh_time = response.data.token.expires_in * 1000;
      refresh_time -= parseInt(refresh_time / 4);
      setTimeout(() => {
        this.dispatch('refresh');
      }, refresh_time);
    }).catch(err => {
      console.log(err);
    });
  },
  load({
    commit
  }, user) {
    if (user) {
      commit('setUser', user);
      this.$axios.defaults.headers.common['Authorization'] = "Bearer " + user.token.access_token;
      this.state.overlay = false;
    }
  },
  unload({
    commit
  }) {
    console.log("Remved");
    commit('removeUser');
    localStorage.removeItem('user_data');
  }
}
const mutations = {
  setUser: (state, data) => {
    state.user = data;
  },
  setToken: (state, data) => {
    state.token = data.token
  },
  setErrors: (state, data) => {
    state.errors = data;
  },
  removeUser: (state) => state.user = null
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

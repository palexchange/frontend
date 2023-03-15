import codes from "country-codes-list";
import locales from '~/assets/locales';
export const state = () => ({
  name: "meow",
  input_number_format: 2,
  output_number_format: 2,
  list: [1, 2, 3, 4],
  prefxBillCode: '#TS ',
  btns: null,
  context: {},
  errors: [],
  redirect: null,
  success_msg: null,
  all_codes: codes.all(),
  deletingData: null,
  last_key_listener_value: null,
  editingData: null,
  locales,
  module_name: null,
  overlay: false,
  loading: false,
  loaded: false,
  post_loading: false,
  state_dialog: { item: {}, active: false, name: '' },
  app_settings: {}
})

export const actions = {
  // nuxtServerInit ({ commit,dispatch}, { req }) {
  //   dispatch('setDefaultDigitsNumber')
  // },
  setLastListenerKey({ commit }, data) {
    commit('set_listener_key', data)
  },
  setSettings({ commit }, data) {
    commit('set_settings', data)
  },
  logout({ commit }, data) {
    commit('set_logout')
  },
  setDialog({ commit }, data) {
    commit('set_dialog', data)
  },
  closeDialog({ commit }) {
    commit('close_dialog')
  },
  putHello(cintext, data) {
    cintext.commit("edit_name", data)
  },
  addErrors({
    commit
  }, data) {
    commit('add_errors', data)

  },
  testAxios() {


  },
  // nuxtServerInit({
  //   commit,
  //   dispatch
  // }) {
  //   console.log("a7a1");
  // },
  add_context({
    commit
  }, menu_context) {
    commit('push_context', menu_context)
  },
  close_context_menu({
    commit
  }) {
    commit('closeing_context_menu')
  },
  setRedirect({ commit }, redirect) {
    commit('setRedirect', redirect);
  },
  clearRedirect({ commit }) {
    commit('clearRedirect');
  },
  setSuccessMsg({ commit }, msg) {
    commit('setSuccessMsg', msg);
  },
  clearSuccessMsg({ commit }) {
    commit('clearSuccessMsg');
  },
  setMenuActionDetails({ commit }, details) {
    commit('set_menu_action_details', details);
  },
  async setDefaultDigitsNumber({ commit }) {
    let response = await this.$axios.get("/financial_setting/digits_number");

    commit('setDefaultDigitsNumber', response.data.data.value);
  },
  setDeleteData({ commit }, data) {
    commit('set_delete_data', data)
  },
  setEditData({ commit }, data) {
    commit('set_edit_data', data)
  },
  setModule({ commit }, data) {
    commit('set_module', data)
  },
  setOverlay({ commit }, data) {
    commit('set_overlay', data)
  },
  setLoading({ commit }, data) {
    commit('set_loading', data)
  },
  setPostLoading({ commit }, data) {
    commit('set_post_loading', data)
  },

}

export const mutations = {
  set_listener_key(state, newKey) {
    console.log("newKey");
    console.log(newKey);
    state.last_key_listener_value = newKey
  },
  set_logout(state, settingData) {
    this.$axios.$post('/auth/logout')
  },
  set_settings(state, settingData) {
    state.app_settings = settingData
  },
  edit_name(state, bewName) {
    state.name = bewName
  },
  add_error(state, data) {
    state.errors = data
  },
  set_dialog(state, data) {

    state.state_dialog = { ...data, active: true }
  },
  close_dialog(state) {
    state.state_dialog = { item: {}, name: '', active: false }
  },
  push_context(state, data) {
    state.context = data
  },
  add_errors(state, data) {
    state.errors = data
  },
  closeing_context_menu(state) {
    state.context.showMenu = false
  },
  setErrors: (state, errors) => {
    state.errors = errors
  },
  setRedirect: (state, redirect) => {
    state.redirect = redirect;
  },
  clearRedirect: (state) => {
    state.redirect = null;
  },
  setSuccessMsg: (state, msg) => {
    state.success_msg = msg;
  },
  clearSuccessMsg: (state) => {
    state.success_msg = null;
    state.redirect = null;
  },
  set_menu_action_details: (state, details) => {
    state.context.title = details.title;
    state.context.action = details.action;
  },
  setDefaultDigitsNumber: (state, digits_number) => {
    state.input_number_format = digits_number;
  },
  set_delete_data: (state, data) => {
    state.deletingData = data;
  },
  set_edit_data: (state, data) => {
    state.editingData = data;
  },
  set_module: (state, data) => {
    state.module_name = data;
  },
  set_overlay: (state, data) => {
    state.overlay = data;
  },
  set_loading: (state, value) => {

    state.loading = value;
    state.loaded = !value;
  },
  set_post_loading: (state, value) => {

    state.post_loading = value;
  },
}


export const modules = {
  // ...r_modules
}

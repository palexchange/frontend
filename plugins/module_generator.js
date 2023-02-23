import resources_generator from "../helpers/resources";
import { get, set, del, clear } from 'idb-keyval';
export default (context, inject) => {
  let module_name = '';
  let modules = {};
  let resources = resources_generator(context);
  resources.map((resource) => {
    let module_name = (resource.parent != '' ? (resource.parent + '.') : '') + resource.child;
    let state = () => {
      return {
        one: null,
        all: [],
        all_records: [],
        closing_fund: [],
        opening_fund: [],

        meta: {
          current_page: 1
        },
        links: {},
        loaded: false,
        errors: {},
        functions: [],
        headers: [],
        html: null,
        params: {},
        formatted_numbers: [],
        loading: false,
      };
    };
    let getters = {
      all: state => state.all,
      all_records: state => state.all_records,
      one: state => state.one
    };
    let actions = {
      async refresh({
        commit,
        state,
        dispatch
      }, params) {
        await del(module_name);
        return dispatch('index', params);
      },
      async index_all({
        commit,
        state,
        dispatch
      }, params) {

        params = params == null ? {} : params
        await dispatch('empty');
        let path = resource.parent;
        if (!path) {
          path = resource.child
        } else {
          path = path + '/' + params[resource.parent + '_id'] + '/' + resource.child;
        }
        let response;
        commit('setParams', params);
        try {
          dispatch('setLoading', true, {
            root: true
          });
          response = await this.$axios.$get(`/${path}`, {
            params: {
              page: state.meta?.current_page,
              per_page: -1,
              ...params,
            },
            // responseType: (resource.is_file && !params.object_res) ? 'blob' : ''
            responseType: (resource.is_file && params.is_file) ? 'blob' : ''
          });

        } catch (err) {
          console.log(err);
        }

        if (resource.functions) {
          commit('setFunctions', resource.functions);
        }
        if (resource.formatted_numbers) {
          commit('setFormattedNumbers', resource.formatted_numbers);
        }


        if (resource.has_headers && !params.is_file) {

          commit('setData', [response.items, params.resObjName]);
          commit('setHeaders', response.headers);
          return response.items;
        }

        if (resource.is_file) {
          if (typeof response == 'object') {
            // commit('setData', response.data);
            return response.data ? response.data : response
          }
          return response;

        } else if (!resource.has_headers) {


          if (response.data.length > 0 && resource.headers) {
            commit('setHeaders', resource.headers);
          }
          commit('setMeta', response.meta);
          commit('setAllData', response.data);
          commit('setLinks', response.links);
        }



        commit('loadedData');
        return response.data;
      },
      async index({
        commit,
        state,
        dispatch
      }, params) {
        params = params == null ? {} : params
        if (resource.empty_data) {

          await dispatch('empty');
        }

        let path = resource.parent;
        if (!path) {
          path = resource.child
        } else {
          path = path + '/' + params[resource.parent + '_id'] + '/' + resource.child;
        }
        let response;

        try {
          response = await this.$axios.$get(`/${path}`, {
            params: {
              page: state.meta?.current_page,
              ...params,
            },
            responseType: (resource.is_file && params.is_file) ? 'blob' : ''
          });
        } catch (err) {
          console.log(err);
        }
        if (resource.return_response) {
          return response
        }
        if (resource.functions) {
          commit('setFunctions', resource.functions);
        }
        if (resource.formatted_numbers) {
          commit('setFormattedNumbers', resource.formatted_numbers);
        }
        if (resource.has_headers && !params.is_file) {
          if (params.set_data) {
            commit('setMeta', response.meta);
            commit('setData', [response.data, params.resObjName]);
            commit('setLinks', response.links);
          } else {
            commit('setData', [response.items, state.params.resObjName]);
            commit('setHeaders', response.headers);
          }
          return response.items;
        }


        if (resource.is_file) {

          if (typeof response == 'object') {
            // commit('setData', response.data);
            return response.data ? response.data : response
          }
          return response;
        } else if (!resource.has_headers) {
          if (response.data.length > 0 && resource.headers) {
            commit('setHeaders', resource.headers);
          }
          commit('setMeta', response.meta);
          commit('setData', [response.data, params.resObjName]);
          commit('setLinks', response.links);
        }





        commit('loadedData');
        return response.data;
      },
      async push({
        commit
      }, id) {
        let path = resource.child;
        // if (!path || path == '') {
        //   path = resource.child
        // } else {
        //   path = path + '/' + one[resource.parent + '_id'] + '/' + resource.child;
        // }
        path += `/${id}`;
        const response = await this.$axios.$get(`/${path}`);
        commit('pushToAllData', response.data);

      },
      async pushToAll({
        commit
      }, id) {
        let path = resource.child;
        // if (!path || path == '') {
        //   path = resource.child
        // } else {
        //   path = path + '/' + one[resource.parent + '_id'] + '/' + resource.child;
        // }
        path += `/${id}`;
        const response = await this.$axios.$get(`/${path}`);
        commit('pushToAll', response.data);

      },
      async show({
        commit
      }, one) {
        let path = resource.parent;
        if (!path || path == '') {
          path = resource.child
        } else {
          path = path + '/' + one[resource.parent + '_id'] + '/' + resource.child;
        }
        path += `/${one}`;
        delete one[resource.child + '_id'];

        const response = await this.$axios.$get(`/${path}`);
        commit('setOne', response.data);
        return response.data;
      },
      async update({
        commit,
        dispatch,
        state
      }, data) {

        try {
          let path = resource.parent;
          if (!path) {
            path = resource.child
          } else {
            path = path + '/' + data[resource.parent + '_id'] + '/' + resource.child;
          }
          path += '/' + data.id

          if (resource.has_files) {
            let form_data = new FormData();
            Object.keys(data).map(key => {
              form_data.append(key, data[key])
            });
            data = form_data;
            // post_data = data;
          }
          dispatch('setPostLoading', true, {
            root: true
          });
          const response = await this.$axios.$put(`/${path}`, data);
          dispatch('setPostLoading', false, {
            root: true
          });
          // commit('setOne', response.data);

          if (!resource.silent) {
            if (!data.silent) {
              dispatch('setSuccessMsg', 'updated_successfully', {
                root: true
              });
            }
          }

          if (resource.load_after_store)
            dispatch('index', state.params);
          return response.data;
        } catch (ex) {
          if (ex.response) {
            let errors = (ex.response.data.errors);
            if (errors) {
              commit('setErrors', errors);
            }
          } else {
            console.log(ex);
          }
        }

      },
      async store({
        commit,
        dispatch,
        state
      }, data) {
        try {

          let post_data = {};
          let parent_id = data[resource.parent + '_id'];
          let params = {};
          if (resource.parent) {
            params[resource.parent + '_id'] = data[resource.parent + '_id'];
          }
          if (resource.has_files) {
            let form_data = new FormData();
            Object.keys(data).map(key => {
              form_data.append(key, data[key])
            });
            data = form_data;
            // post_data = data;
          }
          let url = (resource.parent ? `/${resource.parent}/${parent_id}/` : '') + resource.child;
          dispatch('setPostLoading', true, {
            root: true
          });
          const response = await this.$axios.$post(url, data);
          dispatch('setPostLoading', false, {
            root: true
          });
          if (!resource.is_html) {
            if (!resource.silent) {

              dispatch('setSuccessMsg', 'added_successfully', {
                root: true
              });
            }


            if (resource.load_after_store && !data.no_reload) {
              dispatch('index', params);
            }

            if (resource.reload_user)
              this.$auth.fetchUser();
            // commit('setOne', response.data);
            return response.data;
          } else {
            commit('setHtml', response);
            return response;
          }
        } catch (ex) {
          console.log(ex);
          if (ex.response) {
            let errors = (ex.response.data.errors);
            if (errors) {
              commit('setErrors', errors);
            }
          } else {
            console.log(ex);
          }
        }
      },
      async delete({
        commit,
        dispatch,
        state
      }, ItemAndParams) {
        const data = ItemAndParams.item;
        // dispatch("setDeleteRequest", {
        // rq: async () => {
        let url = (resource.parent ? `/${resource.parent}/${data[resource.parent + '_id']}/` : '') + resource.child + '/' + data.id;
        const response = await this.$axios.$delete(url);
        if (!resource.silent) {
          dispatch('setSuccessMsg', 'deleted_successfully', {
            root: true
          });
        }
        let params = {};
        if (resource.parent) {
          params[resource.parent + '_id'] = data[resource.parent + '_id'];
        }
        console.log(ItemAndParams);
        console.log("ItemAndParams");
        dispatch('index', ItemAndParams.params);
        commit('setOne', response.data);
        //     },
        //     resource,
        //     confirmed:false
        // })
      },
      changeCurrentPage({
        commit
      }, current_page) {
        commit('setCurrentPage', current_page);
      },
      flipPage({
        commit,
        dispatch
      }) {
        commit('goNext');
        dispatch('push', data);
      },
      empty({
        commit
      }) {
        commit('empty');
      },
      clearErrors({
        commit
      }) {
        commit('clearErrors');
      },
      clearHtml({
        commit
      }) {
        commit('clearHtml');
      },
      setParams({
        commit
      }, params) {
        console.log(params);
        commit('setParams', params);
      },

    };
    // commit('setData', [response.data, params.resObjName]);
    let mutations = {
      setAll: (state, all) => state.all = all,
      pushToAllData: (state, data) => state.all_records.unshift(data),
      pushToAll: (state, data) => state.all.unshift(data),
      setAllData: (state, data) => state.all_records = data,
      setData: (state, data) => {
        if (data[1]) {
          const key = data[1]
          const value = data[0]
          console.log("key");
          console.log(key);
          console.log(value);
          Object.assign(state, { [key]: structuredClone(value) });
          // state = { ...state, :  };
        }
        else {
          state.all = data[0]
        }
      },
      setOne: (state, one) => state.one = one,
      setMeta: (state, meta) => state.meta = meta,
      goNext: (state) => {
        if (state.meta.last_page == state.meta.current_page)
          state.meta.current_page = 1;
        else
          state.meta.current_page += 1
      },
      setLinks: (state, links) => state.links = links,
      setHeaders: (state, headers) => state.headers = headers,
      setHtml: (state, html) => state.html = html,
      setFunctions: (state, functions) => state.functions = functions,
      setFormattedNumbers: (state, formatted_numbers) => state.formatted_numbers = formatted_numbers,
      loadedData: (state) => state.loaded = true,
      empty: (state) => state.all = [],
      setErrors: (state, errors) => {
        state.errors = errors
      },
      clearErrors: (state) => {
        state.errors = {}
      },
      clearHtml: (state) => {
        state.html = null;
      },
      setParams: (state, params) => {

        state.params = params
      },

    }
    let module = {
      namespaced: true,
      state,
      getters,
      actions,
      mutations
    };
    context.store.registerModule(module_name, module);
    // modules[module_name] = module;
  });
}

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
      async index({
        commit,
        state,
        dispatch
      }, params) {

        // if (JSON.stringify(params) == JSON.stringify(state.meta)) {
        //   return state.all;
        // }
        if (resource.cachable)
          await del(module_name);

        let cache_data = await get(module_name);
        if (cache_data) {
          commit('setData', cache_data);
          return cache_data;
        }
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
              page: state.meta.current_page,
              ...params,
            },
            // responseType: (resource.is_file && !params.object_res) ? 'blob' : ''
            responseType: (resource.is_file && params.is_file) ? 'blob' : ''
          });
          // dispatch('setLoading', false, {
          //   root: true
          // });

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
          commit('setData', response.items);
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
          commit('setData', response.data);
          commit('setLinks', response.links);

        }


        // console.log("test 3")
        commit('loadedData');
        return response.data;
      },
      async push({
        commit
      }, params) {
        let path = resource.parent;
        if (!path) {
          path = resource.child
        } else {
          path = path + '/' + params[resource.parent + '_id'] + '/' + resource.child;
        }
        const response = await this.$axios.$get(path, {
          params: {
            page: state.meta.current_page,
            ...params
          }
        });
        commit('setMeta', response.data.meta);
        commit('pushData', response.data.data);
        commit('setLinks', response.data.links);
        commit('loadedData');
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
        console.log(path);
        const response = await this.$axios.$get(`/${path}`);
        commit('setOne', response.data);
        return response.data;
      },
      async update({
        commit,
        dispatch,
        state
      }, data) {
        console.log(data);
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
        dispatch
      }, data) {
        try {
          // console.log(data);
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

            if (resource.load_after_store)
              dispatch('index', params);
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
      }, data) {
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
        dispatch('index', state.params);
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
    let mutations = {
      setAll: (state, all) => state.all = all,
      pushData: (state, data) => state.all = state.all.concat(data),
      setData: (state, data) => state.all = data,
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
      setParams: (state, params) => state.params = params,

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

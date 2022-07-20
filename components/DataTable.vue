<template>
  <div>
    <v-data-table
      :options.sync="options"
      :page.sync="options.page"
      item-key="id"
      :items-per-page="meta.per_page ? Number(meta.per_page) : -1"
      class="elevation-1"
      :sort-by.sync="options.sortBy"
      :sort-desc.sync="options.sortDesc"
      :headers="$translateHeaders(headers.concat(['actions']))"
      :items="all"
      multi-sort
      @contextmenu:row="$context_menu"
      v-bind="$attrs"
      v-on="$listeners"
      :loading="loading"
      @update:sort-by="updateSortBy($event)"
      @update:sort-desc="updateSortDesc($event)"
    >
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope"/>
      </template>
      <template v-for="func in functions" v-slot:[getKey(func.key)]="scope">
        {{
          typeof func.f == "function"
            ? func.f(scope.item[func.key])
            : scope.item[func.key]
        }}
      </template>

      <template v-for="key in formatted_numbers" v-slot:[getKey(key)]="scope">
        {{ $inputNumberFormat(scope.item[key]) }}
      </template>
      <template v-slot:top>
        <v-row>
          <v-col class="text-left">
            <span>
              <v-btn icon>
                <v-icon
                  class="justify-content"
                  color="primary"
                  @click="$fetch()"
                  small
                  >fas fa-redo-alt</v-icon
                >
              </v-btn>
            </span>
            <!-- <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" v-on="on" icon>
                  <v-icon> fas fa-cloud-download-alt </v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item @click="download('xlsx')">
                  <v-list-item-title>
                    {{ $t("excel") }}
                  </v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>fas fa-file-excel</v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <v-list-item @click="download('pdf')">
                  <v-list-item-title>
                    {{ $t("pdf") }}
                  </v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>fas fa-file-pdf</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-menu> -->
          </v-col>
        </v-row>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="
                context_menu($event, item);
                setModule();
              "
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              icon
            >
              <v-icon small>fas fa-ellipsis-h</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              link
              dense
              v-for="(item, index) in menu_items.filter((i) => i.types?i.types[c_type]:true)"
              :key="index"
              @click="setAction(item.title)"
            >
              <v-list-item-icon>
                <v-icon small>
                  {{ item.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t(item.title) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <v-pagination
      :hidden="hide_pagination"
      v-model="options.page"
      :length="meta.last_page"
      circle
      color="primary"
    ></v-pagination>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { saveAs } from "file-saver";
import menus from "../helpers/menus";

export default {
  props: {
    module: {
      type: String,
      default: null,
    },
    params: {
      type: [Object, Array],
      default: {},
    },
    hide_pagination: Boolean,
    hidden_headers: Array,
  },
  data() {
    return {
      // loading: false,
      options: {
        sortBy: [],
        sortDesc: [],
        itemKey: "item.",
      },
      // loaded: false,
      sortingData: { sortBy: [], sortDesc: [] },
      menu_name: null,
      item: null,
    };
  },
  mounted() {
    let sorting = localStorage.getItem(`${this.$route.path}/sorting`);
    let sotingObj = sorting != null ? JSON.parse(sorting) : null;
    if (sotingObj) {
      this.options.sortBy = sotingObj.sortBy;
      this.options.sortDesc = sotingObj.sortDesc;
    }
  },
  fetch() {
    if (this.module) {
      this.$store.dispatch(`${this.module}/index`, {
        ...this.options,
        ...this.params,
      });
      let val = this.meta;
      if (val) {
        this.options.page = val.current_page;
      }
      // this.loaded = true;
    }
  },
  computed: {
    ...mapState({
      all: function (state) {
        if (this.module) {
          return state[this.module].all;
        }
        return [];
      },
      meta: function (state) {
        if (this.module) {
          return state[this.module].meta;
        }
      },
      headers: function (state) {
        if (this.module) {
          return state[this.module].headers.filter(
            (i) => !(this.hidden_headers || []).some((h) => h == i)
          );
        }
      },
      functions: function (state) {
        if (this.module) {
          return state[this.module].functions;
        }
      },
      formatted_numbers: function (state) {
        if (this.module) {
          return state[this.module].formatted_numbers || [];
        }
      },
      user: (state) => state.auth.user,
      loading: (state) => state.loading,
      loaded: (state) => state.loaded,
    }),
    c_type() {
      let types = ["admin", "customer"];
      return types[this.user.type - 1];
    },
    showMenu: {
      get: function () {
        return this.context.showMenu;
      },
      set: function () {
        return "";
      },
    },
    menu_items() {
      return menus[this.menu_name]?.menu_btns || [];
    },
  },
  watch: {
    options: {
      handler(val) {
        // this.loading = true;
        if (this.loaded) {
          this.$store
            .dispatch(`${this.module}/index`, {
              ...val,
              ...this.params,
            });
        }
      },
      deep: true,
    },
    params: {
      handler(val) {
        if (this.loaded) {
          this.$store.dispatch(`${this.module}/index`, {
            ...val,
            ...this.options,
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    updateSortBy(event) {
      this.sortingData.sortBy = event;
      let jsonObj = JSON.stringify(this.sortingData);
      localStorage.setItem(`${this.$route.path}/sorting`, jsonObj);
    },
    updateSortDesc(event) {
      this.sortingData.sortDesc = event;
      let jsonObj = JSON.stringify(this.sortingData);
      localStorage.setItem(`${this.$route.path}/sorting`, jsonObj);
    },
    getKey(v) {
      return "item." + v;
    },
    download(ext) {
      let obj = null;
      let file_name = `${this.module}_${new Date(Date.now())
        .toLocaleString("en-GB")
        .replaceAll("/", "-")}.${ext}`;
      if (ext) {
        obj = {
          ext,
          document_type: this.$get_type_id(this.module),
          file_name,
          ...this.params,
        };
      }
      if (ext)
        this.$store.dispatch("export_data/index", obj).then((data) => {
          if (data) {
            let blob = new Blob([data], {
              type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`,
            });
            saveAs(blob, file_name);
          }
        });
    },
    context_menu(e, item) {
      this.menu_name = this.module;
      this.item = item;
      this.$context_menu(e, item, true);
    },
    setAction(title) {
      this.$store.dispatch("setMenuActionDetails", {
        title: this.module,
        action: title,
      });
    },
    setModule() {
      this.$store.dispatch("setModule", this.module);
    },
  },
};
</script>
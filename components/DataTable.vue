 
<template>
  <div>
    <v-data-table
      class="elevation-0"
      :class="no_class ? '' : 'my-table'"
      :options.sync="options"
      :page.sync="options.page"
      item-key="id"
      hide-default-footer
      :items-per-page="meta.per_page ? Number(meta.per_page) : 15"
      :sort-by.sync="options.sortBy"
      :sort-desc.sync="options.sortDesc"
      :headers="$translateHeaders(headers.concat(['actions']))"
      :items="all"
      multi-sort
      @contextmenu:row="$context_menu"
      v-bind="$attrs"
      v-on="$listeners"
      @update:sort-by="updateSortBy($event)"
      @update:sort-desc="updateSortDesc($event)"
    >
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope"
      /></template>
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
              v-for="(item, index) in menu_items.filter((i) =>
                i.types ? i.types[c_type] : true
              )"
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
      class="mt-5"
      :hidden="hide_pagination"
      v-model="options.page"
      :length="meta.last_page"
      style="width: fit-content; margin: auto; background-color: #f5f5f5"
      :next-icon="$t('nextt')"
      :prev-icon="$t('prevv')"
      color="transparent"
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
    no_class: {
      type: Boolean,
      defualt: false,
    },
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
      item: {},
    };
  },
  mounted() {
    if (!this.all[0]) {
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
  created() {
    if (this.module && this.options.itemsPerPage > -2) {
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
          return state[this.module]?.meta || [];
        }
      },
      headers: function (state) {
        if (this.module) {
          return state[this.module]?.headers || [];
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
        if (this.loaded && this.options.itemsPerPage > -2) {
          this.$store.dispatch(`${this.module}/index`, {
            ...val,
            ...this.params,
          });
        }
      },
      deep: true,
      // immediate: true,
    },
    params: {
      handler(val) {
        if (this.loaded && Object.keys(this.params).length > 0) {
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
 <style >
/* .my-table th {
  padding: 20px 0px !important;
  font-weight: normal;
  color: #000 !important;
  font-size: 14px !important;
  text-align: center !important;
}

.my-table th::after {
  content: " | ";
  display: inline-block;
  padding: 0px 20px;
  color: rgba(67, 46, 140, 0.5);
}

.my-table th:last-child::after {
  content: "";
}
.my-table tr {
  border-radius: 20px !important;
}
.my-table thead th {
  border-bottom: 16px solid #eeeeee !important;
}
.my-table tbody td {
  border-bottom: 16px solid #eeeeee !important;
}
.my-table thead > tr > th,
.my-table tbody > td {
  padding: 20px 0px !important;
  text-align: center !important;
}


.my-table tbody,
.my-table td {
  padding: 20px 0px !important;
  text-align: center !important;
  font-weight: normal;
  color: #000 !important;
  font-size: 13px !important;
} */
.my-table tbody > tr:hover {
  background-color: rgb(247, 247, 247) !important;
}
.v-pagination__item {
  box-shadow: none !important;
  font-size: 1.075rem !important;
}
.v-pagination__item:hover {
  color: #ff7171 !important ;
}
.v-pagination__navigation {
  box-shadow: none !important;
  padding: 0px 30px;
  font-size: 12px !important;
}
.v-pagination__navigation > * {
  font-size: 15px !important;
  font-weight: 700 !important;
}

.v-pagination__item--active {
  color: #ff7171 !important ;
}
</style>


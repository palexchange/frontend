
<template>
  <div>
    <v-data-table
      class="elevation-0"
      :class="no_class ? '' : 'my-table'"
      :options.sync="options"
      :page.sync="options.page"
      item-key="id"
      hide-default-footer
      :items-per-page="per_page_num"
      :sort-by.sync="options.sortBy"
      :sort-desc.sync="options.sortDesc"
      @dblclick:row="click_function"
      :item-class="row_classes"
      :headers="
        noActions
          ? $translateHeaders(headers)
          : $translateHeaders(headers.concat(['actions']))
      "
      :items="all"
      multi-sort
      @contextmenu:row="$context_menu"
      v-bind="$attrs"
      v-on="$listeners"
      @update:sort-by="updateSortBy($event)"
      @update:sort-desc="updateSortDesc($event)"
    >
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
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
        <v-row
          v-if="
            $route.name == 'dashboard-transfers' ||
            $route.name == 'dashboard-moneygram'
          "
          class="px-5"
        >
          <v-col cols="3">
            <v-btn @click="shoowDownloadName = true" v-if="!shoowDownloadName">
              تصدير
            </v-btn>
            <v-text-field
              v-if="shoowDownloadName"
              @keydown.enter="download()"
              @keydown.esc="shoowDownloadName = false"
              dense
              :loading="DownloadLoad"
              outlined
              v-model="download_name"
              :label="$t('export name')"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item.num="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.status="{ item }">
        <div style="display: flex; justify-content: start">
          <div
            style="width: fit-content"
            class="px-2"
            v-if="typeof item.status == 'number'"
            :class="all_status[item.status].class"
          >
            {{ all_status[item.status].label }}
          </div>
          <!-- <div v-else :class="static_status[item.status].class">
            {{ $t(item.status) }}
          </div> -->
        </div>
      </template>
      <template v-slot:item.currency_id="{ item }">
        <div style="display: flex; justify-content: start">
          <div
            style="width: fit-content"
            class="px-2"
            v-if="typeof item.currency_id == 'number'"
            :class="all_currencies_id[item.currency_id].class"
          >
            {{ all_currencies_id[item.currency_id].label }}
          </div>
          <!-- <div v-else :class="static_status[item.currency_id].class">
            {{ $t(item.currency_id) }}
          </div> -->
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="
                context_menu($event, item);
                setModule();
                setEditedMenu(item);
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
              v-for="(item, index) in edited_menu"
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
      <template v-slot:item.acc_balance="{ item }">
        <div
          :style="{
            color: item.acc_balance < 0 ? 'red' : 'green',
            fontWeight: 'bold',
            fontSize: '20px',
          }"
        >
          {{ (Math.abs(item.acc_balance) * 1).toFixed(3) }}
        </div>
      </template>
      <template v-slot:item.image="{ item }">
        <img width="60" :src="item.image ? item.image.url : ''" alt="" />
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
      @input="testPagination"
    ></v-pagination>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { saveAs } from "file-saver";
import menus from "../helpers/menus";
// import ThirdVue from "./charts/Third.vue";

export default {
  props: {
    module: {
      type: String,
      default: null,
    },
    params: {
      type: [Object, Array],
      default: () => {
        return {};
      },
    },
    noActions: {
      type: Boolean,
      default: false,
    },
    hide_pagination: Boolean,
    no_class: {
      type: Boolean,
      defualt: false,
    },
    nums: {
      type: String,
      defualt: null,
    },
    click_function: {
      type: Function,
      defualt: () => 1,
    },
    hidden_headers: Array,
  },
  data() {
    return {
      defualt_options: {
        groupBy: [],
        groupDesc: [],
        itemKey: "item.",
        itemsPerPage: 15,
        multiSort: true,
        mustSort: false,
        page: 1,
        sortBy: [],
        sortDesc: [],
      },
      edited_menu: [],
      download_name: this.module,
      shoowDownloadName: false,
      DownloadLoad: false,
      all_status: {
        255: { class: "danger", label: this.$t("cancelled") }, //255
        1: { class: "success", label: this.$t("active") }, //1
        2: { class: "worm", label: this.$t("draft") }, //2
      },
      all_currencies_id: {
        1: { class: "doller", label: this.$t("doller") }, //255
        2: { class: "shekel", label: this.$t("shekel") }, //1
        3: { class: "denar", label: this.$t("denar") }, //2
        4: { class: "euro", label: this.$t("euro") }, //2
        5: { class: "derham", label: this.$t("derham") }, //2
        6: { class: "reyal", label: this.$t("reyal") }, //2
        7: { class: "pond", label: this.$t("pond") }, //2
        255: { class: "", label: this.$t("day_profit") }, //2
        256: { class: "", label: this.$t("total_profit") }, //2
      },

      // loading: false,
      options: {
        sortBy: [],
        sortDesc: [],
        itemKey: "item.",
      },
      loaded: true,
      sortingData: { sortBy: [], sortDesc: [] },
      menu_name: null,
      item: {},
    };
  },
  mounted() {
    // if (!this.all[0]) {
    //   this.$store.dispatch(`${this.module}/index`, {
    //     ...this.options,
    //     ...this.params,
    //   });
    // }
    // let val = this.meta;
    // if (val) {
    //   this.options.page = val.current_page;
    // }
    // this.loaded = true;
    // }
  },
  created() {
    // if (this.module) {
    //   this.$store.dispatch(`${this.module}/index`, {
    //     ...this.options,
    //     ...this.params,
    //   });
    //   let val = this.meta;
    //   if (val) {
    //     this.options.page = val.current_page;
    //   }
    //   // this.loaded = true;
    // }
  },
  computed: {
    per_page_num() {
      return this.module == "report" ? -1 : 15;
    },
    ...mapState({
      all: function (state) {
        if (this.module) {
          if (this.params.resObjName) {
            let temp = state[this.module];
            return temp[this.params.resObjName] || [];
          }
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
          let h = state[this.module]?.headers || [];
          let w = JSON.parse(JSON.stringify(h));
          if (this.nums) w.unshift(this.nums);
          return w;
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
      // loaded: (state) => state.loaded,
    }),
    c_type() {
      let types = ["admin", "customer"];
      return types[this.user.type - 1];
    },
    // showMenu: {
    //   get: function () {
    //     return this.context.showMenu;
    //   },
    //   set: function () {
    //     return "";
    //   },
    // },
    menu_items() {
      return menus[this.menu_name]?.menu_btns || [];
    },
  },
  watch: {
    options: {
      handler(val, old_val) {
        const empty = !this.all[0];
        const old_values = Object.values(old_val);
        // const new_values = Object.values(val);
        // const same =
        //   old_values == new_values && old_values.length == new_values.length;

        if (old_values.length == 3 && empty == false) return;
        console.log("!!this.params");
        console.log("!!this.params");
        console.log(!!this.params);
        if (
          this.$deepEqual(val, this.defualt_options) &&
          !!Object.keys(this.params)[0]
        )
          return;

        // if (empty == true && same == true) return;
        console.log("options");
        console.log(val);
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
      handler(val, old_val) {
        if (val.no_fetch) return;
        if (Object.keys(val).length === 0) return;
        if (this.$deepEqual(val, old_val)) return;

        if (this.loaded && Object.keys(this.params).length > 0) {
          this.$store.dispatch(`${this.module}/index`, {
            ...val,
            ...this.options,
          });
        }
      },
      deep: true,
      // immediate: true,
    },
  },
  methods: {
    row_classes(item) {
      if (item.__name == "report__profit_total") {
        return "orange orange-background"; //can also return multiple classes e.g ["orange","disabled"]
      }
      if (item.__name === "report__daily_profit") {
        return "  grey-background"; //can also return multiple classes e.g ["orange","disabled"]
      }
    },
    testPagination(v) {
      if (v == 1) {
        this.defualt_options.allow = true;
      }
    },
    setEditedMenu(item) {
      this.edited_menu = this.$filterMenu(this.menu_items, this.module, item);
    },
    EmptyFun() {
      return this.click_function;
    },
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
    download() {
      this.DownloadLoad = true;
      this.$store
        .dispatch("export_data/index", {
          model: this.module,
          download: true,
          is_file: true,
          ...this.params,
        })
        .then((data) => {
          if (data) {
            if (data.type != "application/json") {
              let blob = new Blob([data], {
                type: data.type,
              });
              saveAs(blob, this.download_name);
            }
          }
          this.DownloadLoad = false;
          this.download_name = "";
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
/* .my-table tbody > tr:hover {
  background-color: rgb(247, 247, 247) !important;
} */
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
.danger {
  border-radius: 4px;
  background-color: tomato;
  color: white;
}
.worm {
  border-radius: 4px;
  background-color: rgb(189, 191, 179);
  color: white;
}
.success {
  border-radius: 4px;
  background-color: rgb(71, 255, 111);
  color: white;
}
.doller {
  border-radius: 4px;
  background-color: rgb(0 176 159);

  color: white;
}
.shekel {
  border-radius: 4px;
  background-color: rgb(71, 99, 255);

  color: white;
}
.denar {
  border-radius: 4px;
  background-color: rgb(245, 179, 77);
  color: white;
}
.euro {
  border-radius: 4px;
  background-color: rgb(237, 71, 255);
  color: white;
}
.derham {
  border-radius: 4px;
  background-color: rgb(211, 214, 211);
  color: white;
}
.reyal {
  border-radius: 4px;
  background-color: rgb(0, 201, 44);
  color: white;
}
.pond {
  border-radius: 4px;
  background-color: rgb(255, 105, 105);
  color: white;
}
.my-table td {
  font-weight: 700;
}
.grey-background{
   background-color: rgb(211, 214, 211) !important;
}
</style>


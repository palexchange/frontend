<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="2">
          <v-icon> fas fa-utensils </v-icon>
          <span :class="`m${$vuetify.rtl ? 'r' : 'l'}-5`">
            {{ $t("menu") }}
          </span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4">
          <v-text-field
            rounded
            filled
            :placeholder="$t('search')"
            prepend-inner-icon="fas fa-search"
            v-model="searchVal"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="10"></v-col>
          <v-col cols="2">
            <v-btn @click="order = !order" color="primary">
              <span class="mr-5 ml-5">
                <v-icon>
                  fas
                  {{ !order ? "fa-file-invoice" : "fa-utensils" }}
                </v-icon>
              </span>
              <span>
                {{ !order ? $t("order") : $t("summary") }}
              </span>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" v-if="!order">
            <v-card>
              <v-card-title> {{ $t("summary") }} </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row
                  v-if="bill_items.length == 0"
                  class="bill-item-empty-row"
                >
                  <v-col cols="12"> {{ $t("add_items_from_menu") }} </v-col>
                </v-row>

                <v-simple-table v-if="bill_items.length > 0">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">#</th>
                        <th class="text-left"></th>
                        <th class="text-center">{{ $t("item_name") }}</th>
                        <th class="text-center">{{ $t("item_quantity") }}</th>
                        <th class="text-center">{{ $t("item_description") }}</th>
                        <th class="text-left"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in bill_items" :key="item.id">
                        <td>{{ i + 1 }}</td>
                        <td>
                          <v-img
                            :src="item.img"
                            height="50px"
                            width="50px"
                          ></v-img>
                        </td>
                        <td class="text-center">
                          {{ item.name }}
                        </td>
                        <td class="text-center">
                          {{ item.quantity }}
                        </td>
                        <td>
                          <v-text-field
                            solo
                            flat
                            v-model="item.description"
                            :label="$t('description')"
                          ></v-text-field>
                        </td>
                        <td>
                          <v-btn
                            icon
                            fab
                            dark
                            small
                            rounded
                            color="red"
                            @click="bill_items.splice(i, 1)"
                          >
                            <v-icon> fas fa-times </v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-divider></v-divider>
                <v-row class="total-row summary" v-if="bill_items.length > 0">
                  <v-col cols="12"
                    >{{ $t("count") }}:
                    {{
                      bill_items.reduce((c, n) => c + n.quantity, 0).toFixed(2)
                    }}</v-col
                  >
                </v-row>
                <v-row v-if="bill_items.length > 0">
                  <v-col cols="12">
                    <v-btn
                      block
                      color="primary"
                      @click="confirm(bill_items)"
                      :loading="$store.state.post_loading"
                    >
                      <v-icon> fas fa-check </v-icon>
                      {{ $t("confirm_order") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" v-if="order">
            <v-row>
              <v-col cols="12">
                <v-card elevation="1">
                  <v-card-title>
                    <v-icon> fas fa-hamburger </v-icon>
                    <span :class="`m${$vuetify.rtl ? 'r' : 'l'}-3`">
                      {{ $t("menu_items") }} : {{ count }}
                    </span>
                    <v-btn
                      v-for="category in categories"
                      text
                      :color="
                        active_category == category.id ? 'green' : 'primary'
                      "
                      @click="updateByCategory(category.id)"
                    >
                      <v-badge
                        :content="
                          menu.filter(
                            (i) => i.item.category_id == category.id
                          ).length
                        "
                      >
                        {{ category.name }}
                      </v-badge>
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                v-for="item in  active_menu"
                :key="item.id"
                cols="12"
                md="3"
              >
                <v-card rounded>
                  <v-img
                    :src="item.item.image_url"
                    height="250px"
                    class="item-img"
                  >
                    <div
                      class="
                        text-h5
                        white--text
                        pl-4
                        pr-4
                        pt-4
                        d-inline-block
                        item-overlay
                      "
                    ></div>
                    <div
                      class="
                        text-h5
                        white--text
                        pl-4
                        pt-4
                        pr-4
                        d-inline-block
                        item-data
                      "
                    >
                      {{ item.item.name }}
                      <br />
                    </div>
                  </v-img>

                  <v-card-actions class="justify-center">
                    <v-btn
                      icon
                      @click="updateOrCreateBillItem(item)"
                      color="green"
                    >
                      <v-icon small> fas fa-plus-circle </v-icon>
                    </v-btn>
                    <v-text-field
                      class="item-counter"
                      type="number"
                      rounded
                      filled
                      dense
                      v-model.number="item.quantity"
                      @blur="(v) => updateBillItemByValue(item, v.target.value)"
                    ></v-text-field>
                    <v-btn
                      icon
                      @click="updateOrCreateBillItem(item, false)"
                      color="red"
                    >
                      <v-icon small> fas fa-minus-circle </v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MenuPage",
  data() {
    return {
      menu: [],
      bill_items: [],
      searchVal: null,
      count: 0,
      order: true,
      active_category: null,
      active_menu: [],
    };
  },
  async mounted() {
    await this.$store.dispatch("daily_meal/index", {
      per_page: -1,
      today: true,
    });
    await this.$store.dispatch("category/index", {
      per_page: -1,
      today: true,
    });
    this.getItems(null);
  },
  methods: {
    updateOrCreateBillItem(item, inc = true) {
      let ex_item = this.bill_items.find((i) => i.item_id == item.item_id);
      if (!ex_item && inc) {
        this.bill_items.push({
          quantity: 1,
          item_id: item.item_id,
          name: item.item.name,
          img: item.item.image_url,
          price: item.price,
          daily_meal_id: item.id,
        });
        item.quantity = 1;
      } else if (ex_item) {
        if (ex_item.quantity == 1 && !inc) {
          this.bill_items = this.bill_items.filter(
            (i) => i.item_id != ex_item.item_id
          );
          item.quantity = 0;
        } else {
          ex_item.quantity += inc ? 1 : -1;
          item.quantity += inc ? 1 : -1;
        }
      }
    },
    updateBillItemByValue(item, value) {
      value = parseInt(value);
      let ex_item_idx = this.bill_items.findIndex((i) => i.item_id == item.id);
      if (ex_item_idx > -1) {
        let ex_item = this.bill_items[ex_item_idx];
        if (value == 0) {
          this.bill_items = this.bill_items.filter(
            (i) => i.item_id != ex_item.item_id
          );
          item.quantity = 0;
        } else {
          ex_item.quantity = value;
        }
      } else {
        if (value)
          this.bill_items.push({
            quantity: value,
            item_id: item.item_id,
            name: item.item.name,
            img: item.item.image_url,
            price: item.price,
            daily_meal_id: item.id,
          });
      }
    },
    getItems(searchVal , category) {
      if (searchVal || category) {
        let list = this.menu.filter((i) => searchVal?i.name.includes(searchVal):true);
        if (category){
          list = list.filter((i) => i.item.category_id == category);
        }
        this.active_menu = list;
        this.count = list.length;
        return list;
      }
      this.active_menu = this.menu;
      console.log(this.active_menu);
      this.count = this.menu.length;
      return this.menu;
    },
    updateByCategory(category){
      this.getItems(this.searchVal,category);
      this.active_category=category;
    },
    async confirm(bill_items) {
      let order = await this.$save(
        {
          issued_at: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        "order"
      );
      let items = await this.$save(
        {
          order_id: order.id,
          data: bill_items,
        },
        "order.order_item"
      );
    },
  },
  computed: {
    ...mapState({
      items: (state) => state.daily_meal.all,
      categories: (state) => state.category.all,
    }),
  },
  watch: {
    items() {
      this.menu = JSON.parse(JSON.stringify(this.items)).map((i) => {
        i.quantity = 0;
        return i;
      });
    },

  },
};
</script>

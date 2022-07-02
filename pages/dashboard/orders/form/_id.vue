<template>
  <v-card>
    <v-card-title> {{ $t("order_form") }} </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="3">
            <DatePicker
              outlined
              dense
              item-text="date"
              item-value="id"
              :label="$t('date')"
              v-model="item.issued_at"
              v-if="user.type == 1"
            ></DatePicker>
          </v-col>
          <v-col cols="3">
            <AutoComplete
              module="user"
              v-model="item.user_id"
              :label="$t('user')"
              outlined
              v-if="user.type == 1"
            />
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              item-text="name"
              item-value="id"
              v-model="item.status"
              :label="$t('status')"
              :items="status_items"
              outlined
              dense
              v-if="user.type == 1"
            />
          </v-col>
          <!-- <v-col cols="3">
            <v-autocomplete
              item-text="name"
              item-value="id"
              v-model="item.price_category"
              :label="$t('price_category')"
              :items="price_categories"
              outlined
              dense
            />
          </v-col> -->
        </v-row>
        <!-- <v-row>
          <v-col cols="6">
            <v-textarea
              outlined
              rows="1"
              v-model="item.notes"
              dense
              :label="$t('notes')"
              auto-grow
            ></v-textarea>
          </v-col>
        </v-row> -->
        <v-row justify="center">
          <v-col cols="12">
            <v-card>
              <v-card-title>
                {{ $t("order_items") }}
              </v-card-title>
              <v-card-text>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th :class="`text-${$vuetify.rtl?'right':'left'} px-6`">#</th>
                        <th :class="`text-${$vuetify.rtl?'right':'left'} px-6` " style="width:30%;">{{ $t("item_name") }}</th>
                        <th :class="`text-${$vuetify.rtl?'right':'left'} px-6`">{{ $t("item_quantity") }}</th>
                        <th :class="`text-${$vuetify.rtl?'right':'left'} px-6`">
                          {{ $t("item_price") }}
                        </th>
                        <th :class="`text-${$vuetify.rtl?'right':'left'} px-6`">
                          {{ $t("item_discount") }}
                        </th>
                        <!-- <th :class="`text-${$vuetify.rtl?'right':'left'}`">{{ $t("tax") }}</th> -->
                        <th :class="`text-${$vuetify.rtl?'right':'left'} px-6`">{{ $t("item_total") }}</th>
                        <th :class="`text-${$vuetify.rtl?'right':'left'} px-6`"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in items" :key="item.id">
                        <td>{{ i + 1 }}</td>
                        <td :class="`text-${$vuetify.rtl?'right':'left'}`" style="width:30%;">
                          <AutoComplete
                            class="mt-5"
                            module="daily_meal"
                            :params="{ today: true }"
                            v-model="item.daily_meal_id"
                            solo
                            flat
                          />
                        </td>
                        <td :class="`text-${$vuetify.rtl?'right':'left'}`">
                          <NumberInput v-model="item.quantity" solo flat />
                        </td>
                        <td :class="`text-${$vuetify.rtl?'right':'left'}`">
                          <NumberInput
                            :disabled="user.type != 1"
                            v-model.number="item.item_price"
                            solo
                            flat
                          />
                        </td>
                        <td :class="`text-${$vuetify.rtl?'right':'left'}`">
                          <NumberInput
                            :disabled="user.type != 1"
                            v-model="item.item_discount"
                            solo
                            flat
                          />
                        </td>
                        <td :class="`text-${$vuetify.rtl?'right':'left'}`">
                          <NumberInput
                            :value="
                              item.item_price * item.quantity -
                              item.item_discount
                            "
                            solo
                            flat
                            disabled
                          />
                        </td>
                        <td>
                          <v-btn
                            icon
                            fab
                            dark
                            small
                            rounded
                            color="red"
                            @click="items.splice(i, 1)"
                          >
                            <v-icon> fas fa-times </v-icon>
                          </v-btn>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="8">
                          <v-btn
                            block
                            dark
                            icon
                            color="primary"
                            :title="$t('add_item')"
                            @click="items.push({ quantity: 1 })"
                          >
                            <v-icon> fas fa-plus-circle </v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card>
              <v-card-title class="text-h4">
                {{ $t("summary") }}
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="4" class="font-weight-bold text-h5 py-0">{{
                    $t("subtotal")
                  }}</v-col>
                  <v-col cols="4" class="font-weight-bold text-h5 py-0">{{
                    totals.total
                  }}</v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" class="font-weight-medium py-0 text-h6">{{
                    $t("total_discount")
                  }}</v-col>
                  <v-col cols="4" class="font-weight-medium py-0 text-h6">{{
                    totals.discount
                  }}</v-col>
                </v-row>
                <!-- <v-row>
                  <v-col cols="4" class="font-weight-medium py-0 text-h6">{{ $t("total_tax") }}</v-col>
                  <v-col cols="4" class="font-weight-medium py-0 text-h6">2.34</v-col>
                </v-row> -->
                <v-divider class="mt-5"></v-divider>
                <v-row>
                  <v-col cols="4" class="font-weight-bold text-h4">{{
                    $t("total_due")
                  }}</v-col>
                  <v-col cols="4" class="font-weight-bold text-h4">{{
                    totals.taxed_total
                  }}</v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-textarea
              outlined
              rows="6"
              v-model="item.notes"
              dense
              :label="$t('notes')"
              auto-grow
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-btn :loading="$store.state.post_loading" block color="primary" @click="save">
            {{ $t("save") }}
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      item: {},
      items: [],
      status_items: [
        {
          name: this.$t("draft"),
          id: 0,
        },
        {
          name: this.$t("confirmed"),
          id: 1,
        },
        {
          name: this.$t("finalized"),
          id: 2,
        },
        {
          name: this.$t("cancelled"),
          id: 3,
        },
      ],
      price_categories: [
        {
          name: this.$t("tax_inclusive"),
          id: 1,
        },
        {
          name: this.$t("tax_exclusive"),
          id: 2,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      order_items: (state) => state["order.order_item"].all,
      order: (state) => state.order.one,
      users: (state) => state.user.all,
      user: (state) => state.auth.user,
    }),
    totals() {
      let total = this.items.reduce(
        (c, n) => c + (n.item_price * n.quantity - n.item_discount),
        0
      );
      let discount = this.items.reduce((c, n) => c + n.item_discount, 0);
      let item = {};
      item.total = total;
      item.discount = discount;
      item.taxed_total = total - discount;
      return item;
    },
  },
  async mounted() {
    if (this.$route.params.id) {
      await this.$store.dispatch("order/show", this.$route.params.id);
    }
    await this.$store.dispatch("order.order_item/index", {
      order_id: this.$route.params.id,
      itemsPerPage: -1,
    });
    await this.$store.dispatch("user/index", { itemsPerPage: -1, type: 2 });
  },
  watch: {
    order_items(v) {
      this.items = JSON.parse(JSON.stringify(v));
    },
    order(v) {
      this.item = JSON.parse(JSON.stringify(v));
    },
  },
  methods: {
    async save() {
      await this.$save(this.item, "order");
      let items = await this.$store.dispatch("order.order_item/store", {
        order_id: this.item.id,
        data: this.items,
      });
    },
  },
};
</script>

<style>
</style>
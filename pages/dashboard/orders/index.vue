<template>
  <v-card>
    <v-card-title class="mb-10">
      <CrudHeader name="orders" :to="'/orders/form'" />
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <component :is="'filtersOrderFilter'" module_name="order" />
        </v-col>
      </v-row>
      <DataTable
        module="order"
        show-expand
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        @item-expanded="expandOrder"
      >
        <template v-slot:item.status="{ item }">
          <span
            class="font-weight-bold"
            :style="`color:${colors[item.status]}`"
          >
            {{ $t(status[item.status]) }}
          </span>
        </template>
        <template v-slot:expanded-item="{ headers }">
          <td :colspan="headers.length" class="py-0">
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">#</th>
                    <th class="text-left">{{ $t("item_name") }}</th>
                    <th class="text-left">{{ $t("item_quantity") }}</th>
                    <th class="text-left">{{ $t("item_price") }}</th>
                    <th class="text-left">{{ $t("item_discount") }}</th>
                    <!-- <th class="text-left">{{ $t("tax") }}</th> -->
                    <th class="text-left">{{ $t("item_total") }}</th>
                    <th class="text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(order_item, i) in selected_order_items"
                    :key="order_item.id"
                  >
                    <td>{{ i + 1 }}</td>
                    <td>
                      {{ order_item.item_name }}
                    </td>
                    <td>
                      <NumberInput
                        v-model="order_item.quantity"
                        solo
                        flat
                        disabled
                      />
                    </td>
                    <td>
                      <NumberInput
                        v-model="order_item.item_price"
                        solo
                        flat
                        disabled
                      />
                    </td>
                    <td>
                      <NumberInput
                        v-model="order_item.item_discount"
                        solo
                        flat
                        disabled
                      />
                    </td>
                    <!-- <td>
                        <NumberInput v-model="item.tax" solo flat />
                      </td> -->
                    <td>
                      <NumberInput
                        v-model="order_item.total"
                        solo
                        flat
                        disabled
                      />
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </td>
        </template>
      </DataTable>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      filter: false,
      params: {
        type: 2,
      },
      singleExpand: true,
      expanded: [],
      status: ["draft", "confirmed", "finalized", "cancelled"],
      colors: ["grey", "orange", "green", "red"],
    };
  },
  methods: {
    edit(item) {
      this.$router.push({
        name: "dashboard-orders-form-id",
        params: {
          id: item.id,
        },
      });
    },
    expandOrder(item) {
      if (item.value)
        this.$store.dispatch("order.order_item/index", {
          order_id: item.item.id,
          itemsPerPage: -1,
        });
    },
    confirm(item) {
      this.$save({ status: 1, id: item.id }, "order");
    },
    finalize(item) {
      this.$save({ status: 2, id: item.id }, "order");
    },
    cancel(item) {
      this.$save({ status: 3, id: item.id }, "order");
    },
    print(item) {
      window.open(item.print_url,'_blank');
    },
  },
  computed: {
    ...mapState({
      action: (state) => state.context.action,
      item: (state) => state.context.item,
      selected_order_items: (state) => state["order.order_item"].all,
    }),
  },
  watch: {
    action(val) {
      if (this[val]) {
        this[val](this.item);
      }
    },
  },
};
</script>

<style>
</style>
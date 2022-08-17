<template>
  <Card class="pa-5">
    <v-card-title class="justify-space-between">
      <Title title="exchange prices"> </Title>
      <div>
        <v-row>
          <v-col>
            <TimePicker hide_details disabled />
          </v-col>
          <v-col>
            <DatePicker hide_details disabled />
          </v-col>
        </v-row>
      </div>
    </v-card-title>

    <v-card-text>
      <!-- <v-row>
        <v-col class="text-center">
          <h2>أسعار الصرف</h2>
        </v-col>
      </v-row> -->

      <v-row>
        <v-col
          :key="currency.id"
          v-for="currency in currencies"
          cols="12"
          md="4"
          sm="12"
        >
          <v-row>
            <v-col
              class="text-center align-self-center"
              style="font-size: 25px"
              cols="3"
              >{{ $t(currency.name) }}</v-col
            >
            <v-col cols="3">
              <label for="">{{ $t("sale") }}</label>
              <v-text-field v-model.number="currency.values.sale" dense>
              </v-text-field
            ></v-col>
            <v-col cols="3">
              <label for="">{{ $t("buy") }}</label>
              <v-text-field
                v-model.number="currency.values.buy"
                dense
              ></v-text-field
            ></v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider class="py-5"></v-divider>
    <v-card-text>
      <v-simple-table class="my-test">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center fs-18">
                <div
                  style="
                    background-image: linear-gradient(
                      to top right,
                      papayawhip calc(50% - 1px),
                      black,
                      papayawhip calc(50% + 1px)
                    );
                  "
                ></div>
              </th>
              <th
                :key="index"
                v-for="(header, index) in headers"
                class="text-center fs-18"
              >
                {{ $t(header) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="from_index"
              v-for="(from, from_index) in headers"
              class="text-center main-row"
            >
              <td class="fs-18">{{ $t(from) }}</td>
              <td
                :class="from == to ? 'bg-disabled' : ''"
                :key="to_index"
                v-for="(to, to_index) in headers"
              >
                <v-row dense>
                  <v-col
                    >{{ $t("sale") }}
                    <br />
                    <span>
                      {{
                        $calcSalePrice(
                          currencies[from_index],
                          currencies[to_index]
                        )
                      }}
                    </span>
                  </v-col>
                  <v-col
                    >{{ $t("buy") }}
                    <br />
                    <span>
                      {{
                        $calcBuyPrice(
                          currencies[from_index],
                          currencies[to_index]
                        )
                      }}
                    </span>
                  </v-col>
                </v-row>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
    <v-card-actions>
      <v-btn> save </v-btn>
    </v-card-actions>
  </Card>
</template>
<script>
export default {
  data() {
    return {
      currencies: [
        { id: 1, name: "dollar", values: { sale: 1, buy: 1 } },
        { id: 2, name: "denar", values: { sale: 0.708, buy: 0.706 } },
        { id: 3, name: "shekel", values: { sale: 3.32, buy: 3.3 } },
        { id: 4, name: "euro", values: { sale: 1.03, buy: 1.01 } },
        { id: 5, name: "pound", values: { sale: 16, buy: 15 } },
      ],

      numebr: 0,
      headers: ["dollar", "denar", "shekel", "euro", "pound"],
      items: [
        {
          name: "dollar",
          calories: 159,
        },
        {
          name: "denar",
          calories: 237,
        },
        {
          name: "shekel",
          calories: 262,
        },
        {
          name: "euro",
          calories: 305,
        },
      ],
    };
  },
  mounted() {
    // setInterval(() => {
    //   this.numebr++;
    // }, 10);
  },
};
</script>

<style>
.bg-disabled {
  background-color: rgb(75, 75, 75);
  color: rgb(75, 75, 75);
  /* opacity: 0; */
}
.my-test table td,
.my-test table th {
  border: solid 1px gray;
}
</style>
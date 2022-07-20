<template>
  <Card class="pa-5">
    <v-card-title>
      <Title title="exchange prices"> </Title>
    </v-card-title>

    <v-card-text>
      <!-- <v-row>
        <v-col class="text-center">
          <h2>أسعار الصرف</h2>
        </v-col>
      </v-row> -->

      <v-row>
        <v-col v-for="currency in currencies" cols="12" md="4" sm="12">
          <v-row>
            <v-col class="text-center align-self-center" cols="3">{{
              $t(currency.from)
            }}</v-col>
            <v-col cols="3">
              <label for="">بيع</label>
              <v-text-field v-model="currency.sale" dense> </v-text-field
            ></v-col>
            <v-col cols="3">
              <label for="">شراء</label>
              <v-text-field v-model="currency.buy" dense></v-text-field
            ></v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider class="py-5"></v-divider>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th
                :key="index"
                v-for="(header, index) in headers"
                class="text-center"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in items" :key="item.name">
              <td class="text-center">{{ item.name }}</td>
              <td class="text-center">
                {{ headers[i + 1] }}
              </td>
              <td class="text-center">
                {{ headers[i + 1] }}
              </td>
              <td class="text-center">
                {{ headers[i + 1] }}
              </td>
              <td class="text-center">
                {{ headers[i + 1] }}
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
        { from: "dollar", to: "shekel" },
        { from: "denar", to: "shekel" },
        { from: "shekel", to: "shekel" },
        { from: "euro", to: "shekel" },
        { from: "euro", to: "shekel" },
        { from: "euro", to: "shekel" },
        { from: "euro", to: "shekel" },
      ],

      numebr: 0,
      headers: ["", "dollar", "denar", "shekel", "euro"],
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
    setInterval(() => {
      this.numebr++;
    }, 10);
  },
};
</script>

<style>
</style>
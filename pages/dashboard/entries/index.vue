<template>
  <v-row>
    <v-col>
      <BeneficiaryAutocomplete
        holder="beneficiary"
        text="beneficiary"
        required
        v-model="form.party_id"
      />
    </v-col>
    <v-col>
      <InputField
        v-model.number="form.amount"
        holder="converting to dollar amount"
        text="converting to dollar amount"
        required
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "test-killua",
  data() {
    return {
      item: {
        convertToUSD: null,
      },
      currencies: [
        { id: 1, name: "dollar", values: { sale: 1, buy: 1 } },
        { id: 2, name: "denar", values: { sale: 0.708, buy: 0.706 } },
        { id: 3, name: "shekel", values: { sale: 3.32, buy: 3.3 } },
        { id: 4, name: "euro", values: { sale: 1.03, buy: 1.01 } },
        { id: 5, name: "pound", values: { sale: 16, buy: 15 } },
      ],
    };
  },
  methods: {
    signCurrency(vName, type, currencey) {
      console.log(vName);
      console.log(type);
      console.log(currencey);
      this.item[vName] = 1;
      this.item[vName] = currencey.values[type];
    },
  },
  components: { AddBeneficiary },
};
</script>

<style>
</style>
<template>
  <div>
    <Card class="pb-3">
      <v-card-title>
        <Title title="statement" />
      </v-card-title>
      <v-card-text>
        <v-row class="mt-5 lg5-custome-row">
          <v-col cols="12" lg="4" xs="12" sm="6">
            <AutoComplete class="rounding" holder="beneficiary" />
          </v-col>
          <v-col cols="12" lg="4" xs="12" sm="6">
            <InputField holder="recived amount"> </InputField>
          </v-col>
          <v-col cols="12" lg="4" xs="12" sm="6">
            <AutoComplete holder="currency" />
          </v-col>
          <v-col cols="12" lg="4" xs="12" sm="6">
            <DatePicker v-model="item.date" holder="date" />
          </v-col>
          <v-col cols="12" lg="4" xs="12" sm="6">
            <TimePicker> </TimePicker>
          </v-col>
          <v-col cols="12" lg="4" xs="12" sm="6">
            <InputField holder="conversion factor"></InputField>
          </v-col>
        </v-row>

      
        <v-row justify="center">
          <v-col cols="2">
            <v-btn height="40" color="primary" block>
              {{ $t("approve") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
  </div>
</template>

<script>
import Card from "~/transfers/components/Card.vue";
import Title from "~/transfers/components/Title.vue";
export default {
  components: { Card, Title },
  data() {
    return {
      item: {},
    };
  },
};
</script>
  
<style>
.rounding {
  border-radius: 4px !important;
}

@media (max-width: 600px) {
  .responseveCols > div {
    min-width: 100%;
  }
}
@media (max-width: 1280px) {
  .responseveCols > div {
    min-width: 50%;
  }
}

@media (min-width: 1264px) {
  .lg5-custome-row > div {
    width: 20% !important;
    max-width: 20% !important;
    flex-basis: 20% !important;
  }
}
</style>
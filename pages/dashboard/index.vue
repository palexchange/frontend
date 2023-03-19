<template>
  <div>
    <h1>{{ $t("dashboard") }}</h1>
    <div class="pt-5">
      <Boxes />
    </div>

    <div class="py-5">
      <span class="onoffswitch4-active">
        <marquee direction="right" class="scroll-text">
          <v-row dense>
            <v-col v-for="(currency, i) in currencies" :key="i">
              <span>
                {{ currency.name }}
              </span>
              <span class="px-2">
                <!-- {{ $t("buy") }} -->
                <!-- <br /> -->
                {{ $newCalcBuyPrice({ id: 1 }, currency) }}
              </span>

              <span class="px-2">
                <!-- {{ $t("sale") }} -->
                <!-- <br />-->
                {{ $newCalcSalePrice({ id: 1 }, currency) }}
              </span>
            </v-col>
          </v-row>
        </marquee>
      </span>
    </div>
    <v-row>
      <v-col>
        <Card>
          <v-card-title>
            <Title title="اسعار الصرف لهذا الشهر"> </Title>
          </v-card-title>
          <ChartsFirst />
        </Card>
      </v-col>
      <v-col>
        <Card>
          <v-card-title>
            <Title title="test2"> </Title>
          </v-card-title>
          <ChartsSecond
        /></Card>
      </v-col>
    </v-row>
    <!-- <Card>
      <v-card-title>
        <Title title="test1"> </Title>
      </v-card-title>
      <ChartsThird
    /></Card> -->
    <!-- <v-row>
      <v-col cols="4">
        <Card>
          <v-card-title>
            <Title title="test2"> </Title>
          </v-card-title>
          <ChartsTenth
        /></Card>
      </v-col>
      <v-col cols="8">
        <Card>
          <v-card-title>
            <Title title="test3"> </Title>
          </v-card-title>
          <ChartsSeventh
        /></Card>
      </v-col>
    </v-row> -->
    <Card>
      <v-card-title>
        <Title title="test4"> </Title>
      </v-card-title>
      <ChartsSixth
    /></Card>

    <!-- <Card><ChartsNinth /></Card> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      currencies: (state) => state.currency.all,
    }),
  },
};
</script>

<style>
.scroll-text {
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: bold;
  background-color: #7e6bb0;
  height: 59px;
  line-height: 59px;
}
</style>
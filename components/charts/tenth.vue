<template>
  <client-only>
    <div id="chart">
      <apexchart
        type="donut"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      chart: {
        type: "donut",
      },
      series: [44, 55, 13, 33],

      chartOptions: {
        title: {
          text: this.$t("Orders Statistics"),
          align: "center",
        },
        labels: ["Apple", "Mango", "Orange", "Watermelon"],
        plotOptions: {
          pie: {
            offsetY: 0,
            offsetX: 50,
            size: 800,
            customScale: 1,
            donut: {
              labels: {
                show: true,
              },
            },
          },
        },
        dataLabels: {
          enabled: true,
        },
      },
    };
  },
};
</script>

<style scoped>
/* @media only screen and (max-width: 600px) {
  
  #chart {
    margin-left: 60px !important;
  }
}
@media only screen and (max-width: 400px) {
  
  #chart {
    margin-left: 15px !important;
  }
}

#chart {
  margin-left: 15px;
} */
</style>
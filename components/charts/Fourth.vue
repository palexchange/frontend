<template>
  <client-only>
    <div id="chart">
      <apexchart
        type="bar"
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
      series: [
        {
          data: [
            {
              x: "Category A",
              y: 6653,
            },
            {
              x: "Category B",
              y: 8133,
              fillColor: "#EB8C87",
              strokeColor: "#C23829",
            },
            {
              x: "Category C",
              y: 7132,
            },
          ],
        },
      ],
      x: "Category A",
      y: 54,
      goals: [
        {
          name: "Expected",
          value: 52,
          strokeColor: "#775DD0",
        },
      ],
      chartOptions: {
        chart: {
          stacked: true,
          stackType: "100%",
          height: 350,
          type: "bar",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#644DA0", "#FF7171"],

        stroke: {
          curve: "smooth",
        },
        title: {
          text: this.$t("Orders Statistics"),
          align: "center",
        },

        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          title: {
            text: "Month",
          },
        },
        yaxis: {
          //   title: {
          //     text: "Temperature",
          //   },
          min: 10,
          max: 1000,
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
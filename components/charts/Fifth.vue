<template>
  <client-only>
    <div id="chart">
      <apexchart
        type="boxPlot"
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
              x: "category 1",
              y: [40, 51.98, 56.29, 59.59, 63.85],
            },
            {
              x: "category 2",
              y: [43.66, 44.99, 51.35, 52.95, 59.42],
            },

            {
              x: "category n",
              y: [52.76, 57.35, 59.15, 63.03, 67.98],
            },
          ],
        },
      ],
      chartOptions: {
        bar: {
          horizontal: true,
        },
        boxPlot: {
          colors: {
            upper: "#5C4742",
            lower: "#A5978B",
          },
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
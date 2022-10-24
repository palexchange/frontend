<template>
  <client-only>
    <div id="chart">
      <apexchart
        type="line"
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
          name: "High - 2013",
          data: [100, 600, 300, 100, 600, 100, 600],
        },
        {
          name: "Low - 2013",
          data: [600, 100, 600, 600, 100, 600, 100],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
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

        // stroke: {
        //   curve: "smooth",
        // },
        title: {
          text: this.$t("Statistics"),
          align: "center",
        },
        // grid: {
        //   borderColor: "#e7e7e7",
        //   row: {
        //     colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        //     opacity: 0.5,
        //   },
        // },

        // xaxis: {
        //   categories: ["aaaJan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        //   title: {
        //     text: "Month",
        //   },
        // },
        yaxis: {
          //   title: {
          //     text: "Temperature",
          //   },
          // min: 10,
          // max: 1000,
        },
        // legend: {
        //   position: "top",
        //   horizontalAlign: "right",
        //   floating: true,
        //   offsetY: -25,
        //   offsetX: -5,
        // },
      },
    };
  },
  created() {
    this.$store.dispatch("stock/index");
    // this.$store.dispatch("report/index", {
    //   type: "statistics",
    //   sub_type: "test",
    // });
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
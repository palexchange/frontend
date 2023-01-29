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
import { mapState } from "vuex";
export default {
  data() {
    return {
      report_data: {
        type: "statistics",
        resObjName: "second",
        set_data: true,
        sub_type: "countTransfers",
      },
      series: [
        {
          name: "`   حولات   ",
          data: [100, 900],
        },
        {
          name: "`   صرافة   ",
          data: [900, 100],
        },
      ],
      chartOptions: {
        chart: {
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
          text: this.$t("transfers and exchange transactions"),
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
    // this.$store.dispatch("report/index", { ...this.report_data });
  },
  computed: {
    ...mapState({
      all: (state) => state.report.second,
    }),
  },
};
</script>

<style scoped>
.apexcharts-title-text {
  font-family: Tajawal !important;
}
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
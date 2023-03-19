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
        sub_type: "exchangeRransfersCount",
      },

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
          text: this.$t("transfers and exchange transactions today"),
          align: "center",
        },

        // xaxis: {
        //   categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        //   title: {
        //     text: "Month",
        //   },
        // },
        yaxis: {
          //   title: {
          //     text: "Temperature",
          //   },
          min: 0,
          max: 10,
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
    this.$store.dispatch("report/index", { ...this.report_data });
  },
  computed: {
    ...mapState({
      all: (state) => state.report.second || [],
    }),
    series() {
      return [
        {
          name: "`   حولات   ",
          data: [this.all.find((el) => el.table_name == "transfers")?.count || 32],
        },
        {
          name: "`   صرافة   ",
          data: [this.all.find((el) => el.table_name == "exchanges")?.count] || 5,
        },
      ];
    },
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
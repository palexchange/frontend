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
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      all: (state) => state.stock_transaction.all,
    }),
    series() {
      return [
        {
          name: "دولار",
          data: this.all.filter((el) => el.stock_id == 1).map((e) => e.mid),
        },
        {
          name: "شيكل",
          data: this.all.filter((el) => el.stock_id == 2).map((e) => e.mid),
        },
        {
          name: "دينار",
          data: this.all.filter((el) => el.stock_id == 3).map((e) => e.mid),
        },
        {
          name: "يورو",
          data: this.all.filter((el) => el.stock_id == 4).map((e) => e.mid),
        },
        {
          name: "درهم",
          data: this.all.filter((el) => el.stock_id == 5).map((e) => e.mid),
        },
        {
          name: "ر.س",
          data: this.all.filter((el) => el.stock_id == 6).map((e) => e.mid),
        },
        {
          name: "جنيه",
          data: this.all.filter((el) => el.stock_id == 7).map((e) => e.mid),
        },
      ];
    },
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: "line",
          // dropShadow: {
          //   enabled: true,
          //   color: "#000",
          //   top: 18,
          //   left: 7,
          //   blur: 10,
          //   opacity: 0.2,
          // },
          toolbar: {
            show: false,
          },
        },
        colors: [
          "#644DA0",
          "#FF7171",
          "#DD7D1A",
          "#FF7D7F",
          "#FF7AD2",
          "#AA7D1A",
          "#FF9844",
        ],

        // stroke: {
        //   curve: "smooth",
        // },
        title: {
          // text: this.$t("Statistics"),
          align: "center",
        },

        xaxis: {
          categories: Array.from(new Set(this.all.map((el) => el.day))),
          title: {
            text: "اليوم",
          },
        },
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
      };
    },
  },
  created() {
    this.$store.dispatch("stock_transaction/index");
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
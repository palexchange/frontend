<template>
  <div id="chart">
    <apexchart
      height="350"
      type="line"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        title: {
          text: this.$t("Statistics"),
          align: "center",
        },
        stroke: {
          width: [4, 4],
        },
        plotOptions: {
          bar: {
            columnWidth: "20%",
          },
        },
        chart: {
          height: 350,
          type: "line",
          stacked: false,
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#FF1654", "#247BA0"],

        xaxis: {
          type: "category",
        },
        legend: {
          horizontalAlign: "left",
          offsetX: 40,
        },
      },
      series: [
        {
          name: "Series A",
          data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
        },
        {
          name: "Series B",
          data: [20, 29, 37, 36, 44, 45, 50, 58],
        },
      ],
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#FF1654",
          },
          labels: {
            style: {
              colors: "#FF1654",
            },
          },
          title: {
            text: "Series A",
            style: {
              color: "#FF1654",
            },
          },
        },
        {
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#247BA0",
          },
          labels: {
            style: {
              colors: "#247BA0",
            },
          },
          title: {
            text: "Series B",
            style: {
              color: "#247BA0",
            },
          },
        },
      ],

      //   options: {
      //     legend: {
      //       show: false,
      //     },
      //     chart: {
      //       height: 350,
      //       type: "treemap",
      //     },
      //     title: {
      //       text: "Treemap with Color scale",
      //     },
      //     dataLabels: {
      //       enabled: true,
      //       style: {
      //         fontSize: "12px",
      //       },
      //       formatter: function (text, op) {
      //         return [text, op.value];
      //       },
      //       offsetY: -4,
      //     },
      //     plotOptions: {
      //       treemap: {
      //         enableShades: true,
      //         shadeIntensity: 0.5,
      //         reverseNegativeShade: true,
      //         colorScale: {
      //           ranges: [
      //             {
      //               from: -6,
      //               to: 0,
      //               color: "#CD363A",
      //             },
      //             {
      //               from: 0.001,
      //               to: 6,
      //               color: "#52B12C",
      //             },
      //           ],
      //         },
      //       },
      //     },
      //   },

      //   series: [
      //     {
      //       data: [
      //         {
      //           x: "INTC",
      //           y: 1.2,
      //         },
      //         {
      //           x: "GS",
      //           y: 0.4,
      //         },
      //         {
      //           x: "CVX",
      //           y: -1.4,
      //         },
      //         {
      //           x: "GE",
      //           y: 2.7,
      //         },
      //         {
      //           x: "CAT",
      //           y: -0.3,
      //         },
      //         {
      //           x: "RTX",
      //           y: 5.1,
      //         },
      //         {
      //           x: "CSCO",
      //           y: -2.3,
      //         },
      //         {
      //           x: "JNJ",
      //           y: 2.1,
      //         },
      //         {
      //           x: "PG",
      //           y: 0.3,
      //         },
      //         {
      //           x: "TRV",
      //           y: 0.12,
      //         },
      //         {
      //           x: "MMM",
      //           y: -2.31,
      //         },
      //         {
      //           x: "NKE",
      //           y: 3.98,
      //         },
      //         {
      //           x: "IYT",
      //           y: 1.67,
      //         },
      //       ],
      //     },
      //   ],
    };
  },
};
</script>
 
 
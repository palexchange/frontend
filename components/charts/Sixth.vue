<template>
  <div id="chart">
    <apexchart
      height="350"
      type="treemap"
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
        plotOptions: {
          treemap: {
            enableShades: true,
            shadeIntensity: 0.5,
            reverseNegativeShade: true,
            colorScale: {
              ranges: [
                // {
                //   from: 5,
                //   to: 60,
                //   color: "#52B12C",
                // },
                // {
                //   from: 5,
                //   to: 60,
                //   color: "#52B12C",
                // },
                {
                  from: 30,
                  to: 60,
                  color: "#52B12C",
                },
                {
                  from: 70,
                  to: 90,
                  color: "#CD363A",
                },
              ],
            },
          },
        },
        chart: {
          id: "vuechart-example",
        },

        xaxis: {
          type: "category",
        },
      },
      series: [
        {
          data: [
            {
              x: "Saudi Arabia",
              y: 90,
            },
            {
              x: "Lithuania",
              y: 70,
            },
            {
              x: this.$t("Afghanistan"),
              y: 60,
            },
            {
              x: "Albania",
              y: 50,
            },
            {
              x: "Andorra",
              y: 15,
            },
            {
              x: "Belarus",
              y: 25,
            },
            {
              x: "Nauru",
              y: 30,
            },
            {
              x: "Botswana",
              y: 35,
            },
            {
              x: "Brunei",
              y: 40,
            },
          ],
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
 
 
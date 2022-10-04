<template>
  <div id="chart">
    <apexchart
      height="350"
      type="bubble"
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
        stroke: {
          width: [4, 4],
        },

        chart: {
          height: 350,
          type: "bubble",
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#FF1654", "#247BA0"],

        fill: {
          opacity: 0.8,
        },
        title: {
          text: "Simple Bubble Chart",
        },
        xaxis: {
          tickAmount: 12,
          type: "category",
        },
        yaxis: {
          max: 70,
        },
      },
      series: [
        {
          name: "Bubble1",
          data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: "Bubble2",
          data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: "Bubble3",
          data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: "Bubble4",
          data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
      ],
    };
  },
};
</script>
 
 
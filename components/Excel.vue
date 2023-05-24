<template>
  <form ref="form">
    <div class="main-content">
      <div class="cells">
        <div class="cells__spacer"></div>
        <div class="cells__alphabet">A</div>
        <div class="cells__alphabet">B</div>
        <div class="cells__alphabet">C</div>
        <div class="cells__alphabet">D</div>
        <div class="cells__alphabet">E</div>
        <div class="cells__alphabet">F</div>
        <div class="cells__alphabet">G</div>
        <div class="cells__alphabet">H</div>
        <div class="cells__alphabet">J</div>
        <div class="cells__alphabet">K</div>

        <div class="cells__number">1</div>
        <div class="cells__number">2</div>
        <div class="cells__number">3</div>
        <div class="cells__number">4</div>
        <div class="cells__number">5</div>
        <div class="cells__number">6</div>
        <div class="cells__number">7</div>
        <div class="cells__number">8</div>
        <div class="cells__number">9</div>
        <div class="cells__number">10</div>
        <div class="cells__number">11</div>
        <div class="cells__number">12</div>
        <div class="cells__number">13</div>
        <!-- <div class="cells__number">14</div>
      <div class="cells__number">15</div> -->
        <div disabled class="cells__input currency__name">شيكل</div>
        <div class="cells__input" />
        <div class="cells__input currency__name">دولار</div>
        <div disabled class="cells__input" />
        <div class="cells__input currency__name">دينار</div>
        <div disabled class="cells__input" />
        <div class="cells__input currency__name">يورو</div>
        <div disabled class="cells__input" />
        <div class="cells__input currency__name">جنيه</div>
        <div disabled class="cells__input" />

        <input disabled class="cells__input" value="سالب" />
        <input disabled class="cells__input" value="موجب" />
        <input disabled class="cells__input" value="سالب" />
        <input disabled class="cells__input" value="موجب" />
        <input disabled class="cells__input" value="سالب" />
        <input disabled class="cells__input" value="موجب" />
        <input disabled class="cells__input" value="سالب" />
        <input disabled class="cells__input" value="موجب" />
        <input disabled class="cells__input" value="سالب" />
        <input disabled class="cells__input" value="موجب" />

        <input
          @input="(e) => setValue('totalTwo', e, 0, -1)"
          type="number"
          class="cells__input totalTwo"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTwo', e, 0, 1)"
          type="number"
          class="cells__input totalTwo"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalOne', e, 0, -1)"
          type="number"
          class="cells__input totalOne"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalOne', e, 0, 1)"
          type="number"
          class="cells__input totalOne"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalTree', e, 0, -1)"
          type="number"
          class="cells__input totalTree"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTree', e, 0, 1)"
          type="number"
          class="cells__input totalTree"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalFour', e, 0, -1)"
          type="number"
          class="cells__input totalFour"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalFour', e, 0, 1)"
          type="number"
          class="cells__input totalFour"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 0, -1)"
          type="number"
          class="cells__input totalSeven"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 0, 1)"
          type="number"
          class="cells__input totalSeven"
          value="موجب"
        />

        <input
          @input="(e) => setValue('totalTwo', e, 1, -1)"
          type="number"
          class="cells__input totalTwo"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTwo', e, 1, 1)"
          type="number"
          class="cells__input totalTwo"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalOne', e, 1, -1)"
          type="number"
          class="cells__input totalOne"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalOne', e, 1, 1)"
          type="number"
          class="cells__input totalOne"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalTree', e, 1, -1)"
          type="number"
          class="cells__input totalTree"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTree', e, 1, 1)"
          type="number"
          class="cells__input totalTree"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalFour', e, 1, -1)"
          type="number"
          class="cells__input totalFour"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalFour', e, 1, 1)"
          type="number"
          class="cells__input totalFour"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 1, -1)"
          type="number"
          class="cells__input totalSeven"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 1, 1)"
          type="number"
          class="cells__input totalSeven"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalTwo', e, 2, -1)"
          type="number"
          class="cells__input totalTwo"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTwo', e, 2, 1)"
          type="number"
          class="cells__input totalTwo"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalOne', e, 2, -1)"
          type="number"
          class="cells__input totalOne"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalOne', e, 2, 1)"
          type="number"
          class="cells__input totalOne"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalTree', e, 2, -1)"
          type="number"
          class="cells__input totalTree"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTree', e, 2, 1)"
          type="number"
          class="cells__input totalTree"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalFour', e, 2, -1)"
          type="number"
          class="cells__input totalFour"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalFour', e, 2, 1)"
          type="number"
          class="cells__input totalFour"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 2, -1)"
          type="number"
          class="cells__input totalSeven"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 2, 1)"
          type="number"
          class="cells__input totalSeven"
          value="موجب"
        />

        <input
          @input="(e) => setValue('totalTwo', e, 3, -1)"
          type="number"
          class="cells__input totalTwo"
          value="سالب"
          minus-value="true"
        />

        <input
          @input="(e) => setValue('totalTwo', e, 3, 1)"
          type="number"
          class="cells__input totalTwo"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalOne', e, 3, -1)"
          type="number"
          class="cells__input totalOne"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalOne', e, 3, 1)"
          type="number"
          class="cells__input totalOne"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalTree', e, 3, -1)"
          type="number"
          class="cells__input totalTree"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTree', e, 3, 1)"
          type="number"
          class="cells__input totalTree"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalFour', e, 3, -1)"
          type="number"
          class="cells__input totalFour"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalFour', e, 3, 1)"
          type="number"
          class="cells__input totalFour"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 3, -1)"
          type="number"
          class="cells__input totalSeven"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 3, 1)"
          type="number"
          class="cells__input totalSeven"
          value="موجب"
        />

        <input
          @input="(e) => setValue('totalTwo', e, 4, -1)"
          type="number"
          class="cells__input totalTwo"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTwo', e, 4, 1)"
          type="number"
          class="cells__input totalTwo"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalOne', e, 4, -1)"
          type="number"
          class="cells__input totalOne"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalOne', e, 4, 1)"
          type="number"
          class="cells__input totalOne"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalTree', e, 4, -1)"
          type="number"
          class="cells__input totalTree"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTree', e, 4, 1)"
          type="number"
          class="cells__input totalTree"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalFour', e, 4, -1)"
          type="number"
          class="cells__input totalFour"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalFour', e, 4, 1)"
          type="number"
          class="cells__input totalFour"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 4, -1)"
          type="number"
          class="cells__input totalSeven"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 4, 1)"
          type="number"
          class="cells__input totalSeven"
          value="موجب"
        />

        <input
          @input="(e) => setValue('totalTwo', e, 5, -1)"
          type="number"
          class="cells__input totalTwo"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTwo', e, 5, 1)"
          type="number"
          class="cells__input totalTwo"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalOne', e, 5, -1)"
          type="number"
          class="cells__input totalOne"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalOne', e, 5, 1)"
          type="number"
          class="cells__input totalOne"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalTree', e, 5, -1)"
          type="number"
          class="cells__input totalTree"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTree', e, 5, 1)"
          type="number"
          class="cells__input totalTree"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalFour', e, 5, -1)"
          type="number"
          class="cells__input totalFour"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalFour', e, 5, 1)"
          type="number"
          class="cells__input totalFour"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 5, -1)"
          type="number"
          class="cells__input totalSeven"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 5, 1)"
          type="number"
          class="cells__input totalSeven"
          value="موجب"
        />

        <input
          @input="(e) => setValue('totalTwo', e, 6, -1)"
          type="number"
          class="cells__input totalTwo"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTwo', e, 6, 1)"
          type="number"
          class="cells__input totalTwo"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalOne', e, 6, -1)"
          type="number"
          class="cells__input totalOne"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalOne', e, 6, 1)"
          type="number"
          class="cells__input totalOne"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalTree', e, 6, -1)"
          type="number"
          class="cells__input totalTree"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTree', e, 6, 1)"
          type="number"
          class="cells__input totalTree"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalFour', e, 6, -1)"
          type="number"
          class="cells__input totalFour"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalFour', e, 6, 1)"
          type="number"
          class="cells__input totalFour"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 6, -1)"
          type="number"
          class="cells__input totalSeven"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 6, 1)"
          type="number"
          class="cells__input totalSeven"
          value="موجب"
        />

        <input
          @input="(e) => setValue('totalTwo', e, 7, -1)"
          type="number"
          class="cells__input totalTwo"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTwo', e, 7, 1)"
          type="number"
          class="cells__input totalTwo"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalOne', e, 7, -1)"
          type="number"
          class="cells__input totalOne"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalOne', e, 7, 1)"
          type="number"
          class="cells__input totalOne"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalTree', e, 7, -1)"
          type="number"
          class="cells__input totalTree"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTree', e, 7, 1)"
          type="number"
          class="cells__input totalTree"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalFour', e, 7, -1)"
          type="number"
          class="cells__input totalFour"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalFour', e, 7, 1)"
          type="number"
          class="cells__input totalFour"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 7, -1)"
          type="number"
          class="cells__input totalSeven"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 7, 1)"
          type="number"
          class="cells__input totalSeven"
          value="موجب"
        />

        <input
          @input="(e) => setValue('totalTwo', e, 8, -1)"
          type="number"
          class="cells__input totalTwo"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTwo', e, 8, 1)"
          type="number"
          class="cells__input totalTwo"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalOne', e, 8, -1)"
          type="number"
          class="cells__input totalOne"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalOne', e, 8, 1)"
          type="number"
          class="cells__input totalOne"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalTree', e, 8, -1)"
          type="number"
          class="cells__input totalTree"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTree', e, 8, 1)"
          type="number"
          class="cells__input totalTree"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalFour', e, 8, -1)"
          type="number"
          class="cells__input totalFour"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalFour', e, 8, 1)"
          type="number"
          class="cells__input totalFour"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 8, -1)"
          type="number"
          class="cells__input totalSeven"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 8, 1)"
          type="number"
          class="cells__input totalSeven"
          value="موجب"
        />

        <input
          @input="(e) => setValue('totalTwo', e, 9, -1)"
          type="number"
          class="cells__input totalTwo"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTwo', e, 9, 1)"
          type="number"
          class="cells__input totalTwo"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalOne', e, 9, -1)"
          type="number"
          class="cells__input totalOne"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalOne', e, 9, 1)"
          type="number"
          class="cells__input totalOne"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalTree', e, 9, -1)"
          type="number"
          class="cells__input totalTree"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTree', e, 9, 1)"
          type="number"
          class="cells__input totalTree"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalFour', e, 9, -1)"
          type="number"
          class="cells__input totalFour"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalFour', e, 9, 1)"
          type="number"
          class="cells__input totalFour"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 9, -1)"
          type="number"
          class="cells__input totalSeven"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 9, 1)"
          type="number"
          class="cells__input totalSeven"
          value="موجب"
        />

        <input
          @input="(e) => setValue('totalTwo', e, 10, -1)"
          type="number"
          class="cells__input totalTwo"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTwo', e, 10, 1)"
          type="number"
          class="cells__input totalTwo"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalOne', e, 10, -1)"
          type="number"
          class="cells__input totalOne"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalOne', e, 10, 1)"
          type="number"
          class="cells__input totalOne"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalTree', e, 10, -1)"
          type="number"
          class="cells__input totalTree"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalTree', e, 10, 1)"
          type="number"
          class="cells__input totalTree"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalFour', e, 10, -1)"
          type="number"
          class="cells__input totalFour"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalFour', e, 10, 1)"
          type="number"
          class="cells__input totalFour"
          value="موجب"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 10, -1)"
          type="number"
          class="cells__input totalSeven"
          value="سالب"
          minus-value="true"
        />
        <input
          @input="(e) => setValue('totalSeven', e, 10, 1)"
          type="number"
          class="cells__input totalSeven"
          value="موجب"
        />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: ["save_clicked"],
  data: () => {
    return {
      items: [],
      item: {
        totalOne: { id: 1, amount: 0 },
        totalTwo: { id: 2, amount: 0 },
        totalTree: { id: 3, amount: 0 },
        totalFour: { id: 4, amount: 0 },
        totalSeven: { id: 7, amount: 0 },
      },
    };
  },
  methods: {
    setValue(name, event, row_index, opirator) {
      const currentItem = JSON.parse(JSON.stringify(this.items[row_index]));
      currentItem[name].amount = event.target.value * opirator;
      this.items.splice(row_index, 1, currentItem);

      // this.items[row_index][name].amount = event.target.value * opirator;
    },
    resetForm() {
      const form = this.$refs.form; //to get the form
      form.reset(); // reset the form
    },
  },
  watch: {
    save_clicked(val) {
      console.log("hello world");
      this.resetForm();
    },
    items: {
      handler(new_val) {
        this.$emit("new_item", new_val);
      },
      deep: true,
    },
  },
  mounted() {
    while (this.items.length < 11) {
      this.items.push(this.item);
    }
  },
};
</script>

<style>
.cells {
  position: relative;
  display: grid;
  /* grid-template-columns: 40px repeat(8, calc((100% - 660px) / 4)); */
  grid-template-columns: 40px repeat(10, calc((100% - 660px) / 5.5));
  grid-template-rows: repeat(21, 30px);
  grid-gap: 2px;
  background: #cdcdcd;
  grid-auto-flow: dense;
  max-width: 100%;
  overflow: hidden;
  height: 449px;
}
@media (max-width: 1345px) {
  .cells {
    grid-template-columns: 40px repeat(10, calc((100% - 660px) / 4.4));
  }
}

.cells__spacer {
  background: #e6e6e6;
  position: relative;
}

.cells__spacer:after {
  content: "";
  position: absolute;
  right: 4px;
  bottom: 4px;
  height: 80%;
  width: 100%;
  background: linear-gradient(
    135deg,
    transparent 30px,
    #bbb 30px,
    #bbb 55px,
    transparent 55px
  );
}
.cells__alphabet {
  background: #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cells__number {
  background: #e6e6e6;
  grid-column: 1 / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cells__input {
  border: none;
  padding: 0 6px;
}
.cells input,
.cells button {
  border: none;
  background: #fff;
  padding: 0 6px;
}
.cells__input {
  font-size: 16px;
  font-weight: 700;
  text-align: center;
}
.currency__name {
  position: relative;
  right: 58px;
  background: white;
  white-space: nowrap;
  text-align: center;
}
</style>

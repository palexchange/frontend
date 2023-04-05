<template>
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
      <div class="cells__alphabet">I</div>
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
      <input disabled value="شيكل" class="cells__input" />
      <input disabled value="دولار" class="cells__input" />
      <input disabled value="دينار" class="cells__input" />
      <input disabled value="يورو" class="cells__input" />
      <input disabled value="جنيه" class="cells__input" />
      <input disabled value="ريال سعودي" class="cells__input" />
      <input disabled class="cells__input" />
      <input disabled class="cells__input" />

      <input
        @input="setValue('totalTwo')"
        type="number"
        class="cells__input totalTwo"
      />
      <input
        @input="setValue('totalOne')"
        type="number"
        class="cells__input totalOne"
      />
      <input
        @input="setValue('totalTree')"
        type="number"
        class="cells__input totalTree"
      />
      <input
        @input="setValue('totalFour')"
        type="number"
        class="cells__input totalFour"
      />
      <input
        @input="setValue('totalSeven')"
        type="number"
        class="cells__input totalSeven"
      />
      <input
        @input="setValue('totalSeven')"
        type="number"
        class="cells__input totalSeven"
      />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />

      <input
        @input="setValue('totalTwo')"
        type="number"
        class="cells__input totalTwo"
      />
      <input
        @input="setValue('totalOne')"
        type="number"
        class="cells__input totalOne"
      />
      <input
        @input="setValue('totalTree')"
        type="number"
        class="cells__input totalTree"
      />
      <input
        @input="setValue('totalFour')"
        type="number"
        class="cells__input totalFour"
      />
      <input
        @input="setValue('totalSeven')"
        type="number"
        class="cells__input totalSeven"
      />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />

      <input
        @input="setValue('totalTwo')"
        type="number"
        class="cells__input totalTwo"
      />
      <input
        @input="setValue('totalOne')"
        type="number"
        class="cells__input totalOne"
      />
      <input
        @input="setValue('totalTree')"
        type="number"
        class="cells__input totalTree"
      />
      <input
        @input="setValue('totalFour')"
        type="number"
        class="cells__input totalFour"
      />
      <input
        @input="setValue('totalSeven')"
        type="number"
        class="cells__input totalSeven"
      />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />

      <input
        @input="setValue('totalTwo')"
        type="number"
        class="cells__input totalTwo"
      />
      <input
        @input="setValue('totalOne')"
        type="number"
        class="cells__input totalOne"
      />
      <input
        @input="setValue('totalTree')"
        type="number"
        class="cells__input totalTree"
      />
      <input
        @input="setValue('totalFour')"
        type="number"
        class="cells__input totalFour"
      />
      <input
        @input="setValue('totalSeven')"
        type="number"
        class="cells__input totalSeven"
      />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />

      <input
        @input="setValue('totalTwo')"
        type="number"
        class="cells__input totalTwo"
      />
      <input
        @input="setValue('totalOne')"
        type="number"
        class="cells__input totalOne"
      />
      <input
        @input="setValue('totalTree')"
        type="number"
        class="cells__input totalTree"
      />
      <input
        @input="setValue('totalFour')"
        type="number"
        class="cells__input totalFour"
      />
      <input
        @input="setValue('totalSeven')"
        type="number"
        class="cells__input totalSeven"
      />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />

      <input
        @input="setValue('totalTwo')"
        type="number"
        class="cells__input totalTwo"
      />
      <input
        @input="setValue('totalOne')"
        type="number"
        class="cells__input totalOne"
      />
      <input
        @input="setValue('totalTree')"
        type="number"
        class="cells__input totalTree"
      />
      <input
        @input="setValue('totalFour')"
        type="number"
        class="cells__input totalFour"
      />
      <input
        @input="setValue('totalSeven')"
        type="number"
        class="cells__input totalSeven"
      />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />

      <input
        @input="setValue('totalTwo')"
        type="number"
        class="cells__input totalTwo"
      />
      <input
        @input="setValue('totalOne')"
        type="number"
        class="cells__input totalOne"
      />
      <input
        @input="setValue('totalTree')"
        type="number"
        class="cells__input totalTree"
      />
      <input
        @input="setValue('totalFour')"
        type="number"
        class="cells__input totalFour"
      />
      <input
        @input="setValue('totalSeven')"
        type="number"
        class="cells__input totalSeven"
      />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />

      <input
        @input="setValue('totalTwo')"
        type="number"
        class="cells__input totalTwo"
      />
      <input
        @input="setValue('totalOne')"
        type="number"
        class="cells__input totalOne"
      />
      <input
        @input="setValue('totalTree')"
        type="number"
        class="cells__input totalTree"
      />
      <input
        @input="setValue('totalFour')"
        type="number"
        class="cells__input totalFour"
      />
      <input
        @input="setValue('totalSeven')"
        type="number"
        class="cells__input totalSeven"
      />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />

      <input
        @input="setValue('totalTwo')"
        type="number"
        class="cells__input totalTwo"
      />
      <input
        @input="setValue('totalOne')"
        type="number"
        class="cells__input totalOne"
      />
      <input
        @input="setValue('totalTree')"
        type="number"
        class="cells__input totalTree"
      />
      <input
        @input="setValue('totalFour')"
        type="number"
        class="cells__input totalFour"
      />
      <input
        @input="setValue('totalSeven')"
        type="number"
        class="cells__input totalSeven"
      />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />

      <input
        @input="setValue('totalTwo')"
        type="number"
        class="cells__input totalTwo"
      />
      <input
        @input="setValue('totalOne')"
        type="number"
        class="cells__input totalOne"
      />
      <input
        @input="setValue('totalTree')"
        type="number"
        class="cells__input totalTree"
      />
      <input
        @input="setValue('totalFour')"
        type="number"
        class="cells__input totalFour"
      />
      <input
        @input="setValue('totalSeven')"
        type="number"
        class="cells__input totalSeven"
      />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />
      <input disabled type="number" class="cells__input" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
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
    setValue(name) {
      let total = 0;
      Array.from(document.querySelectorAll(`.${name}`)).forEach((e) => {
        total += e.value * 1;
        this.item[name].amount = total;
      });
    },
  },
  watch: {
    item: {
      handler(new_val) {
        this.$emit("new_item", new_val);
      },
      deep: true,
    },
  },
};
</script>

<style>
.cells {
  position: relative;
  display: grid;
  grid-template-columns: 40px repeat(8, calc((100% - 660px) / 4));
  grid-template-rows: repeat(21, 30px);
  grid-gap: 8px;
  background: #cdcdcd;
  grid-auto-flow: dense;
  max-width: 100%;
  overflow: hidden;
  height: 449px;
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
  font-size: 20px;
  font-weight: 700;
}
</style>
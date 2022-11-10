<template>
  <div class="transfer_type_holder px-5 text-center">
    <InputField
      dashed
      hide-details
      :label="$t('profit')"
      :value="(profit || officeProfitComp) | money"
    />
    <img v-if="t_type == 2" width="100" src="/moneygram.png" alt="" />
  </div>
</template>

<script>
export default {
  props: ["t_type", "profit", "officeProfitComp"],
  filters: {
    money(value) {
      if (value) {
        return value.toLocaleString(undefined, { minimumFractionDigits: 3 });
      }
    },
  },
};
</script>

<style>
.transfer_type_holder {
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 150px;
  z-index: 500;
  left: 0px;
  padding: 0 !important;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  /* height: 100px; */
  background: rgb(255, 255, 255);
  width: 211px;
}
</style>
<template>
  <tr class="text-right">
    <td>
      <v-btn depressed width="50" class="mt-2 fs-18">{{ $t(name) }}</v-btn>
    </td>
    <td>
      <v-text-field
        hide-details
        class="mt-4"
        min="0"
        color="#FF7171"
        style="border-radius: 7px !important"
        dense
        outlined
      />
    </td>
    <td>
      <v-text-field
        hide-details
        class="mt-4"
        min="0"
        color="#FF7171"
        style="border-radius: 7px !important"
        dense
        outlined
      />
    </td>
    <td>
      <v-text-field
        hide-details
        class="mt-4"
        min="0"
        background-color="#e7e6e6"
        style="border-radius: 7px !important"
        dense
        outlined
        disabled
      />
    </td>
    <td>
      <v-btn class="mt-4" color="primary">{{ $t("reminder") }}</v-btn>
    </td>
    <td>
      <v-btn class="mt-4" color="primary">{{ $t("amount rounding") }}</v-btn>
    </td>
    <td>
      <v-btn class="mt-4" color="primary">{{ $t("delete fraction") }}</v-btn>
    </td>
    <td>
      <v-btn class="mt-4" color="primary">{{ $t("complete fraction") }}</v-btn>
    </td>
  </tr>
</template>

<script>
export default {
  name: "exchabe-row",
  props: ["name"],
};
</script>

<style>
</style>
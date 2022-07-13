<template>
  <Card>
    <v-card-title>
      <v-row class="justify-space-between">
        <v-col> {{ $t(name) }} </v-col>
        <v-col style="text-align: end"> <slot /> </v-col>
      </v-row>
    </v-card-title>
  </Card>
</template>
<script>
export default {
  props: ["name", "to", "report"],
  name: "Crud-Header",
};
</script>
<template>
  <v-row>
    <v-col cols="4"> {{$t(name)}} </v-col>
    <v-spacer></v-spacer>
    <v-col cols="3">
      <v-btn color="primary" rounded small :to="to">
        <v-icon small> fas fa-plus </v-icon>
        <span> {{$t('add')}} </span>
      </v-btn>
      <v-btn color="primary" rounded small @click="$emit('filterClick')">
        <v-icon small> fas fa-filter </v-icon>
        <span> {{$t('filter')}} </span>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
export default {
    props:['name','to'],
    name:"Crud Header"
}
</script>
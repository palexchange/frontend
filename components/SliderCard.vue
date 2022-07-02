<template>
  <v-card
    transition="scale-transition"
    origin="center center"
    color="#222222"
    style="opacity: 0.75"
    dark
    shaped
    min-height="200px"
    class="d-flex flex-column"
  >
    <v-card-title> {{ slide.title }} </v-card-title>
    <v-card-text>
      <p>
        {{ slide.text }}
      </p>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions bottom>
      <v-btn color="primary"  rounded block  v-if="slide.link" :to="slide.link">
        {{ slide.link_title }}
      </v-btn>
    </v-card-actions>
    
  </v-card>
</template>
<script>
export default {
  props: ["slide"],
  mounted(){
      console.log('dsdsdsdsd');
      this.$emit('shown',1);
  },
  beforeDestroy(){
      this.$emit('exited',1);
  },
  
};
</script>
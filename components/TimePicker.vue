<template>
  <v-menu
    ref="menu"
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        :label="label ? $t(`${label}`) : ''"
        append-icon="mdi-clock-time-four-outline"
        
        readonly
        v-bind="attrs"
        v-on="on"
        :value="convert24hrToAmpm(time)"
        outlined
        dense
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu2"
      v-model="time"
      
      full-width
      @click:minute="
        $refs.menu.save(time);
        $emit('input', time);
      "
    ></v-time-picker>
  </v-menu>
</template>
<script>
export default {
  props: { label:String},
  data() {
    return {
      time: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString()
        .substr(11, 8),
        
        
      menu2: false,
      modal2: false,
    };
  },
  mounted() {
    this.$emit("input", this.time);
  },
  methods: {
    convert24hrToAmpm(dateStr) {
      console.log("typesssssss: ",typeof(dateStr));
      if(!dateStr) {
        return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(11, 8);
      }
      console.log("Before: ",dateStr);
      let time =  new Date('1970-01-01T' + dateStr + 'Z')
        .toLocaleTimeString('en-US',
          { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
        ).toString();
        console.log("After: ",time);
        return time;
    }
  }
};
</script>
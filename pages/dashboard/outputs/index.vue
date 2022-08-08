<template>
  <div>
    <Card class="pb-3">
      <v-card-title>
        <Title title="statement" />
      </v-card-title>
      <v-card-text>
        <v-row class="mt-5">
            <v-col>
              <AutoComplete class="rounding" holder="beneficiary" />
            </v-col>
            <v-col>
              <InputField holder="recived amount"> </InputField>
            </v-col>
            <v-col>
              <AutoComplete holder="currency" />
            </v-col>
            <v-col>
              <DatePicker v-model="item.date" holder="date" />
            </v-col>
            <v-col>
              <TimePicker> </TimePicker>
            </v-col>
            </v-row>
          <v-row>
            <v-col>
              <InputField holder="conversion factor"></InputField>
            </v-col>
            <v-col>
              <v-spacer></v-spacer>
            </v-col>
            <v-col>
              <v-spacer></v-spacer>
            </v-col>
            <v-col>
              <v-spacer></v-spacer>
            </v-col>
            <v-col>
              <v-spacer></v-spacer>
            </v-col>
            
        </v-row>
        <v-row justify="center">
          <v-col cols="2">
            <v-btn height="40" color="primary" block >
              {{ $t("approve") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
  </div>
</template>

<script>
import Card from '~/transfers/components/Card.vue';
import Title from '~/transfers/components/Title.vue';
export default {
  components: { Card, Title },
  data() {
    return {
      item: {}
    }
  }
};
</script>
  
<style>
.rounding {
  border-radius: 4px !important;
}
</style>
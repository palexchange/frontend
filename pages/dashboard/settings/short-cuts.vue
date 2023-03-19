<template>
  <div>
    <Card class="pa-5">
      <v-form v-model="validated">
        <v-card-title>
          <Title title="short cuts settings" />
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col>
              <h3>
                {{ "F1 : دولار && شيكل" }}
              </h3>
            </v-col>
            <v-col>
              <h3>
                {{ "F2 : دولار && دينار" }}
              </h3>
            </v-col>
            <v-col>
              <h3>
                {{ "F3 : دولار && يورو" }}
              </h3>
            </v-col>
            <v-col>
              <h3>
                {{ "F4 : دينار && شيكل" }}
              </h3>
            </v-col>
            <v-col>
              <h3>
                {{ "F5 : حفظ عملية الصرافة " }}
              </h3>
            </v-col>
          </v-row>
        </v-card-text>

        <!-- <v-card-actions>
          <v-btn :disabled="!validated" color="primary" @click="saveSettings">
            {{ $t("save") }}
          </v-btn>
        </v-card-actions> -->
      </v-form>
    </Card>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
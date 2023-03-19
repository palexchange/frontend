<template>
  <div>
    <Card class="pa-5">
      <v-form v-model="validated">
        <v-card-title>
          <Title title="short cuts settings" />
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="3">
              <h3>
                {{ "F1 : دولار && شيكل" }}
              </h3>
            </v-col>
            <v-col cols="3">
              <h3>
                {{ "F2 : دولار && دينار" }}
              </h3>
            </v-col>
            <v-col cols="3">
              <h3>
                {{ "F3 : دولار && يورو" }}
              </h3>
            </v-col>
            <v-col cols="3">
              <h3>
                {{ "F4 : دينار && شيكل" }}
              </h3>
            </v-col>
            <v-col cols="3">
              <h3>
                {{ "F12 : حفظ عملية الصرافة " }}
              </h3>
            </v-col>
            <v-col cols="3">
              <h3>
                {{ "F6 : إنشاء حوالة صادرة" }}
              </h3>
            </v-col>
            <v-col cols="3">
              <h3>
                {{ "F7 : إنشاء حوالة واردة" }}
              </h3>
            </v-col>
            <v-col cols="3">
              <h3>
                {{ "F8 : إنشاء موني غرام صادرة" }}
              </h3>
            </v-col>
            <v-col cols="3">
              <h3>
                {{ "F9 : إنشاء موني غرام واردة" }}
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
<template>
  <div>
    <Card>
      <v-form v-model="validated">
        <v-card-title>
          <Title title="short cuts settings" />
        </v-card-title>

        <v-card-text>
      
        </v-card-text>

        <v-card-actions>
          <v-btn :disabled="!validated" color="primary" @click="saveSettings">
            {{ $t("save") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </Card>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
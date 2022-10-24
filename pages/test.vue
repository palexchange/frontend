<template>
  <div>
    <div v-for="vid in vids">
      <h1
        :class="main_url == vid.url ? 'bgREd' : ''"
        @click="main_url = vid.url"
      >
        {{ vid.name }}
      </h1>
    </div>
    <div class="mt-8">
      {{ main_url }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      main_url: null,
      vids: [
        { name: "vid1", url: "test.com" },
        { name: "vid2", url: "test2.com" },
      ],
    };
  },
};
</script>

<style>
.bgREd {
  background: tomato;
}
</style>
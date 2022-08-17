<template>
  <h3 class="box-title-sec title-sec ">
    <span class="title-sec mb-5">
      {{ $t(title) }}
    </span>
  </h3>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style>
.box-title-sec .title-sec:after {
  content: "";
  display: block;
  width: 60%;
  height: 3px;
  background-color: #FF7F00;
  margin-top: 3px;
  border-radius: 50px;
}
/* .box-title-sec{
  position: relative;
} */
</style>
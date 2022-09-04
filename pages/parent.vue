<template>
  <div>
<child>
    <template v-slot:v="{a,b,c}">
        <h1 >
kjuhujh
{{items[a]}} {{items[b]}} {{items[c]}}
    </h1>
    </template>


</child>
  </div>
</template>

<script>
    import child from "./child.vue";
export default {
    layout: "blank",
components: {
    child
},data(){
    return {
        items:[
            "Active","disable"
        ]
    }
}

}
</script>

<style>

</style>
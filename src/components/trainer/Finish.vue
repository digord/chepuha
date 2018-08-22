<template>
    <div>
        <h2>You win!</h2>
        <el-button @click="$store.commit('unload')">Take an another list</el-button>
    </div>
</template>

<script>
  export default {
    name: "Finish"
  }
</script>

<style scoped>

</style>
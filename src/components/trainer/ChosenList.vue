<template>
    <el-card class="box-card study__list">
        <b>List info</b><br>
        Name: {{ $store.state.trainer.name }}<br>
        Number: {{ $store.state.trainer.length }}
    </el-card>
</template>

<script>
  export default {
    name: "ChosenList"
  }
</script>

<style lang="scss" scoped>

</style>
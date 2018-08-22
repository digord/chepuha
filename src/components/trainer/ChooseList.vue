<template>
    <div>
        <h2>Please, choose:</h2>
        <template v-for="(item, n) in phraseLists">
            <el-button type="text" @click="$emit('set', n)">{{ item.name }} ({{ item.list.length }})</el-button>
            <hr>
        </template>
    </div>
</template>

<script>
  export default {
    name: "ChooseList",
    props: {
      'phraseLists': {
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
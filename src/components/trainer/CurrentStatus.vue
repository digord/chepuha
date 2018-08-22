<template>
    <el-card class="box-card progress">
        <b>Your progress:</b>
        <el-progress :percentage="successPercentage" status="success"></el-progress>
        <el-progress :percentage="failedPercentage" status="exception"></el-progress>
    </el-card>
</template>

<script>
  export default {
    name: "CurrentStatus",
    computed: {
      successPercentage() {
        return this.$store.state.trainer.learned.length / (this.$store.state.trainer.length * 0.01);
      },
      failedPercentage() {
        return this.$store.state.trainer.failed.length / (this.$store.state.trainer.length * 0.01);
      },

    }
  }
</script>

<style lang="scss" scoped>
    .progress {
        width: 200px;
    }
</style>
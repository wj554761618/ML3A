<template>
  <div class="container">
    <div class="dashboard-text">运行监测：监控监测</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Overview',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

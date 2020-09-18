<template>
  <div class="dashboard-container">
    <div class="dashboard-text">统计报表：在线率统计</div>
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

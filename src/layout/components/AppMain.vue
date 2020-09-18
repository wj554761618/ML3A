<template>
  <section class="app-main" :class="{'hasSiderBar':sidebar.ifShow}">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    key() {
      return this.$route.path
    }
  }
}
</script>

<style  lang="scss" scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 60px);
  width: 100vw;
  position: relative;
  overflow: auto;
  background: #F3F3F8;
  padding: 20px;
}
.app-main.hasSiderBar{
  width: calc(100vw - 180px);
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

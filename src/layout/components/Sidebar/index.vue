<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.main"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in filterRouters" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>

    </el-scrollbar>
    <div class="siderbar-collapse" @click="toggleClick">
      <svg-icon icon-class="arrow"  :class="{'is-active':sidebar.opened}"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data(){
    return{
      filterRouters:[]
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    routes() {
      return this.permission_routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created(){
    let allRouters=this.permission_routes;
    let url=window.location.href;
    let that=this;
    allRouters.forEach(function (item,i) {
      if(!item.meta){
        return;
      }
      let name=item.meta.module
      if(url.indexOf(name)>-1){
        that.filterRouters.push(item)
      }
    })
  },
  methods:{
    toggleClick(){
      this.$store.dispatch('app/toggleSideBar')
    }
  },
  watch: {
    $route(to, from) {
      let routeName=to.path
      let allRouters=this.permission_routes;
      let that=this;
      if(that.filterRouters.length>0){
        that.filterRouters=[]
      }
      allRouters.forEach(function (item,i) {
        if(!item.meta){
          return;
        }
        let name=item.meta.module
        if(routeName.indexOf(name)>-1){
          that.filterRouters.push(item)
        }
      })

    }
  },
}
</script>
<style lang="scss" scoped>
  .siderbar-collapse .svg-icon{
    transform: rotate(-90deg);
  }
  .siderbar-collapse .is-active{
    transform: rotate(90deg);
  }

</style>

<template>
  <div class="navbar">

    <div class="left-content">
      <svg-icon icon-class="logo" />
      <div class="logo-content">运维统一管理平台</div>
    </div>
    <div class="middle-content">
      <div class="nav-tab">
        <router-link to="/overview" class="item" @click.native="toggleTab()">运维概况</router-link>
        <router-link to="/inspectionStatistics/detect" class="item" @click.native="toggleTab()">巡检统计</router-link>
        <router-link to="/statisticalReport/operatingStatistics" class="item" @click.native="toggleTab()">统计报表</router-link>
      </div>
      <div class="line" :class="currentTab"></div>
    </div>
    <div class="right-menu">
      <div class="user-name">
        <svg-icon icon-class="avatar" />
        admin
      </div>
      <div class="spite-line"></div>
      <div class="log-out" v-on:click="logout">
        <svg-icon icon-class="log-out" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data(){
    return{
      currentTab:"index0"
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created(){
    this.toggleTab()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    toggleTab(){
      let url=window.location.href;
      if(url.indexOf("overview")>-1){
        this.currentTab="index0"
      }
      if(url.indexOf("inspectionStatistics")>-1){
        this.currentTab="index1"
      }
      if(url.indexOf("statisticalReport")>-1){
        this.currentTab="index2"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";
.navbar {
  height: 80px;
  line-height: 80px;
  overflow: hidden;
  background-image: url("../../assets/header-bg.png");
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  display: flex;
  color:#fff;
  justify-content: space-between;
    .left-content{
      margin-left: 20px;
      display: flex;
      .svg-icon{
        margin-top: 22px;
        margin-right: 15px;
        font-size: 30px;
        width: 35px;
        height: 35px;
      }
      .logo-content{
        font-size: 22px;
        font-weight: bold;
      }
    }
  .middle-content{
    position: relative;
    .nav-tab{
      margin-top: 32px;
      height: 20px;
      .item{
        font-family: PingFangZhonghei;
        float: left;
        padding: 0 22px;
        border-right: 1px solid #E4E8EC;
        height: 16px;
        line-height: 16px;
        font-size: 18px;
        color: #CFD5E0;
        &:last-child{
          border: none;
        }
      }
      .router-link-active{
        color: #fff;
      }
    }
    .line{
      width: 75px;
      height: 3px;
      background:$main;
      position: absolute;
      bottom: 0px;
      transition: transform 0.28s;
    }
    .line.index0{
      transform: translateX(22px);
    }
    .line.index1{
      transform: translateX(138px);
    }
    .line.index2{
      transform: translateX(256px);
    }
  }
    .right-menu {
      float: right;
      height: 100%;
      line-height: 90px;
      display: flex;
      margin-right: 25px;
      font-size: 16px;
      .user-name .svg-icon{
        font-size: 25px;
        vertical-align: middle;
        margin-right: 12px;
        width: 32px;
        height: 32px;
      }
      .spite-line{
        width: 1px;
        height: 18px;
        background: #8E9AA8;
        margin-top: 36px;
        margin-left: 16px;
      }
      .log-out{
        margin-left: 19px;
        cursor: pointer;
      }
  }
}
</style>

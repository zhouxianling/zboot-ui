<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="logo-box">
      <div class="logo">sb</div>
      <div class="logo-title">有点牛逼</div>
    </div>

    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical">
      <sidebar-item v-for="route in routers" :key="route.path" :item="route" :base-path="route.path"/>

    </el-menu>
  </el-scrollbar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import variables from '@/styles/variables.scss'
  import SidebarItem from './SidebarItem'

  export default {
    components: {SidebarItem},
    computed: {
      ...mapGetters([
        'routers',
        'sidebar'
      ]),
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style scoped>
  .logo-box {
    height: 50px;
    width: 100%;
    background: #0E1C35;
  }

  .logo-title {
    font-size: 14px;
    padding: 14px 0 0;
    color: #fff;
    text-align: center;
  }

  .logo {
    font-size: 28px;
    color: #409EFF;
    float: left;
    width: 50px;
    text-align: center;
    font-weight: 600;
    padding-top: 5px;
  }


</style>

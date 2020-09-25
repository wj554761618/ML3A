import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/overview',
    children: [{
      path: 'overview',
      name: 'Overview',
      component: () => import('@/views/overview/index'),
      meta: { title: '运维概况', icon: 'dashboard' }
    }]
  },
  {
    path: '/inspectionStatistics/detect',
    component: Layout,
    redirect: 'inspectionStatistics/detect/monitor',
    name: 'detect',
    alwaysShow: true,
    meta: { title: '运行监测', icon: 'home_icon_Operation_normal',module:'inspectionStatistics' },
    children: [
      {
        path: 'monitor',
        name: 'monitor',
        component: () => import('@/views/detect/monitor/index'),
        meta: { title: '监控监测'}
      },
      {
        path: 'importantArea',
        name: 'importantArea',
        component: () => import('@/views/detect/importantArea/index'),
        meta: { title: '重点区域'}
      }
    ]
  },
  {
    path: '/inspectionStatistics/setting',
    component: Layout,
    redirect: 'inspectionStatistics/setting/monitoringAccess',
    name: 'setting',
    alwaysShow: true,
    meta: { title: '巡检设置', icon: 'el-icon-s-help',module:'inspectionStatistics' },
    children: [
      {
        path: 'monitoringAccess',
        name: 'monitoringAccess',
        component: () => import('@/views/inspectionSettings/monitoringAccess/index'),
        meta: { title: '监控接入巡检'}
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/detect/importantArea/index'),
        meta: { title: '资源巡检'}
      }
    ]
  },
  {
    path: '/inspectionStatistics/alarmQuery',
    component: Layout,
    redirect: 'inspectionStatistics/alarmQuery',
    name: 'alarmQuery',
    meta: { title: '告警查询', icon: 'el-icon-s-help',module:'inspectionStatistics' },
    children: [
      {
        path: 'index',
        name: 'alarmQuery',
        component: () => import('@/views/detect/monitor/index'),
        meta: { title: '告警查询', icon: 'el-icon-s-help' }
      }
    ]
  },
  {
    path: '/inspectionStatistics/equipmentMonitoring',
    component: Layout,
    redirect: 'inspectionStatistics/equipmentMonitoring',
    name: 'equipmentMonitoring',
    meta: { title: '设备监测', icon: 'el-icon-s-help',module:'inspectionStatistics' },
    children: [
      {
        path: 'share',
        name: 'share',
        component: () => import('@/views/detect/monitor/index'),
        meta: { title: '共享平台'}
      },
      {
        path: 'access',
        name: 'access',
        component: () => import('@/views/detect/monitor/index'),
        meta: { title: '监控接入'}
      }
    ]
  },
  {
    path: '/statisticalReport/operatingStatistics',
    component: Layout,
    redirect: '/statisticalReport/operatingStatistics/online',
    name: 'operatingStatistics',
    alwaysShow: true,
    meta: { title: '运行情况', icon: 'el-icon-s-help',module:'statisticalReport' },
    children: [
      {
        path: 'online',
        name: 'online',
        component: () => import('@/views/operatingStatistics/online/index'),
        meta: { title: '在线率统计'}
      },
      {
        path: 'offline',
        name: 'offline',
        component: () => import('@/views/operatingStatistics/online/index'),
        meta: { title: '平台离线统计'}
      },
      {
        path: 'offlineTime',
        name: 'offlineTime',
        component: () => import('@/views/operatingStatistics/online/index'),
        meta: { title: '离线时长统计'}
      },
      {
        path: 'ingestionSituation',
        name: 'ingestionSituation',
        component: () => import('@/views/operatingStatistics/online/index'),
        meta: { title: '取流情况统计', icon: 'table' }
      },
      {
        path: 'playHistory',
        name: 'playHistory',
        component: () => import('@/views/operatingStatistics/online/index'),
        meta: { title: '播放记录统计'}
      },
      {
        path: 'videoQuality',
        name: 'videoQuality',
        component: () => import('@/views/operatingStatistics/online/index'),
        meta: { title: '视频质量统计'}
      },
      {
        path: 'importantArea',
        name: 'importantArea',
        component: () => import('@/views/operatingStatistics/online/index'),
        meta: { title: '重点区域统计'}
      },
      {
        path: 'upperPlatform',
        name: 'upperPlatform',
        component: () => import('@/views/operatingStatistics/online/index'),
        meta: { title: '上级平台统计'}
      },
      {
        path: 'summaryGraph',
        name: 'summaryGraph',
        component: () => import('@/views/operatingStatistics/online/index'),
        meta: { title: '统计图'}
      }
    ]
  },
  {
    path: '/statisticalReport/faultReport',
    component: Layout,
    redirect: '/statisticalReport/faultReport/alarmStatistics',
    name: 'faultReport',
    alwaysShow: true,
    meta: { title: '故障报修', icon: 'el-icon-s-help',module:'statisticalReport' },
    children: [
      {
        path: 'alarmStatistics',
        name: 'alarmStatistics',
        component: () => import('@/views/operatingStatistics/online/index'),
        meta: { title: '告警统计'}
      },
      {
        path: 'reportStatistics',
        name: 'reportStatistics',
        component: () => import('@/views/operatingStatistics/online/index'),
        meta: { title: '故障上报统计'}
      },
      {
        path: 'onlineLogistics',
        name: 'onlineLogistics',
        component: () => import('@/views/operatingStatistics/online/index'),
        meta: { title: '在线无流统计'}
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

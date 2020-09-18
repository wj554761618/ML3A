import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
    ifShow:true
  },
  device: 'desktop',
  noHasSiderbarTab:['overview']//没有侧边栏的模块
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  SHOW_SIDERBAR:(state,ifShow)=>{
    state.sidebar.ifShow=ifShow
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  showSiderBar({ commit }, url) {
    console.log(url)
    let flag=true;
    const noSiderTab=state.noHasSiderbarTab;
    if(!url){
      return
    }
   if(typeof url==='string'){
     for(let i=0;i<noSiderTab.length;i++){
       let item=noSiderTab[i];
       if(url.toLowerCase().indexOf(item)>-1){
         flag=false
         commit('SHOW_SIDERBAR', flag)
         return;
       }else {
         flag=true
         commit('SHOW_SIDERBAR', flag)
       }
     }
   }else {
     for(let i=0;i<noSiderTab.length;i++){
       let item=noSiderTab[i];
       if(url.name.toLowerCase().indexOf(item)>-1){
         flag=false
         commit('SHOW_SIDERBAR', flag)
         return;
       }else {
         flag=true
         commit('SHOW_SIDERBAR', flag)
       }
     }
   }
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

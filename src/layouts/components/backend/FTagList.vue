<template>
  <div class="f-list-tag" style="left:250px;">
    <el-tabs
        v-model="activeTab"
        type="card"
        class="demo-tabs"
        @tab-remove="removeTab"
        style="min-width: 100px"
        @tab-Change="changeTab"
    >
      <el-tab-pane
          v-for="item in tabList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.path!='/admin'"
      >
      </el-tab-pane>
    </el-tabs>

    <span class="tag-btn">
      <el-dropdown @command="handleClose">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
              <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
  </div>
  <div style="height: 44px"></div>
</template>

<script setup>
import {ref} from 'vue'
import {useRoute,onBeforeRouteUpdate} from "vue-router";
import { useCookies } from '@vueuse/integrations/useCookies'
import  router  from '~/router';
const cookie = useCookies()
const route = useRoute()
const activeTab = ref(route.path)
const tabList = ref([
  {
    title: '后台首页',
    path:"/admin/home"
  }
])

onBeforeRouteUpdate((to,from)=>{
  activeTab.value = to.path
  addTab({
    title:to.meta.title,
    path:to.path
  })
})

function addTab(tab){
  let noTab = tabList.value.findIndex(t=>t.path == tab.path)==-1
  if(noTab){
    tabList.value.push(tab)
  }
  cookie.set("tabList",tabList.value)
}
const removeTab = (t) => {
  let tabs = tabList.value
  let a = activeTab.value
  if (a == t) {
    tabs.forEach((tab, index) => {
      if (tab.path == t) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          a = nextTab.path
        }
      }
    })
  }

  activeTab.value = a
  tabList.value = tabList.value.filter(tab => tab.path != t)

  cookie.set("tabList", tabList.value)
}
const changeTab = (t)=>{
  activeTab.value = t
  router.push(t)
}
//初始化标签导航栏列表
function initTabList(){
  let tbs = cookie.get("tabList")
  if(tbs){
    tabList.value = tbs
  }
}
const handleClose = (c) => {
  if (c == "clearAll") {
    // 切换回首页
    activeTab.value = "/admin/home"
    // 过滤只剩下首页
    tabList.value = [{
      title: '后台首页',
      path: "/admin/home"
    }]
  } else if (c == "clearOther") {
    // 过滤只剩下首页和当前激活
    tabList.value = tabList.value.filter(tab => tab.path == "/admin/home" || tab.path == activeTab.value)
  }
  cookie.set("tabList", tabList.value)
}
initTabList()
</script>

<style scoped>
.f-list-tag{
  @apply fixed bg-gray-100 flex items-center px-2;
  top: 64px;
  right: 0;
  height: 44px;
}
.tag-btn{
  @apply bg-white rounded ml-auto flex items-center justify-center px-2;
  height: 32px;

}
:deep(.el-tabs__header){
  @apply mb-0 flex items-center ;
  border: 0!important;
}
:deep(.el-tabs__nav){
  border: 0!important;
}
:deep(.el-tabs__item){
  border: 0!important;
  @apply bg-white ml-1 rounded;
  height: 32px;
  line-height: 32px;
}
:deep(.el-tabs__nav-next),:deep(.el-tabs__nav-prev){
  height: 32px;
  line-height: 32px;
}
:deep(.is-disabled){
  cursor: not-allowed;
  @apply bg-gray-100
}
</style>
<template>
  <div class="f-menu" style="width:250px;">
    <el-menu default-active="defaultActive" :collapse="isCollapse"  @select="handleSelect" :collapse-transition="false" unique-opened>
      <template v-for="(item,index) in asideMenus" :key="index">
        <el-sub-menu :index=item.name  v-if="item.child &&item.child.length>0" >
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item  v-for="(item2,index2) in item.child" :key="index2" :index="item2.frontpath">{{item2.name}}</el-menu-item>

        </el-sub-menu>
        <el-menu-item v-else :index="item.frontpath">
          <el-icon><component :is="item.icon"></component></el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>

  </div>
</template>

<script setup>
import {useRouter,useRoute} from "vue-router";
import {ref} from "vue";
import Menu from '~/layouts/components/backend/menu'
const router = useRouter()
const route = useRoute()
//是否折叠状态
// const isCollapse = computed(()=>!(store.state.asideWidth=="250px"))
//默认选择路径
const defaultActive = ref(route.path)
const asideMenus = Menu.asideMenus
// const asideMenus = computed(()=>store.state.menus)
const handleSelect=(e)=>{
  console.log(e)
  router.push(e)
}
</script>

<style scoped>
.f-menu{
  transition: all 0.2s;
  width: 250px;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow: auto;
  @apply shadow-md fixed bg-gray-100;
}
.f-menu::-webkit-scrollbar{
  width: 0px;
}
</style>
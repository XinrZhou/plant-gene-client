<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row >
          <el-col :span="24">
            <el-menu
                :default-active="activeIndex"
                class="elmenu"
                mode="horizontal"
                text-color = "#F3F4F6"
                active-text-color="#D1FAE5"
                @select="handleSelect"
                background-color="#10B981"
                show-timeout="5000"
            >
              <el-menu-item><el-icon :size="30"><Management /></el-icon><img src="/1.png" class="ml-5" style="height: 32px"></el-menu-item>
              <div class="right">
                <!--              <el-menu-item index="1">PASRGdb</el-menu-item>-->
                <el-menu-item index="2">Data Browse</el-menu-item>
                <el-sub-menu index="3">
                  <template #title>Strees tyoe</template>
                  <el-menu-item index="3-1">item one</el-menu-item>
                  <el-menu-item index="3-2">item two</el-menu-item>
                  <el-menu-item index="3-3">item three</el-menu-item>
                  <el-menu-item index="3-4">item three</el-menu-item>
                  <el-menu-item index="3-5">item three</el-menu-item>
                  <el-menu-item index="3-6">item three</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="4">
                  <template #title>Tools</template>
                  <el-menu-item index="4-1">item one</el-menu-item>
                  <el-menu-item index="4-2">item two</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="5">Download</el-menu-item>
                <el-menu-item index="6">Helps</el-menu-item>
                <el-menu-item index="7">Submit</el-menu-item>
              </div>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer class="f-footer">
        Footer
      </el-footer>
    </el-container>
  </div>
</template>
<script setup>
import { ref,onMounted } from 'vue'

import {useResizeObserver} from "@vueuse/core";
const activeIndex2 = ref('1')
const handleSelect = (key,keyPath) => {
  console.log(key,"+++++", keyPath)
}


</script>

<style scoped>
.el-header{
  padding: 0 0px;
}
.demonstration {
  color: var(--el-text-color-secondary);
}
.el-main{
  @apply bg-gray-100 px-20;
}
.f-footer{
  @apply flex justify-center bg-gray-200
}
.elmenu{
  @apply flex font-bold items-center;
  height: 64px;
  z-index: 1000;
}
.right{
  @apply flex ml-auto;
}
</style>
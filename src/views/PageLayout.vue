<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="24">
            <el-menu :default-active="activeIndex" class="elmenu" mode="horizontal" text-color="#F3F4F6"
                     active-text-color="#D1FAE5" @select="handleSelect" background-color="#609966" show-timeout="5000">
              <el-menu-item index="1">
                <el-icon :size="30">
                  <Management />
                </el-icon><img src="/src/assets/logo.png" class="ml-5" style="height: 32px">
              </el-menu-item>
              <div class="right">
                <el-sub-menu index="2">
                  <template #title>Data Browse</template>
                  <el-menu-item :index="item.title" v-for="(item,index) in browseDataList"
                                :key="item.id">{{item.title}}</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="3">Search</el-menu-item>
                <el-menu-item index="4">Analysis</el-menu-item>
                <el-menu-item index="5">Download</el-menu-item>
                <!--                <el-menu-item index="6">Helps</el-menu-item>-->
                <el-menu-item index="7">Submit</el-menu-item>
              </div>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer class="f-footer ">
        <el-row class="flex">
          <el-col :span="4" class="flex items-center mt-1">
            <el-image src="http://www.plantasrg.cn/static/img/2023/06/logo.png" class="ml-5" style="height: 32px"></el-image>
          </el-col>
          <el-col :span="14">
            <p class="footer-content">
              <router-link to="/search" class="underline">Search</router-link>
              <el-divider direction="vertical" />
              <router-link to="/analysis" class="underline">Analysis</router-link>
              <el-divider direction="vertical" />
              <router-link to="/download" class="underline">Download</router-link>
              <el-divider direction="vertical" />
              <router-link to="/helps" class="underline">Helps</router-link>
              <el-divider direction="vertical" />
              <router-link to="/submit" class="underline">Submit</router-link>
            </p>
            <p class="footer-content ">
              <el-image src="http://www.plantasrg.cn/static/img/2023/06/nefu.png"
                        style="width: 25px; height: 25px" class="mr-4 mt-2"></el-image>
              <a href="https://life.nefu.edu.cn/index.htm">College of Life Sciences</a>,
              <a href="https://icec.nefu.edu.cn/">CCEC</a>,
              <a href="https://www.nefu.edu.cn/">Nartheast Foreastry University</a>,
              150040 Harbin, China.
            </p>
          </el-col>
          <el-col :span="6" class="footer-content">
            <p>
              <span><el-icon size="25"><Message /></el-icon> &#13;</span>
              <span class="ml-6 ">sunshanwen@nefu.edu.cn</span>
            </p>
            <p class="mt-3">Copyright © 2023, All Rights Reserved</p>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import router from "~/router"
import { ref, onMounted, computed } from 'vue'
import { useBrowseStore } from '~/store/useBrowseStore.js'

const store = useBrowseStore()
store.getBrowseListData()

const browseDataList = computed(() => store.browseDataList)

let activeIndex = ref('1')

let handleSelect = (key, keyPath) => {
  key = key.split(' ').join('').toLowerCase()
  key = key.replace("/location", "")
  switch (key) {
    case '1':
      router.push('/')
      break
    case '3':
      router.push('/search')
      break
    case '4':
      router.push('/analysis')
      break
    case '5':
      router.push('/download')
      break
      // case '6':
      //   router.push('/helps')
      //   break
    case '7':
      router.push('/submit')
      break
    default:
      router.push(`/browse/${key}`)
  }

}

</script>

<style scoped>
.el-header {
  padding: 0 0px;
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-main {
  @apply bg-gray-50;

}

::v-deep(.el-main) {
  --el-main-padding: 0px;
}

.el-container {
  min-height: 100vh;
  position: relative;
}

.f-footer {
  @apply pt-4 pb-4 h-20 block mt-4 items-center;
  bottom: 0;
  background-color: #609966;
  height: 100px;
}

.footer-content {
  @apply text-center align-middle text-gray-200 mt-1;
}

.elmenu {
  @apply flex font-bold items-center;
  height: 64px;
  z-index: 1000;

}

.right {
  @apply flex ml-auto;
}
</style>
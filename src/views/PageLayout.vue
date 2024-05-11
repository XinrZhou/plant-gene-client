<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="24">
            <el-menu :default-active="activeIndex" class="elmenu" mode="horizontal" text-color="#F3F4F6"
                     active-text-color="#D1FAE5" @select="handleSelect" background-color="#609966" show-timeout="5000">
              <el-menu-item index="1">

                <img :src=black_img class="ml-5" style="height: 25px">
                <img :src=logo_img class="ml-5" style="height: 32px">
              </el-menu-item>
              <div class="right">
                <el-sub-menu index="2">
                  <template #title>Reference Data Browse</template>
                  <el-menu-item :index="item.title" v-for="(item,index) in browseDataList"
                                :key="item.id">{{item.title}}</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="6">Putative Data</el-menu-item>
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
        <el-row class="flex f_footer">
          <el-col :lg="4" :md="24" :sm="20" class="flex items-center mt-1">
            <el-image :src=logo_img class="ml-5" style="height: 32px"></el-image>
          </el-col>
          <el-col :lg="12" :md="24" :sm="20">
            <p class="footer-content">
              <el-divider direction="vertical" />
              <router-link to="/putative" class="underline">Putative data</router-link>
              <el-divider direction="vertical" />
              <router-link to="/search" class="underline">Search</router-link>
              <el-divider direction="vertical" />
              <router-link to="/analysis" class="underline">Analysis</router-link>
              <el-divider direction="vertical" />
              <router-link to="/download" class="underline">Download</router-link>
<!--              <el-divider direction="vertical" />-->
<!--              <router-link to="/helps" class="underline">Helps</router-link>-->
              <el-divider direction="vertical" />
              <router-link to="/submit" class="underline">Submit</router-link>
            </p>
            <p class="footer-content ">
              <el-image :src=nefu_img
                        style="width: 25px; height: 25px; vertical-align: -25%;" class="mr-4"></el-image>
              <a href="https://life.nefu.edu.cn/index.htm">College of Life Sciences</a>,
              <a href="https://icec.nefu.edu.cn/">CCEC</a>,
              <a href="https://www.nefu.edu.cn/">Nartheast Foreastry University</a>,
              150040 Harbin, China.
            </p>
          </el-col>
          <el-col :lg="8" :md="24" :sm="20" class="footer-content">
            <p>
              <span><el-icon size="25" style="vertical-align: -25%;"><Message /></el-icon> &#13;</span>
              <span class="ml-6 ">sunshanwen@nefu.edu.cn</span>
            </p>
            <p class="mt-3">Copyright © 2023, All Rights Reserved |  <a href="https://beian.miit.gov.cn/" target="_blank">蒙ICP备2023000908号-1</a></p>
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
import logo_img from '/src/assets/logo.png';
import black_img from '/src/assets/black.svg';
import nefu_img from '/src/assets/nefu.png';
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
      case '6':
        router.push('/putative')
        break
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
  overflow: hidden;
}

::v-deep(.el-main) {
  --el-main-padding: 0px;
}

::v-deep .el-container {
  min-height: 100vh;
  position: relative;
}

.el-footer {
  @apply py-6;
  height: auto;
}

.f-footer {
  @apply py-4 block mt-4 items-center;
  background-color: #609966;
  height: auto
}

.footer-content {
  @apply text-center text-gray-200 justify-center mt-2;
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

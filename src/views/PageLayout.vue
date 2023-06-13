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
        <el-row justify="center"> 
          <el-col :span="1">
            <el-image src="http://plantasrg.cn/static/img/2023/06/10173aba-c005-4bd5-a618-4d57bddb2431.png"
              style="width: 40px; height: 40px" class="mr-4"></el-image>
          </el-col>
          <el-col :span="11">
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
            <p class="footer-content">
              <el-link href="https://life.nefu.edu.cn/index.htm" class="text-base">College of Life Sciences</el-link>,
              <el-link href="https://icec.nefu.edu.cn/" class="text-base">CCEC</el-link>,
              <el-link href="https://www.nefu.edu.cn/" class="text-base">Nartheast Foreastry University</el-link>,
              150040 Harbin, China.
            </p>
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
      case '6':
        router.push('/helps')
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

  }

  ::v-deep(.el-main) {
    --el-main-padding: 0px;
  }

  .el-container {
    min-height: 100vh;
    position: relative;
  }

  .f-footer {
    @apply bg-gray-100 pt-4 pb-4 h-20 block;
    bottom: 0;
  }

  .footer-content {
    @apply text-center align-middle text-gray-600;
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
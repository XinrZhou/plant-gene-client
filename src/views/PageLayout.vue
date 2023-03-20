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
                    :ket="item.id">{{item.title}}</el-menu-item>
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
        &copy2023 Northeast Forestry University. All Rights Reserved.
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
  import router from "~/router"
  import { ref, onMounted, computed } from 'vue'
  import { useResizeObserver } from "@vueuse/core"
  import { useBrowseStore } from '~/store/useBrowseStore.js'

  const store = useBrowseStore()
  store.getBrowseListData()

  const browseDataList = computed(() => store.browseDataList)

  let activeIndex = ref('1')

  onMounted(() => {
    router.push('/')
  })

  let handleSelect = (key, keyPath) => {
    key = key.split(' ').join('').toLowerCase()
    key = key.replace("/location","")
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
    @apply bg-gray-100 px-20;
    height: 90vh
  }

  .f-footer {
    @apply flex justify-center bg-gray-200 pt-4 pb-4
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
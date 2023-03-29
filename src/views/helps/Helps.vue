<template>
    <PageLeftTitle page-title="Helps" />
    <el-row class="flex justify-center">
        <el-col :span="22" :offset="2">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item :span="6" v-for="(item, index) in helpsList" :key="index" :title=item.title  :name=index>
                <div>{{item.content}}</div>
              </el-collapse-item>
            </el-collapse>
        </el-col>
    </el-row>
</template>
<script setup>
    import PageLeftTitle from '~/components/PageLeftTitle.vue'
    import {computed, onMounted, ref} from 'vue'
    import { useHelpsStore } from '~/store/useHelpsStore.js'
    const store = useHelpsStore()
    const activeNames = ref(['1'])
    const handleChange = () => {

    }
    // 获取帮助文档列表
    const helpsList = computed(() => store.helpsList)
    let funHelpList = () => store.fetchHelpsList()
    onMounted(() => {
      funHelpList()
    })
</script>

<style scoped>
    @media screen and (min-width: 992px) {
      .el-row {
        max-width: 70%;
        margin: 0 auto;
      }
    }
    /* 手机端 */
    @media screen and (max-width: 993px) {
      .el-row {
        max-width: 100%;
      }
    }
    ::v-deep .el-collapse-item__header {
        color: #758e61;
        position: relative;
        background-color: #DBE4C6;
        @apply mt-6 h-20 pl-4  bg-opacity-50 text-xl underline rounded-md;
    }

    ::v-deep .el-collapse-item__content {
        text-align: left;
        @apply bg-white py-6 pl-4;
    }
</style>
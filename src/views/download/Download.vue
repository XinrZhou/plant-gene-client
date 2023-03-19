<template>
    <PageLeftTitle page-title="Download" />
    <el-row>
        <el-col :offset="1" :span="22">
            <div class="demo-collapse">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item v-for="(item,index) in name" :name="(index+1).toString()">
                        <template #title>
                            <p class="collapse-name">Download by Gene Family</p>
                        </template>
                        <el-row>
                            <el-col :span="10" :offset="1">
                                <div class="m-4">
                                    <p>Gene family</p>
                                    <el-select multiple placeholder="Please choose" style="width: 90%">
                                    </el-select>
                                </div>
                                <div class="m-4">
                                    <p>Gene name</p>
                                    <el-select multiple collapse-tags placeholder="Please choose" style="width: 90%">
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="12" :offset="1">
                                <p class="right-title">Gene name</p>
                                <el-row class="mb-4">
                                    <el-checkbox v-model="checkAll" @change="handleCheckAllChange">Check all</el-checkbox>
                                    <el-button round class="downloadBtn" @click="handleDownload">download</el-button>
                                </el-row>
                                <el-checkbox-group v-model="checkedOptions" @change="handleCheckedChange">
                                    <el-checkbox v-for="option in options" :key="option" :label="option">{{option }}</el-checkbox>
                                </el-checkbox-group>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
    import PageLeftTitle from '~/components/PageLeftTitle.vue'
    import { ref } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useDownloadStore } from '~/store/useDownloadStore.js'

    const activeName = ref('1')

    const store = useDownloadStore()

    // store.getFileListData()

    //Gene- 测试数据，真实数据需要后端生成
    let name = [1, 2, 3, 4, 5]

    const checkAll = ref(false)
    const checkedOptions = ref([])
    //Gene name选项 测试数据
    const options = ['name1', 'name2', 'name3', 'name4']

    const handleCheckAllChange = (val) => {
        checkedOptions.value = val ? options : []
    }

    const handleCheckedChange = (value) => {
        const checkedCount = value.length
        checkAll.value = checkedCount === options.length
    }

    let handleDownload = () => {

    }
    
</script>

<style scoped>
    .collapse-name {
        @apply px-6 font-bold text-xl;
    }

    .right-title {
        @apply font-bold mb-2 mr-2 text-xl;
    }

    .downloadBtn {
        @apply ml-3
    }
</style>
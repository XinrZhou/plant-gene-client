<template>
    <PageCenterTitle page-title="Search" />
    <SearchBox />
    <el-row>
      <el-col :span="6">
        <div class="description-list">
            <el-descriptions :column="1">
                <el-descriptions-item :label="item.name" width="150px" v-for="(item,index) in attributeDataList" :key="index" >
                    {{item.value}}
                </el-descriptions-item>
            </el-descriptions>
        </div>
      </el-col>
      <el-col :span="18"></el-col>
    </el-row>
</template>

<script setup>
    import PageCenterTitle from '~/components/PageCenterTitle.vue'
    import SearchBox from '~/components/SearchBox.vue'
    import { useSearchStore } from '~/store/useSearchStore.js'
    import { storeToRefs } from 'pinia'

    const store = useSearchStore()
    store.getAttributeListData()

    const {attributeDataList} = storeToRefs(store)

</script>

<style scoped>
    
</style>
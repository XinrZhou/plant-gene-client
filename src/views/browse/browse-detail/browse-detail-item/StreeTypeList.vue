<template>
    <PageCenterTitle page-title="Stress Type" />
    <el-row>
        <template v-for="item in stressTypeDataList" :key="item.id">
            <el-col :lg="9" :xs="24" :offset="2" class="el-col">
                <BrowseCard :card-info="item" @click="goListItem(item.title)" />
            </el-col>
        </template>
    </el-row>
</template>

<script setup>
    import PageCenterTitle from '~/components/PageCenterTitle.vue'
    import { storeToRefs } from 'pinia'
    import BrowseCard from '../../components/BrowseCard.vue'
    import { useBrowseStore } from '~/store/useBrowseStore.js'
    import { onMounted } from 'vue'
    import router from "~/router"

    const store = useBrowseStore()
    const { stressTypeDataList } = storeToRefs(store)

    store.getStressTypeListData()

    // 路由跳转
    const goListItem = (title) => {
        router.push({
            name: 'streetypelistdetail',
            query: {
                stressName: title
            }
        })
    }


</script>


<style scoped>
    .el-col {
        @apply mb-6;
    }
</style>
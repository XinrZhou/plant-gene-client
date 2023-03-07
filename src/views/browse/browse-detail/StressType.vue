<template>
    <PageCenterTitle page-title="Stress Type" />
    <el-row>
        <template v-for="item in stressTypeDataList" :key="item.id">
            <el-col :lg="9" :xs="24" :offset="2" class="el-col">
                <BrowseCard :card-info="item" />
            </el-col>
        </template>
    </el-row>
</template>

<script setup>
    import { storeToRefs } from 'pinia'
    import PageCenterTitle from '~/components/PageCenterTitle.vue'
    import BrowseCard from '../components/BrowseCard.vue'
    import { useBrowseStore } from '~/store/useBrowseStore.js'
    import { onMounted } from 'vue'
    import router from "~/router"

    const store = useBrowseStore()

    store.getStressTypeListData()

    const { stressTypeDataList } = storeToRefs(store)


</script>


<style scoped>
    .el-col {
        @apply mb-6;
    }
</style>
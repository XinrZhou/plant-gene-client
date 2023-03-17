<template>
    <PageLeftTitle page-title="Browse" />
    <el-row>
        <template v-for="(item,index) in browseDataList" :key="item.id">
            <el-col :lg="9" :xs="24" :offset="2" class="el-col">
                <BrowseCard :card-info="item" @click="skip(item)" />
            </el-col>
        </template>
    </el-row>
</template>

<script setup>
    import PageLeftTitle from '~/components/PageLeftTitle.vue'
    import BrowseCard from './components/BrowseCard.vue'
    import { useBrowseStore } from '~/store/useBrowseStore.js'
    import { computed } from 'vue'
    import router from "~/router"

    const store = useBrowseStore()
    store.getBrowseListData()

    const browseDataList = computed(() => store.browseDataList)

    // 路由跳转
    let skip = (item) => {
        switch (item.id) {
            case 5:
                router.push("/browse/stresstype")
                break
            case 6:
                router.push("/browse/genefamily")
                break
            case 7:
                router.push("/browse/phenotypeinfluence")
                break
            case 8:
                router.push("/browse/expressionorgans")
                break
            case 9:
                router.push("/browse/subcellularlocalization")
                break
            case 10:
                router.push("/browse/species")
                break
        }
    }
</script>


<style scoped>
    .el-col {
        @apply mb-6;
    }
</style>
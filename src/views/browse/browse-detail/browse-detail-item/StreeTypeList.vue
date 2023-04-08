<template>
    <PageCenterTitle page-title="Stress Type" />
    <el-row :gutter="10">
        <el-col :lg="11" :md="24" class="el-col" v-for="item in stressTypeDataList" :key="item.id" :offset="1">
            <BrowseCard :card-info="item" @click="goListItem(item.title)" />
        </el-col>
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
    @media screen and (min-width: 992px) {
      .el-row {
        position: absolute;
        left: 15%;
        right: 15%;
      }
    }
    /* 手机端 */
    @media screen and (max-width: 993px) {
      .el-row {
        max-width: 100%;
      }
    }
    .el-col {
        @apply mb-6;
    }
    .element.style {
      margin-left: 0px!important;
      margin-right: 0px!important;
    }
</style>
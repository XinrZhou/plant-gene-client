<template>
    <page-tip name="Browse" />
        <el-row  >
            <template v-for="(item,index) in browseList" :key="item.id">
                <el-col :lg="9" :xs="24" :offset="2" class="el-col"> 
                    <Card :info="item"/>
                </el-col>
            </template>
        </el-row>
</template>

<script setup>
    import PageTip from '~/components/PageTip.vue'
    import Card from '~/components/Card.vue'
    import { browseStore } from '~/store/browse'
    import { onMounted, toRaw } from 'vue'

    const store = browseStore()

    store.getBrowseList()

    let browseList = toRaw(store.browseList)

</script>


<style scoped>
    .el-col {
        @apply mb-6;
    }
</style>
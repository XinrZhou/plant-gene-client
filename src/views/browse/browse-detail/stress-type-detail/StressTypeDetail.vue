<template>
    <Title title="List of Drought resistance genes" />
    <SearchBox />
    <el-row>
        <datalist />
    </el-row>
</template>

<script setup>
    import Title from '~/components/Title.vue'
    import SearchBox from '~/components/SearchBox.vue'
    import { ref, reactive, defineAsyncComponent } from 'vue'

    let datalist = defineAsyncComponent(() => import('~/views/analysis/DataList.vue'))


</script>

<style scoped>

</style>
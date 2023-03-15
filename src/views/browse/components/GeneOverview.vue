<template>
    <el-row>
        <el-col :span="12" class="page-info m-9">
            <el-icon><Histogram/></el-icon>Sample overview
        </el-col>
    </el-row>
    <el-row>
      <h1>{{geneName}}</h1>
    </el-row>

</template>

<script setup>
    import PageLeftTitle from '~/components/PageLeftTitle.vue'
    import { useRoute } from 'vue-router'
    import { Histogram } from '@element-plus/icons-vue'

    const route = useRoute()

    const geneName = route.query.geneName

</script>

<style scoped>
    .page-info {
        @apply flex items-center font-bold pt-5 pb-3 text-4xl
    }
</style>
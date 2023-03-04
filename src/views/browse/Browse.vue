<template>
    <page-tip name="Browse" />
    <template v-for="(t,index) in 10">
        <el-row v-if="index%2==0" >
            <el-col :lg="9" :xs="24" :offset="2" class="el-col"> 
                <Card />
            </el-col>
            <el-col :lg="9" :xs="24" :offset="2" v-if="index+1 < 10" class="el-col">
                <Card />
            </el-col>
        </el-row>
    </template>
</template>

<script setup>
    import PageTip from '~/components/PageTip.vue'
    import Card from '~/components/Card.vue'
</script>

<style scoped>
    .el-col {
        margin-bottom: 20px;
    }
</style>
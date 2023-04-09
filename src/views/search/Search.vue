<template>
    <el-row>
        <el-col :span="7">
            <el-card class="box-card" v-for="(item,index) in menuList" :key="index">
                <template #header>
                    <div class="card-header">
                        <span>{{item.name}}</span>&nbsp;
                        <span>{{item.value}}</span>
                    </div>
                </template>
                <div class="infinite-list card-div">
                    <el-radio-group v-model="radio" size="large">
                        <el-radio-button :label="item2.name" v-for="(item2, index2) in item.chartVO" :key="index2">
                        </el-radio-button>
                    </el-radio-group>
                </div>
            </el-card>
        </el-col>
        <el-col :span="16" :offset="1">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="date" label="Date" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="address" label="Address" />
            </el-table>
        </el-col>
    </el-row>
</template>

<script setup>
    import { Search } from '@element-plus/icons-vue'
    import { useSearchStore } from '~/store/useSearchStore.js'
    import { ref, computed, reactive, watch, toRaw } from 'vue'
    import router from "~/router/index.js";

    const store = useSearchStore()
    store.getMenuListData()

    const menuList = computed(() => store.menuDataList)

    let radio = ref('')

    const tableData = [
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
    ]


</script>

<style scoped>
    /* PC端 */
    @media screen and (min-width: 992px) {
        .el-row {
            max-width: 70%;
            margin: 0 auto;
        }
    }

    /* 手机端 */
    @media screen and (max-width: 993px) {
        .el-row {
            max-width: 100%;
        }
    }

    .el-row {
        margin-top: 100px;
    }

    ::v-deep .el-card__header {
        background-color: #d6d9d6;
    }

    ::v-deep .el-card__body {
        padding: 0;
    }

    .el-radio-group {
        display: block;
        height: 100%;
    }

    .el-radio-button {
        display: block;
        height: 50px;
    }

    ::v-deep .el-radio-button__inner {
        display: inline-block;
        width: 100%;
        height: 100%;
        text-align: left;
        padding-top: 17px;
    }

    .card-div {
        overflow: scroll;
        height: 150px;
    }

    .infinite-list::-webkit-scrollbar {
        display: none;
    }

    .el-card {
        margin-bottom: 16px;
    }
</style>
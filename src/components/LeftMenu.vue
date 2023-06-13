<template>
    <el-scrollbar max-height="600px" class="w-full">
        <el-menu @open="handleOpen" @close="handleClose" unique-opened>
            <el-sub-menu :index="item.name" v-for="item in props.attributeList" :key="item.name">
                <template #title>
                    <span class="menu-item-title">
                        {{item.name}}
                        <el-tag class="ml-2" type="success">
                            {{item.value}}
                        </el-tag>
                    </span>
                </template>
                <!-- menu searchbox -->
                <el-input v-model="menuSearchContent" class="left-menu-input" placeholder="Search" @input="handleChange"
                    :prefix-icon="Search" />
                <!-- scroll -->
                <ul class="infinite-list" infinite-scroll-immediate="false" v-loading="isLoading">
                    <li class="infinite-list-item"
                        v-for="(item2,index2) in (menuSearchContent==''?props.attrDetailList:attrDetailFilterList)"
                        :key="index2" @click="handleClick(item.name,item2)">
                        {{item2.name}}
                        <el-tag class="ml-2">
                            {{item2.value}}
                        </el-tag>
                    </li>
                </ul>
            </el-sub-menu>
        </el-menu>
    </el-scrollbar>
</template>

<script setup>
    import { Search } from '@element-plus/icons-vue'
    import { ref, computed, watch, defineEmits, toRaw } from 'vue'

    let props = defineProps(['attributeList', 'attrDetailList', 'isLoading', 'openMenuName'])

    let emits = defineEmits(['openMenu'])

    // menu searchbox
    const menuSearchContent = ref('')

    let attrDetailFilterList = ref([])

    let handleOpen = (index) => {
        emits('openMenu', index)
    }

    let handleClick = (attrName, attrItem2) => {
        emits('clickList', attrName, attrItem2)
    }

    // 菜单搜索框改变时触发
    let handleChange = () => {
        // 根据搜索条件进行过滤
        if (menuSearchContent.value) {
            attrDetailFilterList = toRaw(props.attrDetailList).filter(item => item.name.indexOf(menuSearchContent.value) !== -1)
        } else {
            attrDetailFilterList = toRaw(props.attrDetailList)
        }
    }

</script>

<style scoped>
    ::v-deep .el-menu {
        @apply w-full;
        border: none;
        border-right-width: 0;
    }

    ::v-deep .el-sub-menu {
        @apply w-full;
    }

    .menu-item-title {
        @apply text-base font-semibold;
    }

    .left-menu-input {
        @apply w-2/3 pl-5 pt-1;
    }

    .infinite-list {
        overflow: auto;
        min-height: 180px;
        max-height: 400px;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .infinite-list .infinite-list-item {
        align-items: center;
        justify-content: left;
        background: white;
        margin: 10px;
        color: black;
        @apply break-words h-auto pl-4 pt-2 text-sm font-medium leading-7;
    }

    .infinite-list .infinite-list-item+.list-item {
        margin-top: 10px;
    }

    .infinite-list::-webkit-scrollbar {
        display: none;
    }

    .el-tag {
        @apply float-right;
    }

    .right-table {
        @apply mt-16;
    }

    .el-pagination {
        justify-content: center;
        margin-top: 16px;
        width: 100%;
    }
</style>
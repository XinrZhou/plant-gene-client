<template>
    <PageCenterTitle page-title="Species" />

    <el-row>
        <el-col :span="menuCol" style="height: 550px;">
            <el-input :prefix-icon="Search" v-model="navInput" @input="handleNavChange" clearable />
            <el-scrollbar max-height="550px" class="scrollbar-demo-item">
                <p :index="index+''" v-for="(item,index) in speciesFilterList" :key="index"
                    @click="handleMenuClick(item)">
                    <span class="menu-item">
                        {{item.name}}
                        <el-tag class="ml-2" type="success" style="vertical-align: -1%;">
                            {{item.value}}
                        </el-tag>
                    </span>
                </p>
            </el-scrollbar>
        </el-col>

        <el-col :span="tableCol" :offset="2">
            <div>
                <Suspense v-if="show">
                    <template #default>
                        <GeneAsyncComponent :name="speciesName"></GeneAsyncComponent>
                    </template>
                    <template #fallback>
                        <div class="loading" v-loading="true"/>
                    </template>
                </Suspense>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
    import { TweenMax } from 'gsap'
    import PageCenterTitle from "~/components/PageCenterTitle.vue"
    import { Search } from '@element-plus/icons-vue'
    import { useBrowseStore } from '~/store/useBrowseStore.js'
    import { ref, computed, watch, toRaw, defineAsyncComponent } from 'vue'

    const store = useBrowseStore()
    store.getSpeciesListData()
    const speciesList = computed(() => store.speciesDataList)
    const GeneAsyncComponent = defineAsyncComponent(() => import('../components/SpeciesGeneList.vue'))
    
    let speciesFilterList = ref([])
    let show = ref(false)
    let speciesName = ref('')

    let menuCol = ref(24)
    let tableCol = ref(0)
    let navInput = ref('')

    watch(() => store.speciesDataList, () => {
        speciesFilterList.value = toRaw(speciesList.value)
    })

    let handleMenuClick = (item) => {
        show.value = true
        speciesName.value = item.name
        menuCol.value = 11
        tableCol.value = 11
    }

    let handleNavChange = (() => {
        if (navInput.value == '') {
            speciesFilterList.value = toRaw(speciesList.value)
        } else {
            speciesFilterList.value = toRaw(speciesList.value).filter(item => item.name.indexOf(navInput.value) !== -1)
        }
    })

</script>

<style scoped>
    .scrollbar-demo-item {
        @apply mt-6 bg-white;
    }

    .scrollbar-demo-item p {
        @apply m-2 h-10;
    }

    .el-tag {
        @apply float-right;
    }

    .loading {
        @apply absolute top-1/2 right-1/4
    }
</style>
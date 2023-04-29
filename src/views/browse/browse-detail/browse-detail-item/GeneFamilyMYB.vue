<template>
    <PageCenterTitle page-title="(example)MYB" />
    <el-card>
        <el-row>
            <el-col :span="6">
                <el-input :prefix-icon="Search" v-model="navInput" @input="handleNavChange" clearable />
                <el-scrollbar height="330px" class="scrollbar-demo-item" v-if="geneType == 'TF'">
                    <p v-for="item in tFGeneFilterList" :key="item.gene">
                        <span class="menu-item">
                            {{item.gene}}
                        </span>
                    </p>
                </el-scrollbar>
                <el-scrollbar height="330px" class="scrollbar-demo-item" v-if="geneType == 'NTF'">
                    <p v-for="item in nonTFGeneFilterList" :key="item.gene">
                        <span class="menu-item">
                            {{item.gene}}
                        </span>
                    </p>
                </el-scrollbar>
            </el-col>
        </el-row>
    </el-card>

</template>

<script setup>
    import PageCenterTitle from "~/components/PageCenterTitle.vue"
    import { Search } from '@element-plus/icons-vue'
    import { useBrowseStore } from '~/store/useBrowseStore.js'
    import { ref, computed, watch, toRaw } from 'vue'
    import router from "~/router"
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const store = useBrowseStore()

    const geneName = route.query.name
    const geneType = route.query.type
    geneType == 'TF' ? store.getTFGeneList(geneName) : store.getNonTFGeneList(geneName)

    const tFGeneList = computed(() => store.tFGeneDataList)
    const nonTFGeneList = computed(() => store.nonTFGeneDataList)
    let tFGeneFilterList = ref([])
    let nonTFGeneFilterList = ref([])

    let navInput = ref('')

    watch(() => store.tFGeneDataList, () => {
        tFGeneFilterList.value = store.tFGeneDataList
    })

    watch(() => store.nonTFGeneDataList, () => {
        nonTFGeneFilterList.value = store.nonTFGeneDataList
    })

    let handleNavChange = (() => {
        if (geneType == 'TF') {
            if (navInput.value == '') {
                tFGeneFilterList.value = toRaw(tFGeneList.value)
            } else {
                tFGeneFilterList.value = toRaw(tFGeneList.value).filter(item => item.gene.indexOf(navInput.value) !== -1)
            }
        } else {
            if (navInput.value == '') {
                nonTFGeneFilterList.value = toRaw(nonTFFGeneList.value)
            } else {
                nonTFFGeneFilterList.value = toRaw(nonTFFGeneList.value).filter(item => item.gene.indexOf(navInput.value) !== -1)
            }
        }
    })
</script>

<style scoped>
    /* PC端 */
    @media screen and (min-width: 992px) {
        .el-card {
            max-width: 70%;
            margin: 0 auto;
        }
    }

    /* 手机端 */
    @media screen and (max-width: 993px) {
        .el-card {
            max-width: 100%;
        }
    }

    .scrollbar-demo-item {
        @apply mt-6 bg-white;
    }

    .scrollbar-demo-item p {
        @apply m-2 text-sm font-normal text-gray-900 text-opacity-75 leading-loose;
    }
</style>
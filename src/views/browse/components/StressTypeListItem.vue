<template>
    <Title page-title="List of Drought resistance genes" />
    <SearchBox />
    <el-row>
        <el-table :data="tableData" style="width: 100%" height="80vh">
            <el-table-column fixed prop="gene" label="Gene" fit/>
            <el-table-column prop="name" label="Scientific Name" fit/>
            <el-table-column prop="product" label="Gene Product" fit/>
            <el-table-column prop="localization" label="Subcellular Localization" fit/>
            <el-table-column prop="organs" label="Principal Expression Organs / Location" fit/>
        </el-table>
    </el-row>
</template>

<script setup>
    import Title from '~/components/PageCenterTitle.vue'
    import SearchBox from '~/components/SearchBox.vue'
    import { ref, reactive, defineAsyncComponent } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useBrowseStore } from '~/store/useBrowseStore.js'
    import { useRoute } from 'vue-router'

    const store = useBrowseStore()
    const route = useRoute()
    
    store.getStressTypeListItemData({stressTypeQuery: route.query.stressName})

    const tableData = [
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        {
            gene: "ZmDREB2.7",
            name: "Zea mays",
            product: "ZmDREB2.7 transcription factor",
            localization: "N/A",
            organs:"leaf, root",
        },
        
    ]
</script>

<style scoped>

</style>
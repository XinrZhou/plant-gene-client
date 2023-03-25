<template>
    <PageLeftTitle page-title="Download" />
    <el-row>
        <el-col :offset="3" :span="18">
            <el-card>
                <el-row>
                    <el-col :span="11">
                        <el-form :model="form" label-position="top" class="el-form-style">
                            <el-form-item label="Stress Type">
                                <el-select v-model="form.stressType" placeholder="Select Stress Type"
                                    @focus="handleFocus(1)" class="select-item" clearable required>
                                    <el-option :value="item" v-for="(item,index) in stressTypeList " :key="index" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Species">
                                <el-select v-model="form.species" placeholder="Select Species" @focus="handleFocus(2)"
                                    class="select-item" clearable>
                                    <el-option :value="item" v-for="(item,index) in speciesList " :key="index" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Gene Family">
                                <el-select v-model="form.geneFamily" placeholder="Select Gene Family"
                                    @focus="handleFocus(3)" class="select-item" clearable>
                                    <el-option :value="item" v-for="(item,index) in geneFamilyList " :key="index" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Phenotype Influenced">
                                <el-select v-model="form.phenotypeGroup" placeholder="Select Phenotype Influenced"
                                    @focus="handleFocus(4)" class="select-item" clearable>
                                    <el-option :value="item" v-for="(item,index) in phenotypeList " :key="index" />
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="onReset" class="download-btn">Reset</el-button>
                                <el-button @click="onConfirm" class="download-btn">Confirm</el-button>
                                <el-button @click="onDownload" class="download-btn">Download</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <p class="checkbox-title inline-block">Gene Name</p>
                        <el-button type="info" v-model:checked="isSelectAll" @click="handleSelectAll(!isSelectAll)"
                                   class="inline-block ml-10 text-black" round
                                   v-if="geneList && geneList.length > 0"
                        >Select All</el-button>
                        <el-scrollbar height="400px">
                          <el-checkbox-group v-model="ids">
                            <el-checkbox :label="item.id" v-for="item in geneList" :id="item.id+''"
                                         class="checkbox-content">
                              {{item.gene}}
                            </el-checkbox>
                          </el-checkbox-group>
                        </el-scrollbar>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
    import PageLeftTitle from '~/components/PageLeftTitle.vue'
    import { ref, computed } from 'vue'
    import { useDownloadStore } from '~/store/useDownloadStore.js'
    import { ElMessage, ElMessageBox } from 'element-plus'

    const store = useDownloadStore()
    const stressTypeList = computed(() => store.stressTypeList)
    const geneFamilyList = computed(() => store.geneFamilyList)
    const phenotypeList = computed(() => store.phenotypeList)
    const speciesList = computed(() => store.speciesList)

    const geneList = computed(() => store.geneList)

    let form = ref({
        geneFamily: "",
        phenotypeGroup: "",
        species: "",
        stressType: ""
    })
    let ids = ref([])

    let handleFocus = (index) => {
        switch (index) {
            case 1:
                store.getStressTypeListData()
                break
            case 2:
                store.getSpeciesListData()
                break
            case 3:
                store.getGeneFamilyListData()
                break
            case 4:
                store.getPhenotypeListData()
                break
        }
    }

    // let handleClick = (item) => {
    //
    // }

    let onReset = () => {
        form.value = {
            geneFamily: "",
            phenotypeGroup: "",
            species: "",
            stressType: ""
        }
        ids.value = []
        ElMessage.success("Reset Successfully!")
    }

    let onConfirm = () => {
        if (!form.value.stressType) {
          ElMessage.error("Please select a stressType!")
          return
        }
        store.getGeneListData(form.value)
    }

    let onDownload = () => {
        if (ids.value.length == 0) {
            ElMessageBox.confirm(
                'You must select the gene name!',
                'Tips',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'info',
                    center: true,
                }
            )
        } else {
            store.downloadSequence(ids.value).then(res => {
              const blob = new Blob([res.data]);

              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'Sequence.xlsx');
              document.body.appendChild(link);
              link.click();
          })
        }
    }
    let handleSelectAll = (selected) => {
      ids.value = selected ? geneList.value.map(item => item.id) : []
    }
    let isSelectAll = computed(() => ids.value.length === geneList.value.length)
</script>

<style scoped>
    .el-form-style {
        height: 500px;
    }

    ::v-deep .el-form-item__label {
        @apply text-base font-semibold mt-4 mx-6;
    }

    .select-item {
        @apply w-full mt-2 mx-6 mb-4;
    }

    .download-btn {
        background-color: #CCD5AE;
        @apply my-5 ml-6;
    }

    .checkbox-title {
        @apply text-base font-semibold mt-4 my-3;
    }

    .checkbox-content {
        @apply w-1/4;
    }
</style>
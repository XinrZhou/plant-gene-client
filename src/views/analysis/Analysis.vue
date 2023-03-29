<template>
    <PageCenterTitle page-title="Analysis" />
    <el-row class="flex justify-center">
      <el-col :lg="24" :md="24">
        <el-tabs style="height: 300px" class="demo-tabs">
          <el-tab-pane label="Blast">
            <p class="blast-tip">Blastx/Blastp can be excuted on data stored in our database.</p>
            <div class="blast-form">
              <el-form :model="form" label-width="120px" label-position="left">
                <el-form-item label="BLAST type">
                  <el-select v-model="form.blast" placeholder="select BLAST type" clearable>
                    <el-option value="shanghai" />
                    <el-option value="beijing" />
                  </el-select>
                </el-form-item>
                <el-form-item label="Stress type">
                  <el-select v-model="form.stresstype" placeholder="select Stress type" clearable>
                    <el-option value="shanghai" />
                    <el-option value="beijing" />
                  </el-select>
                </el-form-item>
                <el-form-item label="E-value">
                  <el-input v-model="form.description" />
                </el-form-item>
                <el-form-item label="Input">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="query sequence" />
                    <el-radio label="locus name(At1g01030)" />
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="Select File">
                  <el-upload ref="uploadRef" :file-list="fileList" :auto-upload="false" :on-change="change"
                             class="upload-demo">
                    <el-button class="form-btn">Click to upload</el-button>
                    <template #tip>
                      <div class="el-upload__tip">
                        jpg/png files with a size less than 500KB.
                      </div>
                    </template>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button @click="onReset" class="form-btn">Reset</el-button>
                  <el-button @click="onSubmit" class="form-btn">Run BLAST</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="SaGp">Config</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

</template>

<script setup>
    import PageLeftTitle from '~/components/PageLeftTitle.vue'
    import PageCenterTitle from '~/components/PageCenterTitle.vue'
    import { reactive, toRaw, ref } from 'vue'
    import { useSubmitStore } from '~/store/useSubmitStore.js'
    import { ElMessageBox, ElMessage } from 'element-plus'

    const store = useSubmitStore()

    let form = ref({
        blast: '',
        streeStype: '',
        description: '',
        resource: ''
    })
    let formData = new FormData()

    let fileList = reactive([])
    let fileCount = ref(0)
    let uploadRef = ref()

    const change = (file, lists) => {
        let list = toRaw(lists)
        fileCount.value = list.length
        list.forEach(item => {
            formData.append('file', item.raw, item.name);
        });
    }

    const onSubmit = () => {
        if (fileCount.value == 0) {
            ElMessageBox.alert('The file cannot be empty!', 'Tip', {
                confirmButtonText: 'OK'
            })
        } else {
            // store.uploadFile(form, formData)
            // onReset()
        }
    }

    const onReset = () => {
        uploadRef.value.clearFiles()
        formData = new FormData()
        fileCount.value = 0
        form.value = {
            blast: '',
            streeStype: '',
            description: '',
            resource: ''
        }
    }
</script>

<style scoped>
    /* .el-tabs {
        @apply w-5/6 mx-auto
    } */
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

    ::v-deep .el-tabs__item {
        @apply text-xl font-semibold pb-4 pt-8;
    }

    .blast-tip {
        @apply mb-4 mt-8;
    }

    .blast-form {
        @apply px-7 py-10 bg-white rounded-md text-left;
    }

    .form-btn {
        background-color: #CCD5AE;
    }
</style>